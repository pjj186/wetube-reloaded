const startBtn = document.getElementById("startBtn");


// 프론트엔드에서 async, await를 사용하려면 regeneratorRuntime 을 설치해야함
const handleStart = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true,
    });
    console.log(stream);
};

startBtn.addEventListener("click", handleStart);