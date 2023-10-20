import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import PeriodCalendar from "../../common/calendar/PeriodCalendar";


function EducationEditForm({ currentEducation, setEducations, setIsEditing , setIsVisibility }) {
    //useState로 school 상태를 생성함.
    const [school, setSchool] = useState(currentEducation.school);
    //useState로 major 상태를 생성함.
    const [major, setMajor] = useState(currentEducation.major);
    //useState로 graduationstatus 상태를 생성함.
    const [graduationStatus, setGraduationStatus] = useState(currentEducation.graduationStatus);
    //useState로 startDate,endDate 상태를 생성함.
    const [ startDate, setStartDate ] = useState(currentEducation.startDate);
    const [ endDate, setEndDate ] = useState(currentEducation.endDate);


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = currentEducation.userId;

    // "education/유저id" 엔드포인트로 put 요청함.
    await Api.put(`education/${currentEducation.id}`, {
      user_id,
      school,
      major,
      educationLevel,
      startDate,
      endDate,
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
        <Form.Label>학교</Form.Label>
        <Form.Control
          type="text"
          placeholder="학교명을 입력하세요."
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공/계열을 입력하세요."
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <br/>
      <Form.Group controlId="formBasicEducationLevel">
          <DropdownButton id="EducationLevel" title={educationLevel} onSelect={(eventKey)=>setEducationLevel(eventKey)}>
            <DropdownItem eventKey="졸업">졸업</DropdownItem>
            <DropdownItem eventKey="재학중">재학중</DropdownItem>
            <DropdownItem eventKey="학사 졸업">학사 졸업</DropdownItem>
            <DropdownItem eventKey="석사 졸업">석사 졸업</DropdownItem>
            <DropdownItem eventKey="박사 졸업">박사 졸업</DropdownItem>
          </DropdownButton>
      </Form.Group>
      <br/>

      <Form.Group controlid="formBasicgetDate" className="mt-3">
        <Form.Label>재학 기간</Form.Label>
          <PeriodCalendar 
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            />
        </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3" onClick={()=>setIsVisibility(true)}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => {
            setIsEditing(false)
            setIsVisibility(true)
            }}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
