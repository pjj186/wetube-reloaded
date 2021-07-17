import express from "express";
import {getEdit, watch, postEdit, getUpload, postUpload, deleteVideo} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";
const videoRouter = express.Router();

// GET 방식을 이용하면 form에 있는 정보가 URL에 들어감
// POST는 웹에서 전송하는 데이터가 나의 데이터베이스 상태를 수정할때 사용
videoRouter.route("/:id([0-9a-f]{24})").get(watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit); // 하나의 url에 get,post 방식을 쓰도록 할 때 유용
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.fields([
    { name:"video" },
    { name:"thumb" },
  ]), postUpload);

export default videoRouter;