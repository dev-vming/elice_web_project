import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg"; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js"; 
//convertToRaw: editorState 객체가 주어지면 원시 js 구조로 변환
import draftjsToHtml from "draftjs-to-html"; //원시 JS 구조를 HTML로 변환(객체가 보이도록 HTML로 변환)
import axios from "axios";

//텍스트에디터 출력 확인 공간
const RowBox = styled.div`
width: 100%;
display: flex;
`;

const Viewer = styled.div` //test창
width: 50%;
height: 400px;
padding: 20px;
margin-top: 20px;
border: 2px solid gray;
`;

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); 
  const [htmlString, setHtmlString] = useState(""); 
  const [imgs, setImgs] = useState([]);
  const [editorStateSave, setEditorStateSave] = useState([]);
  const user_id = portfolioOwnerId;

  // const editorBox = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); 

    await Api.post(`${user_id}/projects`, {
      user_id: portfolioOwnerId,
      title,
      content,
      startDate,
      endDate,
      editorStateSave,
      imgs,
    });

    const res = await Api.get(`${user_id}/projects`);
    setProjects(res.data);
    setIsAdding(false);
  };

  const updateTextcontent = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log('editorState에서 ContentState로 변환, editorState.getCurrentContent() = ' + editorState.getCurrentContent())
    console.log('ContentState를 convertToRaw로 원시 js로 변환(blockMap, entityMap 추출된 상태), convertToRaw(editorState.getCurrentContent()) = ' + JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    // editorBox.push(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
    setEditorStateSave(convertToRaw(editorState.getCurrentContent()))
  };

  const uploadCallback = async (file) => { //공식문서에서 promise 객체 반환하라고 함
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post(`${user_id}/projects`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        resolve({ data: { link: response.data.imageUrl } }).then(setImgs(() => {
          const imgUrl = response.data.imagUrl;
          const newImg = [...imgs]
          newImg.push(imgUrl)
        }));
      } catch (error) {
        reject('이미지 업로드 실패');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasiccontent" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 요약 및 기술스택을 입력하세요"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <br />
        <span className="text-muted">프로젝트 시작일을 입력해주세요</span>
        <Form.Control
          type='Date'
          placeholder="프로젝트 시작일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br />
        <span className="text-muted">프로젝트 종료일을 입력해주세요</span>
         <Form.Control
          type='Date'
          placeholder="프로젝트 종료일"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>

      <br />
      <div>프로젝트 상세내용</div>
      <div className="text-muted">첫 번째 사진이 대표사진으로 등록됩니다.</div>
      <br />
      
      <Editor
        placeholder="상세내용을 입력해주세요"
        editorState={editorState}
        onEditorStateChange={updateTextcontent}
        toolbar={{
        image: { uploadCallback },
        }}
        localization={{ locale: "ko" }}
        editorStyle={{
        height: "400px",
        width: "100%",
        border: "3px solid lightgray",
        }}
      />

      <RowBox>
        <Viewer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Viewer>{htmlString}</Viewer>
      </RowBox>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
