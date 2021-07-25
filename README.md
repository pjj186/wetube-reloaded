# Wetube Reloaded

## Use
- [x] Node.js
- [x] nodemon : 자바스크립트 파일의 내용이 변경 될 때마다 이것을 감지하고 서버 프로세스를 재시작
- [x] Express : 백엔드!
- [x] babel-node : ES6로 쓰여진 자바스크립트 코드를 브라우저가 이해할 수 있게 해주는 역할
- [x] babel-cli : babel-node는 실제로 서비스 되는 곳이 아니라 개발 할 때 사용되는 목적으로 사용하는데, babel-node를 사용하면 performance 문제가 있다. 그래서 실제로 서비스하기 위해선 코드를 일반적인 javascript 코드로 바꿔줘야한다. 이를 위해서 사용하는것이 Babel CLI 이다.
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

- [x] FFmpeg : 미디어 파일을 다루는 데 사용! 포맷변환, 오디오 추출 등 대신 실행비용이 크다.
- [x] WebAssembly : 프론트엔드에서 매우 빠른 코드를 실행할 수 있게 해준다. 즉, 실행 비용이 큰 프로그램들을 브라우저에서 실행 할 수 있음 (하지만 복잡하기 때문에, 일반적으로는 WebAssembly를 많이 다루지 않을것)
- [x] ffmpeg.wasm : FFmpeg 와 WebAssembly 의 두가지 개념을 결합한 것, 비디오를 변환하기 위해 사용자의 컴퓨터를 사용함. 즉, 사용자의 브라우저에서 비디오를 변환하는것 (서버의 처리 능력을 사용하지 않고, 사용자 컴퓨터의 처리 능력을 사용함)

- [x] express-flash : 템플릿에서 사용자에게 flash-message를 남길 수 있게 해주는 미들웨어. 이 메세지는 session에 근거하기 때문에 한 사용자만이 볼 수 있음. controller에서도 메시지를 남길 수 있고, 미들웨어를 사용해서 남길 수도 있다. 중요한점은 req.flash() 함수를 호출해야 한다는것
- 특징 <br>
> 1. locals 속성을 만들어서 템플릿에 사용했던 것처럼, flash 미들웨어를 설치하면, messages locals가 만들어진다. local 미들웨어를 만들어서 템플릿에 바로 사용했던 것처럼 views에서 바로 사용이 가능하다
> 2. flash 미들웨어를 사용 (app.use(flash())) 하고, 메시지를 넣고싶은 부분에 req.flash를 사용하면 res.locals 처럼 messages.locals를 만들어준다.
> 3. req.flash에서 에러의 종류를 설정하면 템플릿에서 messages.(에러의종류) 로 사용할 수 있다.
> 4. flash message는 한 번만 보여진다. 메시지가 한 번 보여지고 나면 express가 메시지를 cache에서 지워버린다. (새로고침 하면 사라짐)
> 5. 사용자에게 일회성 메시지를 보내고 싶다면, 아주 유용한 미들웨어
 
- [x] Heroku : 프로젝트를 실제 서버에 배포할때 사용!
- [x] MongoDB Atlas
- [x] AWS S3
- [x] AWS IAM : API KEY를 만들수 있게 해준다.
- [x] Multer S3 
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
- [x] Comment 
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