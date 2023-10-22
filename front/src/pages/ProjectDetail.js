import { useNavigate } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const ProjectBox = styled.div`
    background-color: beige;
    width: 70%;
`;

function ProjectDetail( { portfolioOwnerId, project, htmlString }) {
    const navigate = useNavigate();
    const user_id = portfolioOwnerId
    return (
        <>
            <Col xs lg='1'>
                <Button onClick={() => navigate(`${user_id}/projects/${project.id}`)} float='right'>
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