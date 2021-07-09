import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import {localsMiddleware} from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // 뷰 엔진을 pug로 설정
app.set("views", process.cwd() + "/src/views"); 
app.use(logger);
app.use(express.urlencoded({extended: true})); // URL인코더 : exprees 가 form를 이해할 수 있게 하는 미들웨어 

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: process.env.DB_URL }),

    })
);

app.use(localsMiddleware);
// 만약 누군가 /uploads로 가려고 한다면, uploads 폴더의 내용을 보여줌
// static 파일들을 설정하는것은 Express 한테 사람들이 이 폴더 안에 있는 파일들을 볼 수 있게 해달라고 요청하는것과 같음
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;