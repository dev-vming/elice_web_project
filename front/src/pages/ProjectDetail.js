import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import draftjsToHtml from "draftjs-to-html";

const ProjectBox = styled.div`
    background-color: beige;
    width: 70%;
`;

function ProjectDetail( ) {
    const navigate = useNavigate();
    const location = useLocation();
    const project = location.state.project;
    const htmlString = draftjsToHtml(project.editorStateSave[0])
    const moveToProjectCard = () => {
        navigate(`${project.userId}/projects/${project._id}`);
    }
    console.log(project)

    return (
        <>
            <Col xs lg='1'>
                <Button float='right' onClick={moveToProjectCard}>
                    닫기
                </Button>
            </Col>
            <ProjectBox>
                <h1>{project.title}</h1>
                <span className="text-muted">{project.content}</span>
                <br />
                <span>{project.startDate} ~ {project.endDate}</span>
                <br />
                <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </ProjectBox>
        </>
    )
}

export default ProjectDetail;