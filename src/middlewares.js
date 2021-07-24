import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName="ColaTube";
    // loggedInUser는 req.session.user인데, 이게 undefined일 수가 있다.
    // 그래서 뒤에 or과 빈 오브젝트를 추가하여 오류페이지 방지
    res.locals.loggedInUser = req.session.user || {};
    next();   
};

// 로그인이 안돼있을때 접근을 방지하기 위한 미들웨어
export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        // 이 미들웨어는 user가 loggedIn 돼 있다면 요청을 계속하게 함
        return next();
    } else {
        // loggedIn 돼 있지 않으면, 로그인 페이지로 리다이렉트
        req.flash("error", "Log in first");
        return res.redirect("/login");
    }
};

// 로그인 돼있지 않은 사람들만 접근 할 수 있게하는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        // 이 미들웨어는 user가 loggedIn 돼 있지 않으면 요청을 계속하게 함
        return next();
    } else {
        // loggedIn 돼 있으면 루트로 리다이렉트
        req.flash("error", "Not authorized");
        return res.redirect("/");
    }
};


// multer configuration object 중에서 dest는 파일을 어디에 보낼지 정해주는것
// 사용자가 파일을 보내면, 그 파일을 어딘가에 넣어야한다.
// 예를들어 아래의 경우에는 무슨 뜻이냐면, uploads/avatars/ 폴더를 만들고
// multer에게 사용자가 업로드하는 모든 파일들을 우리 서버의 uploads/avatars 폴더에 저장하라고 하는것이다.

export const avatarUpload = multer({
    dest: "uploads/avatars/", 
    limits: {
        fileSize: 3000000,
    },
});
export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 10000000,
    },
})