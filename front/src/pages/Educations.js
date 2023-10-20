import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../api";
import {Education, EducationAddForm} from "../components/features/education";

function Educations({portfolioOwnerId, isEditable}) {

    const [ educations, setEducations ] = useState([]);
    const [ isAdding, setIsAdding ] = useState(false);

    useEffect(() => {
        // "educationlist/유저id"로 GET 요청하고, response의 data로 educations를 세팅함.
        Api.get(`${portfolioOwnerId}/educations`).then((res) => setEducations(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card>
            <Card.Body>
            <Card.Title>학력</Card.Title>
            {educations.map((education) => (
                <Education
                key={education.id}
                education={education}
                setEducations={setEducations}
                isEditable={isEditable}
                />
            ))}
            {isEditable && (
                <Row className="mt-3 text-center mb-4">
                <Col sm={{ span: 20 }}>
                    <Button onClick={() => setIsAdding(true)}>+</Button>
                </Col>
                </Row>
            )}
            {isAdding && (
                <EducationAddForm
                portfolioOwnerId={portfolioOwnerId}
                setEducations={setEducations}
                setIsAdding={setIsAdding}
                />
            )}
            </Card.Body>
        </Card>
    );
}

export default Educations;
