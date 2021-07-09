import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}); // 데이터베이스와 연결

const db = mongoose.connection; // 서버와 db서버 사이의 현재 connection에 접속

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DE Error", error); 

db.on("error", handleError); // 여러번 발생시킬 수 있음
db.once("open", handleOpen); // 오로지 한번만 발생
