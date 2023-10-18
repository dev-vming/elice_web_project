import { Router } from "express";
import { certificateService } from "../services/certificateService";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";

// app.js
// app.use("/certificates", certificateRouter);

const certificateRouter = Router();

// post 요청 : 자격증 추가
certificateRouter.post("/", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const userId = req.currentUserId;

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const issuingOrganization = req.body.issuingOrganization;
    const getDate = req.body.getDate;

    // 위 데이터를 db에 추가하기
    const newCertificate = await certificateService.addCertificate({
      userId,
      name,
      issuingOrganization,
      getDate,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (err) {
    next(err);
  }
});

// get 요청 : 특정 유저의 자격증 조회
certificateRouter.get(
  "/:userId",
  login_required,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 자격증 조회 실행");
      const { userId } = req.params;
      const certificates = await certificateService.getCertificates({ userId });
      res.status(201).json(certificates);
    } catch (err) {
      next(err);
    }
  }
);

// delete 요청: 특정 자격증 삭제
certificateRouter.delete(
  "/:id",
  login_required,
  async function (req, res, next) {
    try {
      console.log("특정 자격증 삭제 실행");
      const { id } = req.params;

      const certificates = await certificateService.delCertificates({
        id,
      });
      res.status(201).json(certificates);
    } catch (err) {
      next(err);
    }
  }
);

// post 요청: 특정 자격증 수정
certificateRouter.post("/:id", login_required, async function (req, res, next) {
  try {
    const { id } = req.params;

    // 변경할 데이터 받아오기
    const name = req.body.name;
    const issuingOrganization = req.body.issuingOrganization;
    const getDate = req.body.getDate;

    const newValue = { name, issuingOrganization, getDate };
    // 위 데이터를 db에 추가하기
    const updatedCertificates = await certificateService.updateCertificates(
      id,
      newValue
    );

    res.status(201).json(updatedCertificates);
  } catch (err) {
    next(err);
  }
});

export { certificateRouter };
