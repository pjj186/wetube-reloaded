# Wetube Reloaded

## Use
- [x] Node.js
- [x] nodemon : 자바스크립트 파일의 내용이 변경 될 때마다 이것을 감지하고 서버 프로세스를 재시작
- [x] Express : 백엔드!
- [x] babel : ES6로 쓰여진 자바스크립트 코드를 브라우저가 이해할 수 있게 해주는 역할
- [x] Pug : 템플릿 엔진
- [x] mongoDB : 데이터베이스
- [x] mongoose : MongoDB를 자바스크립트 코드를 이용하여 다룰수 있게 하는 미들웨어
- [x] express-session : Express 프레임워크에서 세션을 관리하기 위해 필요한 미들웨어
- [x] connect-mongo (MongoStore) : 세션을 데이터베이스에 저장하기 위해 사용한 몽고DB를 기초로 한 세션 저장소 -> 서버를 재 시작하더라도 세션은 DB에 저장되어 있기때문에 로그인이 되있다면 잊어버리지 않음!
- [x] dotenv
- [x] OAuth : 깃 허브 로그인 기능!
- [x] Multer : 파일을 업로드할때 사용하는 편리한 미들웨어
- [x] WebPack : 브라우저가 이해하지 못하는 세련되게 짜여진 코드 / CSS를 브라우저가 이해 할 수 있는 호환성 있는 코드 / CSS로 전환하기 위해 사용
- Loaders <br>
> 1. babel-loader : ES6로 작성한 자바스크립트 코드를 브라우저가 이해할 수 있게 변환시켜줌
> 2. scss-loader : scss 파일을 가져다가 css 파일로 전환시켜줌
> 3. css-loader : @import랑 url()을 풀어서 해석해주는 역할
> 4. style-loader : CSS를 DOM에 주입해주는 역할
> 5. MiniCssExtractPlugin : javascript 파일에서 css를 넣고 싶지 않고, 분리된 css 파일을 사용하기 위해 설치한 플러그인 (style-loader 대신 사용)

***

## Functions
- [x] Home
- [x] Join
- [x] Login
- [x] Search
- [x] See Video
- [x] Edit Video
- [x] Delete Video
- [x] Upload Video
- [x] Log out
- [x] See User
- [x] Edit My Profile
***

## Routers
>/ -> Home <br>
>/join -> Join <br>
>/login -> Login <br>
>/search -> Search <br><br>

>/users/:id -> See User <br>
>/users/logout -> Log Out <br>
>/users/edit -> Edit MY Profile <br>
>/users/delete -> Delete MY Profile <br><br>

>/videos/:id -> See Video <br>
>/videos/:id/edit -> Edit Video <br>
>/videos/:id/delete -> Delete Video <br>
>/videos/upload -> Upload Video <br><br>