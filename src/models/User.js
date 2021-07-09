import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : { type:String, required: true, unique: true },
    avatarUrl: {type: String},
    socialOnly: { type:Boolean, default:false }, // user가 소셜로 로그인했는지 여부를 알기 위해서
    username : { type:String, required: true, unique: true},
    password : { type:String, },
    name : { type: String, required: true},
    location: String,
    videos: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Video"}
    ],
});

// 여기서 this는 create 되는 User를 가리킨다. 즉, userController에서 create 되는것을 가르킴
userSchema.pre("save", async function() {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const User = mongoose.model("User", userSchema);
export default User;