import { Link, useParams } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const ProjectBox = styled.div`
    background-color: beige;
    width: 70%;
`;

function ProjectDetail( { project, htmlString }) {
    const params = useParams();

    return (
        <>
            <Col xs lg='1'>
                <Button float='right'>
                    <Link to={`${params.user_id}/projects/${params._id}`} />
                    닫기
                </Button>
            </Col>
            <ProjectBox>
                <h1>{project.title}</h1>
                <span className="text-muted">{project.description}</span>
                <br />
                <span>{project.startDate} ~ {project.endDate}</span>
                <br />
                <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </ProjectBox>
        </>
    )
}

export default ProjectDetail;