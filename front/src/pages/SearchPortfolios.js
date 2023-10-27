jin2
jin_2563
온라인

양민정 — 2023.10.26. 오후 5:26
ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
이미지
jin2 — 2023.10.26. 오후 5:26
머죠
혹시
양민정 — 2023.10.26. 오후 5:26
대충 모달창에서 이거 누르면
jin2 — 2023.10.26. 오후 5:26
ai 민정인가요?
양민정 — 2023.10.26. 오후 5:26
프로젝트로 넘어가게!
jin2 — 2023.10.26. 오후 5:26
속도가..
우사인 민정..
양민정 — 2023.10.26. 오후 5:26
모달창 디자인만 만지고
네비게이트 부분도 볼수있음볼게요
현진님 vm때매 고생하시니ㅜ
jin2 — 2023.10.26. 오후 5:27
감삼당...
양민정 — 2023.10.26. 오후 5:27
화이팅이에요ㅠㅠㅠ
jin2 — 2023.10.26. 오후 5:27
제발 ... 오늘은 해결하고 프론트 작업으로 넘어갈게요..
네비게이션은 곧 마무리하겠습니당..
양민정 — 2023.10.26. 오후 5:42
페이지네이션 말슴하시는거죵?
jin2 — 2023.10.26. 오후 5:42
ㅋㅋㅋㅋㅋㅋㅋㅎㅎ
제정신이 아니네요
네
양민정 — 2023.10.26. 오후 5:43
ㅋㅋㅋㅋㅋㅋ찰떡같이 알아듣습니ㅏㄷㅇ
jin2 — 2023.10.26. 오후 5:43
찬물좀 끼언고 올게요
양민정 — 2023.10.26. 오후 5:47
그
프로젝트로 이동하는 버튼은
남한테만 떠요
jin2 — 2023.10.26. 오후 5:48
오 좋아요
양민정 — 2023.10.26. 오후 5:48
방금 수정헸어요,,
jin2 — 2023.10.26. 오후 5:48
열일하시네요.. 정말..
😂
죄송함다..
양민정 — 2023.10.26. 오후 5:48
엥
제가 할일이 없어서 하는거뿐인데용 뭐
여러분들을 도울수있어서 기뻐요
jin2 — 2023.10.26. 오후 5:49
그렇다면.. 다행인데.. ㅋㅋㅋㅋ
다른 할일 너무 많으시면 
누워 쉬세요
ㅋㅋㅋㅋㅋㅋ
양민정 — 2023.10.26. 오후 5:49
아니에요 디자인은 재미있어요,,
jin2 — 2023.10.26. 오후 5:50
글킨하쥬..
ㅋㅋㅋㅋ
양민정 — 2023.10.26. 오후 5:50
저 넵바 이렇게 만들어봐도되나요..?
jin2 — 2023.10.26. 오후 5:50
어트케여?
양민정 — 2023.10.26. 오후 5:50
이미지
파일철처럼!
jin2 — 2023.10.26. 오후 5:50
좋죵
민정 꿈을 펼쳐라
양민정 — 2023.10.26. 오후 5:50
그리고 그 본인 걸로 이동되는 오류는 오래 생각해서 잡아볼게요
ㅋㅋㅋㅋㅋㅋㅋㅋ
jin2 — 2023.10.26. 오후 5:50
넹
양민정 — 오늘 오전 2:16
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import * as Api from "../utils/api";
import Project from "../components/features/project/Project";

function SearchPortfolios() {
확장
SearchPortfolios.js
3KB
﻿
양민정
min9dan9
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
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
  }

  useEffect(() => {
    getProjects();
  }, []);

  const searchHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input === '') setSearchResult(projects);
    setSearchResult(() => {
      const newResult = projects;
      return newResult.filter(project => {
        const contentArray = project.content;
        return contentArray.some(stack => stack.toLowerCase().includes(input));
      })
    })
  }


    return (
      <Container fluid>
          <Row >
            <img 
              src="https://portfolio-ebak.s3.ap-northeast-2.amazonaws.com/Project/1698393779005_%C3%AB%C2%B0%C2%B0%C3%AB%C2%84%C2%88.png"
              alt='배너이미지' />
          </Row>
          <Row xs="auto" className="justify-content-center align-items-center mt-4 mb-4" style={{ height: '200px', width: '100%' }}>
                <Col className="d-flex">
                  <InputGroup>
                    <InputGroup.Text>🔍</InputGroup.Text>
                      <Form.Control
                          type="text"
                          placeholder="기술 스택으로 프로젝트를 검색하세요."
                          style={{width:'40rem'}}
                          onChange={searchHandler}
                        />
                  </InputGroup>
                </Col>
          </Row>
          <Row className="justify-content-center">
          {searchResult.map((project) => (
            <Project key={project._id} project={project} />
          ))}
        </Row>
      </Container>
      );
}

export default SearchPortfolios;



SearchPortfolios.js
3KB