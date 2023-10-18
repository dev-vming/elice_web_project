import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { Certificate } from "../db/models/Certificate";

class certificateService {
  // 자격증 생성
  // 추가해야 할 사항 : 현재 접속한 유저와 작성자가 일치하는지 확인하고 아니면 error
  // 개선 가능한 사안 : name을 확인해서 동일한 이름이 존재하면 errorMessage : 이미 등록한 자격증입니다 를 반환함
  static async addCertificate({ userId, name, issuingOrganization, getDate }) {
    const id = uuidv4();
    const author = await User.findById({ user_id: userId });

    const newCertificate = {
      id,
      author,
      name,
      issuingOrganization,
      getDate,
    };
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }

  static async getCertificates({ userId }) {
    const findUser = await User.findById({ user_id: userId });
    console.log("findUser : ", findUser);
    const certificates = await Certificate.findByUser(findUser);
    return certificates;
  }

  static async delCertificates({ id }) {
    const certificates = await Certificate.delete({ id });
    return certificates;
  }

  static async updateCertificates(id, newValue) {
    const certificates = await Certificate.update(id, newValue);
    return certificates;
  }
  // 확인용 (실제 사용 x)
  static async getAllCertificates() {
    console.log("getCertificates 실행");
    const users = await Certificate.findAll();
    return users;
  }
}

export { certificateService };
