import Video from "../models/Video";
import User from "../models/User";


export const home = async(req, res) => {
    const {user : _id} = req.session;
    const videos = await Video.find({})
        .sort({createdAt:"desc"})
        .populate("owner");
    const user = await User.findById(_id);
    console.log(user);
    return res.render("home", {pageTitle: "Home", videos});
};
export const watch = async(req, res) => {
    const { id } = req.params; // = const id = req.params.id;
    // populate를 하면 mongoose가 id를 이용해 video를 찾고 그 안에서 owner도 찾아준다.
    // ref : "User" 이므로 owner 안에 User 오브젝트를 받아온다.
    const video = await Video.findById(id).populate("owner");
    if(!video) {
        return res.status(404).render("404", { 
            pageTitle: "Video not found. "});
    }
    return res.render("watch", {pageTitle: video.title, video });
};
    
export const getEdit = async(req, res) => { // form을 화면에 보여주는 녀석
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle: "Video not found."});
    }
    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("edit", {pageTitle:`Edit ${video.title}`, video});
};

export const postEdit = async(req, res) => { // 변경사항을 저장해주는 녀석
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({_id: id}); // exists 함수는 true/false를 반환함
    const videoModified = await Video.findByIdAndUpdate(id, {
        title:title,
        description:description,
        hashtags: Video.formatHashtags(hashtags),
    });
    console.log(video);
    console.log(videoModified);
    if(!video){
        return res.status(404).render("404", {pageTitle: "Video not found."});
    }
    if(String(videoModified.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};

export const postUpload = async (req, res) => {
    const {
        session: {
            user: { _id }
        },
        file : {
            path : fileUrl
        },
        body : {
            title, description, hashtags
        }
    } = req;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl,
            owner:_id, // User의 id
            hashtags : Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    } catch(error) {
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    const user = await User.findById(_id);
    if(!video){
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }

    await Video.findByIdAndDelete(id);
    // User DB 내부에서도 Video를 삭제해줍니다.
    user.videos.splice(user.videos.indexOf(id),1);
    user.save();
    return res.redirect("/");
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if(keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        }).populate("owner");
    }
    return res.render("search", {pageTitle: "Search", videos });
};