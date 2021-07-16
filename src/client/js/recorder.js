import regeneratorRuntime, { async } from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async() => {
    const ffmpeg = createFFmpeg({ 
        log:true,
        corePath:"/static/ffmpeg-core.js"
    });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    await ffmpeg.run(
        "-i", // 인풋
        "recording.webm",
        "-ss", // 시간대.
        "00.00:01", 
        "-frames:v", // 스크린샷
        "1", 
        "thumbnail.jpg" // 결과물
        );

    const mp4File = ffmpeg.FS("readFile", "output.mp4");
    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");
    
    const mp4Blob = new Blob([mp4File.buffer], {type: "video/mp4"});
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();

    const thumbA = document.createElement("a");
    thumbA.href = thumbUrl;
    thumbA.download = "MyThumbnail.jpg";
    document.body.appendChild(thumbA);
    thumbA.click();
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    
    recorder.stop();
}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
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
    };
    recorder.start(); // 녹화 시작!
}

// 프론트엔드에서 async, await를 사용하려면 regeneratorRuntime 을 설치해야함
const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true,
    });
    // srcObject는 video가 가질 수 있는 무언가를 의미
    // srcObject는 MediaStream, MediaSource, Blob, File을 실행할 때 video에 주는 무언가를 의미
    video.srcObject = stream;
    video.play();
};

init();

startBtn.addEventListener("click", handleStart);