import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import draftjsToHtml from "draftjs-to-html";
import * as Api from '../../../utils/api';

function ProjectCard({ portfolioOwnerId, setProjects, project, isEditable, setIsEditing }) { 
  const htmlString = draftjsToHtml(project.editorStateSave[0])
  const navigate = useNavigate(); 
  const moveToDetail = () => {
    navigate(`/projects/${project._id}`, { state: { project }});
  }

  const deletecard = async () => {
    if(window.confirm('게시물을 삭제하시겠습니까?')) {
        await Api.delete(`${portfolioOwnerId}/projects/${project._id}`).then((res) => {
            alert("삭제되었습니다!");
            setProjects((prev)=> prev.filter((item)=>item._id !== project._id));
        })
    } 
}

  return (
    // <Card className="back-ground: yellow" >
      <Card.Body className="project-body-content" >
      <Row className="align-items-center">
        <Col style={
          {backgroundColor: "white", height: '150px', 
          //, whiteSpace: 'nowrap', textOverflow: 'ellipsis'
          }
          } onClick={moveToDetail}>

            <Card.Title> {project.title} </Card.Title>
        
          <ListGroup.Item className = "overflow-hidden">
            <ListGroup.Item> {project.startDate} ~ {project.endDate}</ListGroup.Item>
            <ListGroup.Item> {project.content.map(stack => {
            return <span style={{ border: '1px solid gray', padding: '3px 6px' }}> {stack} </span>
            })} </ListGroup.Item>
         <ListGroup.Item><div dangerouslySetInnerHTML={{ __html: htmlString }} /></ListGroup.Item>
            </ListGroup.Item>

         
         
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
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deletecard()}
              className="mr-3"
            >
              삭제
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
        </Card.Body>
    // </Card>
  );
}

export default ProjectCard;
