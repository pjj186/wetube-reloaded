import "regenerator-runtime";
import "dotenv/config";
import "./db"; // 파일 자체를 import, import 되는 순간, 자동적으로 실행
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";


const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`) ;

app.listen(PORT, handleListening);