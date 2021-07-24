import regeneratorRuntime, { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteComment = document.querySelectorAll(".video__comment-del");




const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    span2.className = "video__comment-del";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
    span2.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("input");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if(text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if(response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json(); // response 안에서 json 추출
        addComment(text, newCommentId);
    }
};

const handleDelete = async (event) =>{
    const deleteTarget = event.target.parentNode;
    const commentId = deleteTarget.dataset.id;
    const response = await fetch(`/api/comments/${commentId}/delete`, {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
    });
    if(response.status === 201){
        deleteTarget.remove();
    }
};

if(form) {
    form.addEventListener("submit", handleSubmit);
    for(let i = 0; i < deleteComment.length; i++) {
        deleteComment[i].addEventListener("click", handleDelete);
    }
}

//JSON.stringify : JS object를 받아서 string으로 돌려줌.