import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post("/", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await educationService.addEducation({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// educationRouter.get("/:id", async function (req, res, next) {
//   try {
//     // req (request) 에서 데이터 가져오기
//     const email = req.body.email;
//     const password = req.body.password;

//     // 위 데이터를 이용하여 유저 db에서 유저 찾기
//     const user = await educationService.getEducation({ email, password });

//     if (user.errorMessage) {
//       throw new Error(user.errorMessage);
//     }

//     res.status(200).send(user);
//   } catch (error) {
//     next(error);
//   }
// });

educationRouter.get("/", login_required, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await educationService.getEducations();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

educationRouter.get(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const { id } = req.params;
      const educationInfo = await educationService.getUserInfo({
        id,
      });

      if (educationInfo.errorMessage) {
        throw new Error(educationInfo.errorMessage);
      }

      res.status(200).send(educationInfo);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:education_id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const { education_id } = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatededucation = await educationService.setUser({
        education_id,
        toUpdate,
      });

      if (updatededucation.errorMessage) {
        throw new Error(updatededucation.errorMessage);
      }

      res.status(200).json(updatededucation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      const education_id = req.params.id;
      const educationInfo = await educationService.getUserInfo({
        education_id,
      });

      if (educationInfo.errorMessage) {
        throw new Error(educationInfo.errorMessage);
      }

      res.status(200).send(educationInfo);
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
// userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
//   res
//     .status(200)
//     .send(
//       `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
//     );
// });

export { educationRouter };
