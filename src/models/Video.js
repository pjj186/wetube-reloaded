// Model은 DB가 처리할 데이터의 형태를 의미
import mongoose from "mongoose";

// Model의 생김새 : Schema
const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, manLength: 80 },
    fileUrl: {type: String, required:true},
    thumbUrl : {type:String, required: true},
    description: {type: String, required: true, trim: true, minLength: 20},
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{type: String, trim: true}],
    meta: {
        views:{type:Number, default: 0, required:true},
    },
    owner: {type:mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
});

videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags.split(",").map((word) => word.startsWith('#') ? word : `#${word}`);
})

const Video = mongoose.model("Video", videoSchema);

export default Video;