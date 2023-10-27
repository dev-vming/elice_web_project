import { Button, Modal, Stack, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProjectDetailModal({show, onHide, project, htmlString, isEditable }) {
    const navigate = useNavigate();

    return (
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>프로젝트 상세보기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>{project.title}</h2>
                <hr class="my-2"/>
                <Stack direction="horizontal" gap={1}>
                    {project.content.map(stack => 
                    <Badge bg="secondary">{stack}</Badge>
                    )}
                </Stack>
                <hr class="my-2"/>
                {project.startDate.split('T')[0]}~{project.endDate.split('T')[0]}
                <hr class="my-2"/>
                <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </Modal.Body>
            <Modal.Footer>
                {!isEditable && (
                    <Button variant="primary" onClick={()=> navigate(`/users/${project.userId}`)}>
                        프로젝트 더 보기
                    </Button>
                )}


            </Modal.Footer>
        </Modal>
    );
}

export default ProjectDetailModal;