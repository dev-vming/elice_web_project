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
    <Card.Text className="justrify-content-center align-items-center">
      <Row className="align-items-center">
        <Col style={
          {backgroundColor: "yellow", height: '200px', overflow: 'hidden' }
          } onClick={moveToDetail}>
          <span>{project.title}</span>
          <br />
          <span>{project.startDate} ~ {project.endDate}</span>
          <br />
          {project.content.map(stack => {
            return <span style={{ border: '2px solid black', margin: '2px 3px' }}> {stack} </span>
            })}   
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3">
              편집
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deletecard()}
              className="mr-3">
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
