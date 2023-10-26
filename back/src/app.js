import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
// router import
import { projectRouter } from "./routers/projectRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { awardRouter } from "./routers/awardRouter";
import { imageRouter } from "./routers/imageRouter";
// passport 로그인 기능 구현을 위한 패키지들
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";

const app = express();
require("./passport")();

// CORS 에러 방지
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // 모든 HTTP 메서드 허용
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// passport 로그인 기능 구현을 위한 패키지 연결
app.use(
  session({
    secret: "elice",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600, secure: false, httpOnly: true, sameSite: "lax" },
    // 세션 스토어 사용하기
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/loginSession",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(imageRouter);
app.use(projectRouter);
app.use(certificateRouter);
app.use(educationRouter);
app.use(awardRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
