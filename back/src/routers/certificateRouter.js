import { Router } from "express";
import { certificateService } from "../services/certificateService";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";

const certificateRouter = Router();

// post 요청 : 자격증 추가
certificateRouter.post(
  "/:userId/certificates",
  login_required,
  is_request_body,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 자격증 추가 실행");
<<<<<<< HEAD
=======

      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810

      const { userId } = req.params;

      // 추가할 데이터
      const { name, issuingOrganization, certificatedDate } = req.body;

      // 데이터를 db에 추가
      const newCertificate = await certificateService.addCertificate({
        userId, //user의 오브젝트 아이디
        name,
        issuingOrganization,
        certificatedDate,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newUser.errorMessage);
      }

      res.status(201).json(newCertificate);
    } catch (err) {
      next(err);
    }
  }
);

// get 요청 : 특정 유저의 자격증 조회
// 받아온 userId가 어차피 user의 objectId니까 userId로 바로바로 넘김
certificateRouter.get(
  "/:userId/certificates",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 자격증 조회 실행");
      const { userId } = req.params;
      const certificates = await certificateService.getCertificates({
        userId,
      });
      res.status(201).json(certificates);
    } catch (err) {
      next(err);
    }
  }
);

// delete 요청: 특정 자격증 삭제
certificateRouter.delete(
  "/:userId/certificates/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 자격증 삭제 실행");
      const { id } = req.params;

<<<<<<< HEAD
=======
      if (userId !== current_user_id) {
        throw new Error("자격증 삭제 권한이 없습니다");
      }

>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
      const certificates = await certificateService.deleteCertificate({
        _id: id,
      });
      res.status(201).json(certificates);
    } catch (err) {
      next(err);
    }
  }
);

// post 요청: 특정 자격증 수정
certificateRouter.post(
  "/:userId/certificates/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 자격증 수정 실행");
<<<<<<< HEAD
=======

      const { userId, id } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("자격증 수정 권한이 없습니다");
      }
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810

      const { id } = req.params;
      // newValue : 변경할 데이터
      const name = req.body.name ?? null;
      const issuingOrganization = req.body.issuingOrganization ?? null;
      const certificatedDate = req.body.certificatedDate ?? null;

      const toUpdate = { name, issuingOrganization, certificatedDate };

      // 데이터를 db에 추가
      const updatedCertificate = await certificateService.updateCertificate(
        { _id: id },
        { toUpdate }
      );

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      res.status(201).json(updatedCertificate);
    } catch (err) {
      next(err);
    }
  }
);

export { certificateRouter };
