import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import {localsMiddleware} from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // 뷰 엔진을 pug로 설정
app.set("views", process.cwd() + "/src/views"); 
app.use(logger);
app.use(express.urlencoded({extended: true})); // URL인코더 : exprees 가 form를 이해할 수 있게 하는 미들웨어
app.use(express.json()); // string을 받아서 json으로 바꿔주는 미들웨어

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: process.env.DB_URL }),

    })
);

app.use(flash()); // flash() 미들웨어를 설치한 순간부터 req.falsh라는 함수를 사용할 수 있음.
app.use(localsMiddleware);
// 만약 누군가 /uploads로 가려고 한다면, uploads 폴더의 내용을 보여줌
// static 파일들을 설정하는것은 Express 한테 사람들이 이 폴더 안에 있는 파일들을 볼 수 있게 해달라고 요청하는것과 같음
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"), express.static("node_modules/@ffmpeg/core/dist"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;