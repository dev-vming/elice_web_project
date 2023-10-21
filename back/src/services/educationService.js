import { User, Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class educationService {
  static async addEducation({
    //user_id,
    userId,
    educationLevel,
    school,
    major,
    startDate,
    endDate,
  }) {
    // user_id를 통해 찾은 user를 저장
    //const userId = await User.findById({ userId });

    const newEducation = {
      userId,
      educationLevel,
      school,
      major,
      startDate,
      endDate,
    };
    console.log("Service의 newEducation값 확인: ", newEducation);
    // db에 저장
    const createdNewEducation = await Education.create(newEducation);
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    return createdNewEducation;
  }

  static async getEducationInfo({ userId }) {
    console.log("특정 유저의 특정 학력 항목 조회 서비스 실행");
    // const findUser = await User.findById({ userId });
    // const education = await Education.findByUserId(findUser);
    const education = await Education.findByUserId({ userId });
    return education;
  }

  static async getEducations() {
    const education = await Education.findAll();
    return education;
  }
  static async updateEducation({ _id }, { toUpdate }) {
    const education = await Education.update({ _id }, { ...toUpdate });

    // 업데이트 대상에 최종학력(educationLevel) 있다면, 즉 educationLevel 값이 null 이 아니라면 업데이트 진행

    return education;
  }

  static async deleteEducation({ _id }) {
    const education = await Education.delete({ _id });
    return education;
  }

  // static async getUserInfo({ userId }) {
  //   const education = await Education.findById({ userId });

  //   // db에서 찾지 못한 경우, 에러 메시지 반환
  //   if (!education) {
  //     const errorMessage =
  //       "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
  //     return { errorMessage };
  //   }

  //   return education;
  // }
}

export { educationService };
