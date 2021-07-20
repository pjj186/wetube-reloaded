// 여기서 의미하는 API란 백엔드가 템플릿을 렌더링하지 않을 때 프론트와 백엔드가 통신하는 방법을 말한다.
import express from "express";
import { registerView, createComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;