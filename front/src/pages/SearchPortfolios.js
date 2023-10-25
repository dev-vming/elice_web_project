import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../utils/api";
import UserCard from "../components/features/user/UserCard";
import Project from "../components/features/project/Project";
import { UserStateContext } from "../App";
import ProjectStackList from '../components/features/project/ProjectStackList';

function SearchPortfolios() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [stackName, setStackName] = useState('');

  // useEffect(() => {
  //   // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
  //   if (!userState.user) {
  //     navigate("/login");
  //     return;
  //   }
  //   // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
  //   Api.get("userlist").then((res) => setUsers(res.data));
  // }, [userState, navigate]);

  useEffect(() => {
    Api.get("userlist").then((res) => setUsers(res.data))
    Api.get("projects").then((res) => setSearchResult(res.data));
  }, []);

  const searchHandler = (e) => {
    const _stackName = e.target.value?? "" ; 
    setStackName(_stackName.toLowerCase());
    // setSearchResult(projects.filter((project) => {
    //   if(project.content.forEach((stack) => stack.toLowerCase() === stackName)) return project;
    // }));
    console.log(_stackName, searchResult)
    // setSearchResult((prev) => prev.filter((project) => project.content.includes(_stackName.toLowerCase()))   )
    setSearchResult((prev) => prev.filter((project) => 
    project.content.findIndex(stack => stack.toLowerCase().includes(_stackName.toLowerCase())) !== -1 ))

    // project.content((stack) => stack.toLowerCase().includes(stackName))));


  };

  const clickHandler = () => {

    setStackName(''); 
  };

  return (
    <Container fluid>
      <Row xs="auto" className="justify-content-center align-items-center mt-4 mb-4" style={{height: '200px', width: '100%'}}>
        <Form>
          <Row>
            <Col className="d-flex">
              <Form.Control
                style={{width: '50%'}}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={searchHandler}
              />
              <Button variant="outline-success" type='submit' onClick={clickHandler}>Search</Button>
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
