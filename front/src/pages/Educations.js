import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../api";
import {Education, EducationAddForm} from "../components/features/education";

function Educations({portfolioOwnerId, isEditable}) {
    //useState로 educations 상태를 생성함.
    const [ educations, setEducations ] = useState([]);
    //useState로 isAdding 상태를 생성함.
    const [ isAdding, setIsAdding ] = useState(false);
    //useState로 isVisibility 상태를 생성함.
    const [ isVisibility, setIsVisibility ] = useState(true);

    const getUser = useCallback(() => {
        Api.get(`${portfolioOwnerId}/educations`).then((res) => setEducations(res.data));
    },[portfolioOwnerId]);

    useEffect(() => {
        getUser();
<<<<<<< HEAD
    }, [getUser,portfolioOwnerId]);
=======
    }, [getUser, portfolioOwnerId]);
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810

    return (
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                {educations.map((education) => (
                    <Education
                        key={education._id}
                        education={education}
<<<<<<< HEAD
                        setEducations={setEducations}
                        isEditable={isEditable}
                        setIsVisibility={setIsVisibility}
=======
                        eduations={educations}
                        setEducations={setEducations}
                        isEditable={isEditable}
                        setIsVisibility={setIsVisibility}
                        portfolioOwnerId={portfolioOwnerId}
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
                    />
                ))}
                {isEditable && isVisibility && (
                    <Row className="mt-3 text-center mb-4">
                    <Col sm={{ span: 20 }}>
                        <Button onClick={() => {
                            setIsAdding(true)
                            setIsVisibility(false)}}>+</Button>
                    </Col>
                    </Row>
                )}
                {isAdding && (
                    <EducationAddForm
                    portfolioOwnerId={portfolioOwnerId}
                    setEducations={setEducations}
                    setIsAdding={setIsAdding}
                    setIsVisibility={setIsVisibility}
                    />
                )}
            </Card.Body>
        </Card>
    );
}

export default Educations;

