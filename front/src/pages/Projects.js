import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../api";
import { Project, ProjectAddForm } from '../components/features/project'

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const getUser = useCallback(() => {
    Api.get(`${portfolioOwnerId}/projects`).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  useEffect(() => {
<<<<<<< HEAD
    Api.get(`${portfolioOwnerId
    }/projects`).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);
=======
    getUser();
  }, [getUser,portfolioOwnerId]);

>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810

  return (  //추가, 편집 중에 버튼 안보이게, line 27
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projects.map((project) => (
          <Project
            portfolioOwnerId={portfolioOwnerId}
            key={project._id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {isEditable && !isAdding && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)} >+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;