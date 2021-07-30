import regeneratorRuntime, { async } from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
};

const handleDownload = async() => {

    actionBtn.removeEventListener("click", handleDownload);
    actionBtn.innerText = "Transcoding...";
    actionBtn.disabled = true;

    const ffmpeg = createFFmpeg({ 
        log:true,
        corePath:"/static/ffmpeg-core.js"
    });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

    await ffmpeg.run("-i", files.input, "-r", "60", files.output);

    await ffmpeg.run(
        "-i", // 인풋
        files.input,
        "-ss", // 영상의 시간대
        "00:00:01", 
        "-frames:v", // 스크린샷
        "1", 
        files.thumb // 결과물
        );

    const mp4File = ffmpeg.FS("readFile", files.output);
    const thumbFile = ffmpeg.FS("readFile", files.thumb);
    
    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url, "MyRecording.mp4");
    downloadFile(thumbUrl, "MyThumbnail.jpg");
    
    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(videoFile);

    actionBtn.disabled = false;
    actionBtn.innerText = "Record Again";
    actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
    actionBtn.innerText = "Recording";
    actionBtn.disabled = true;
    actionBtn.removeEventListener("click", handleStart);
    recorder = new MediaRecorder(stream, {mimeType:"video/webm"}); // 녹화를 하기 위해 필요
    recorder.ondataavailable = (event) => { // stop()이 실행되면 dataavailable event가 발생
        // URL.createObjectURL(event.data)의 의미
        // 단순히 브라우저의 메모리를 가리키기만 하고 있는 URL
        // 우리 서버에는 존재하지 않는 URL
        // 여기서 만들어진 URL은 브라우저에서 만들어진 것이고, 접근할 수 있는 파일을 가리킨다.
        // 즉 파일은 브라우저의 메모리 상에 있다는 것을 의미
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
        actionBtn.innerText = "Download";
        actionBtn.disabled = false;
        actionBtn.addEventListener("click", handleDownload);
    };
    recorder.start(); // 녹화 시작!
    setTimeout(() => { // 5초동안 녹화 후 STOp
        recorder.stop();
    }, 5000);
}

// 프론트엔드에서 async, await를 사용하려면 regeneratorRuntime 을 설치해야함
const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video: {
            width: 1024,
            height: 576,
        },
    });
    // srcObject는 video가 가질 수 있는 무언가를 의미
    // srcObject는 MediaStream, MediaSource, Blob, File을 실행할 때 video에 주는 무언가를 의미
    video.srcObject = stream;
    video.play();
};

init();

actionBtn.addEventListener("click", handleStart);