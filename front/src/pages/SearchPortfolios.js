import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as Api from "../utils/api";
import Project from "../components/features/project/Project";

function SearchPortfolios() {
  const [projects, setProjects] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const getProjects = () => {
    Api.get("projects").then((res) => {
      setProjects(res.data);
      setSearchResult(res.data);
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const searchHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input == "") setSearchResult(projects);
    setSearchResult(() => {
      const newResult = projects;
      return newResult.filter((project) => {
        const contentArray = project.content;
        return contentArray.some((stack) =>
          stack.toLowerCase().includes(input)
        );
      });
    });
  };

  return (
    <Container fluid>
      <Row
        xs="auto"
        className="justify-content-center align-items-center mt-4 mb-4"
        style={{ height: "200px", width: "100%" }}
      >
        <Form>
          <Row>
            <Col className="d-flex">
              <Form.Control
                style={{ width: "400px" }}
                type="text"
                placeholder="Search"
                className="me-2"
                onChange={searchHandler}
              />
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="justify-content-center">
        {/* {users.map((user) => (
          <UserCard key={user._id} user={user} isNetwork />
        ))} */}
        {searchResult.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </Row>
    </Container>
  );
}

export default SearchPortfolios;
