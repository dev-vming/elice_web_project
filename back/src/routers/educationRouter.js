import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";

const educationRouter = Router();

// 학력 항목 추가 기능
educationRouter.post(
  "/:userId/educations",
  login_required,
  is_request_body,
  check_permission,
  async function (req, res, next) {
    try {
<<<<<<< HEAD
=======
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
      const { userId } = req.params;
      // req (request) 에서 데이터 가져오기
      const { educationLevel, school, major, startDate, endDate } = req.body;
      // 위 데이터를 유저 db에 추가하기
      const newEducation = await educationService.addEducation({
        userId,
        educationLevel,
        school,
        major,
        startDate,
        endDate,
      });

      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }

      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);

// delete 요청: 특정 수상경력 삭제
educationRouter.delete(
  "/:userId/educations/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
<<<<<<< HEAD
      const { id } = req.params;
=======
      const { userId, id } = req.params;
      //const education_id = id;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("학력 항목 삭제 권한이 없습니다.");
      }
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
      const deletedEducation = await educationService.deleteEducation({
        _id: id,
      });
      res.status(201).json(deletedEducation);
    } catch (err) {
      next(err);
    }
  }
);

// 코드 수정 및 테스트 작업중(학력 개별 항목 수정 기능)
educationRouter.post(
  "/:userId/educations/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 특정 학력 항목 수정 실행");
<<<<<<< HEAD
      const { id } = req.params;
=======
      const { userId, id } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("학력 항목 수정 권한이 없습니다.");
      }

>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
      // req에서 변경할 데이터를 받아온다
      const educationLevel = req.body.educationLevel ?? null;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;

      const toUpdate = { educationLevel, school, major, startDate, endDate };

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const updatedEducation = await educationService.updateEducation(
        { _id: id },
        { toUpdate }
      );
      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }
      res.status(201).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/:userId/educations",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const educationInfo = await educationService.getEducations({
        //user_id: userId,
        userId,
      });

      res.status(201).json(educationInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
