import { User, Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
//import { User } from "../db";
class educationService {
  static async addEducation({
    user_id,
    educationlevel,
    school,
    major,
    startDate,
    endDate,
  }) {
    /*
    // 이메일 중복 확인
    const education = await Education.findByEmail({ email });
    if (education) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };
    */
    // user_id를 통해 찾은 user를 저장
    console.log("service(addeducation)");
    const userId = await User.findById({ user_id });

    console.log("값 확인 userId ", userId);
    console.log("값 확인 user_id ", user_id);
    console.log("값 확인 educationlevel ", educationlevel);
    console.log("값 확인 school ", school);
    console.log("값 확인 major ", major);
    console.log("값 확인 startDate ", startDate);
    console.log("값 확인 endDate ", endDate);
    console.log("여기까지 왔 ");
    const newEducation = {
      userId,
      educationlevel,
      school,
      major,
      startDate,
      endDate,
    };
    console.log("여기까지 왔나 1111111111111111 ");
    // db에 저장
    const createdNewEducation = await Education.create(newEducation);
    console.log("여기까지 왔나 22222222222222222222 ");
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    console.log("여기까지 왔나 33333333333333333333 ");
    return createdNewEducation;
  }

  static async getEducation({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const education = await Education.findByEmail({ email });
    if (!education) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = education.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = education.id;
    const name = education.name;
    const description = education.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getEducationInfo(userId) {
    console.log("특정 유저의 특정 학력 항목 조회 서비스 실행");
    const education = await Education.findByUserId({ userId });
    return education;
  }

  static async getEducations() {
    const education = await Education.findAll();
    return education;
  }
  //static async updateEducation({ education_id, toUpdate }) {
  static async updateEducation(education_id, toUpdate) {
    //console.log("함수 매개변수 확인(toUpdate) ", toUpdate);
    // console.log("함수 매개변수 확인(education_id) ", education_id);
    // console.log(
    //   "함수 매개변수 확인(toUpdate.educationlevel) ",
    //   toUpdate.educationlevel
    // );
    // console.log("함수 매개변수 확인(toUpdate.school) ", toUpdate.school);
    // console.log("함수 매개변수 확인(toUpdate.major) ", toUpdate.major);
    // console.log("함수 매개변수 확인(toUpdate.startDate) ", toUpdate.startDate);
    // console.log("함수 매개변수 확인(toUpdate.endDate) ", toUpdate.endDate);
    const tempValue = toUpdate.educationlevel;
    /*
    let education = await Education.update({
      education_id,
      //fieldToUpdate,
      toUpdate,
    });
    */
    let education;
    /*
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let education = await Education.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
*/
    // 업데이트 대상에 최종학력(educationlevel) 있다면, 즉 educationlevel 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.educationlevel) {
      const fieldToUpdate = "educationlevel";
      const newValue = toUpdate.educationlevel;
      console.log(
        "newValue(educationlevel) db 업데이트 전 확인 ",
        toUpdate.educationlevel
      );
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      console.log("newValue(school) db 업데이트 전 확인 ", toUpdate.school);
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      console.log("newValue(major) db 업데이트 전 확인 ", toUpdate.major);
      //const newValue = bcrypt.hash(toUpdate.password, 10);
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      console.log(
        "newValue(startDate) db 업데이트 전 확인 ",
        toUpdate.startDate
      );
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      console.log("newValue(endDate) db 업데이트 전 확인 ", toUpdate.endDate);
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }
    console.log("모든 항목 업데이트 완료 후 updateEducation 함수 종료 ");
    return education;
  }

  static async deleteEducation(education_id) {
    console.log(
      "deleteEducation함수 매개변수 확인(education_id) ",
      education_id
    );
    const education = await Education.delete(education_id);
    return education;
  }

  static async getUserInfo({ user_id }) {
    const education = await Education.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }
}

export { educationService };
