import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import PeriodCalendar from "../../common/calendar/PeriodCalendar";
// import PeriodCalendar from "./Period-Calendar";
// calender의 DatePicker 사용하기 위해서 가져옴
// import DatePicker from "react-datepicker"; 
// import Calender from '../calendar/Calendar';

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [school, setSchool] = useState("");
  //useState로 description 상태를 생성함.
  const [major, setMajor] = useState("");
  const [graduationStatus, setGraduationStatus] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
  

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "award/create" 엔드포인트로 post요청함.
  Api.post("education/create", {
      user_id: portfolioOwnerId,
      school,
      major,
      graduationStatus,
    });

    // "educationlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educationlist", user_id);
    // awards를 response의 data로 세팅함.
    setEducations(res.data);
    // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlid="formBasicSchool">
        <Form.Control
          type="text"
          placeholder="학교"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlid="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Group key={`inline-radio`} controlid="formBasicGraduationStatus" className="mt-3">
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
      </Form.Group>
      
      
      <Form.Group controlid="formBasicgetsYear" className="mt-3 text-center">
        학력 기간
      <PeriodCalendar />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
    </>
  );
}

export default EducationAddForm;
