import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text : {type:String, required: true },
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}, // 댓글은 유저가 다니까
    video : {type: mongoose.Schema.Types.ObjectId, required:true, ref: "Video"},  // 댓글은 비디오에 달리니까
    createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;