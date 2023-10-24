import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import draftjsToHtml from "draftjs-to-html";
// import ProjectDetail from "../pages/ProjectDetail"; 

function ProjectCard({ project, isEditable, setIsEditing }) { 
  const htmlString = draftjsToHtml(project.editorStateSave[0])
  console.log(htmlString)
  const navigate = useNavigate(); 
  const moveToDetail = () => {
    navigate(`/projects/${project._id}`, { state: { project }});
  }

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col style={
          {backgroundColor: "yellow", height: '100px', overflow: 'hidden'
          //, whiteSpace: 'nowrap', textOverflow: 'ellipsis'
        }
          } onClick={moveToDetail}>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.content}</span>
          <br />
          <span>{project.startDate} ~ {project.endDate}</span>
          <br />
          {project.content.map(stack => {
            return <span style={{ border: '2px solid black', margin: '2px 3px' }}> {stack} </span>
            })}   
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
          htmlString={htmlString}
        />)} */}
    </Card.Text>
  );
}

export default ProjectCard;
