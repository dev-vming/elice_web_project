import { Router } from "express";
import multer from "multer";
import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { v4 } from "uuid";

const imageRouter = Router();
const bucketName = process.env.S3_BUCKET_NAME;
const bucketRegion = process.env.S3_REGION;

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: bucketRegion,
});

const imageUpload_user = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: function (req, file, cb) {
      const extention = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(extention)) {
        return cb(new Error("이미지 파일이 아닙니다."));
      }
      cb(null, `User-img/${v4()}.${extention}`);
    },
  }),
  acl: "public-read",
  limits: { fileSize: 5 * 1024 * 1024 },
});

const imageUpload_project = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: function (req, file, cb) {
      const extention = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(extention)) {
        return cb(new Error("이미지 파일이 아닙니다."));
      }
      cb(null, `Project/${v4()}.${extention}`);
    },
  }),
  acl: "public-read",
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 추가 - 프로젝트
imageRouter.post(
  "/projects/uploads",
  imageUpload_project.single("image"),
  async (req, res, next) => {
    try {
      res.status(201).json({
        message: "이미지 저장 성공",
        imagePath: req.file.location,
      });
    } catch (err) {
      next(err);
    }
  }
);

// 이미지 추가 - 유저
imageRouter.post(
  "/users/:id/uploads",
  imageUpload_user.single("image"),
  async (req, res, next) => {
    try {
      res.status(201).json({
        message: "이미지 저장 성공",
        imagePath: req.file.location,
      });
    } catch (err) {
      next(err);
    }
  }
);

// req의 데이터를 AWS가 요구하는 형식으로 변환
function getFilename(req, res, next) {
  try {
    const { deleteItems } = req.body;
    const urlHead = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/`;
    let convert = [];
    for (let i = 0; i < deleteItems.length; i++) {
      convert.push({ Key: deleteItems[i].replace(urlHead, "") });
    }
    req.body.deleteItems = convert;

    next();
  } catch (err) {
    next(err);
  }
}

// 이미지 삭제 - 프로젝트
imageRouter.delete("/projects/uploads", getFilename, async (req, res, next) => {
  const { deleteItems } = req.body;
  const command = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      Objects: deleteItems,
    },
  });

  try {
    await s3.send(command);
    res.status(200).json("이미지 삭제 성공");
  } catch (err) {
    console.error(err);
  }
});

export { imageRouter };
