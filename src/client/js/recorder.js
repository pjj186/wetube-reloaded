import regeneratorRuntime from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
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