import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import PeriodCalendar from "../../common/calendar/PeriodCalendar";


 function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
    //useState로 school 상태를 생성함.
    const [school, setSchool] = useState(currentEducation.school);
    //useState로 major 상태를 생성함.
    const [major, setMajor] = useState(currentEducation.major);
    //useState로 graduationstatus 상태를 생성함.
    const [graduationStatus, setGraduationStatus] = useState(currentEducation.graduationStatus);


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = currentEducation.userId;

    // "education/유저id" 엔드포인트로 put 요청함.
    await Api.put(`education/${currentEducation.id}`, {
      user_id,
      school,
      major,
      graduationStatus,
    });

    // "educationlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educationlist", user_id);
    // educations를 response의 data로 세팅함.
    setEducations(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool">
        <Form.Control
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form key={`inline-radio`} controlId="formBasicGraduationStatus" className="mt-3">
        <Form.Check
          inline
          type="radio"
          value= "재학중"
          label= "재학중"
          name="graduationStatus"
          id= 'graduation1'
          checked={graduationStatus === "재학중"}
          onChange={(e) => setGraduationStatus(e.target.value)}
        />
        <Form.Check
          inline
          type="radio"
          value= "학사졸업"
          label= "학사졸업"
          name="graduationStatus"
          id= 'graduation2'
          checked={graduationStatus === "학사졸업"}
          onChange={(e) => setGraduationStatus(e.target.value)}
        />
        <Form.Check
          inline
          type="radio"
          value= "석사졸업"
          label= "석사졸업"
          name="graduationStatus"
          id= 'graduation3'
          checked={graduationStatus === "석사졸업"}
          onChange={(e) => setGraduationStatus(e.target.value)}
        />
        <Form.Check
          inline
          type="radio"
          value= "박사졸업"
          label= "박사졸업"
          name="graduationStatus"
          id= 'graduation4'
          checked={graduationStatus === "박사졸업"}
          onChange={(e) => setGraduationStatus(e.target.value)}
        />
      </Form>


      <Form.Group controlId="formBasicgetsYear" className="mt-3 text-center">
        학력 기간
      <PeriodCalendar />
      </Form.Group>



      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;