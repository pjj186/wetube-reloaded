const hidebtn = document.querySelector(".fa-bars");
const panel = document.querySelector(".video__home-panel");

const handleShow = () => {
    panel.classList.remove("hide");
    hidebtn.removeEventListener("click", handleShow);
    hidebtn.addEventListener("click", handleHide);
}

const handleHide = () => {
    panel.classList.add("hide");
    console.log("Working");
    hidebtn.removeEventListener("click", handleHide);
    hidebtn.addEventListener("click", handleShow);
};

hidebtn.addEventListener("click", handleHide);