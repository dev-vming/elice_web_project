import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { convertToRaw } from "draft-js"; 
import draftjsToHtml from "draftjs-to-html";
import ProjectDetail from "../pages/ProjectDetail"; 

function ProjectCard({ portfolioOwnerId, project, isEditable, setIsEditing }) { 
  const htmlString = draftjsToHtml(project.editorStateSave[0])
  console.log(htmlString)
  const user_id = portfolioOwnerId;

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col style={{backgroundColor: "yellow"}}>
          <Link to={`${user_id}/project/detail/${project._id}`} />
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.content}</span>
          <br />
          <span>{project.startDate} ~ {project.endDate}</span>
          <br />
          <div dangerouslySetInnerHTML={{ __html: htmlString }} />
          
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
     {/* {!isEditable && (
      <ProjectDetail 
          style={{display: 'none' }}
          project={project} 
          portfolioOwnerId={portfolioOwnerId}
        />)} */}
    </Card.Text>
  );
}

export default ProjectCard;
