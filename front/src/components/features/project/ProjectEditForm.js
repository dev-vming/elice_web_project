import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg"; 
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import { EditorState, convertToRaw, ContentState } from "draft-js"; 
import draftjsToHtml from "draftjs-to-html"; 
import axios from "axios";

const RowBox = styled.div`
width: 100%;
display: flex;
`;

const Viewer = styled.div` 
width: 50%;
height: 400px;
padding: 20px;
margin-top: 20px;
border: 2px solid gray;
`;

function ProjectEditForm({ portfolioOwnerId, currentProject, setProjects, setIsEditing }) {
  console.log(currentProject.editorStateSave, typeof(currentProject.editorStateSave));

  const [title, setTitle] = useState(currentProject.title);
  const [content, setContent] = useState(currentProject.description);
  const [startDate, setStartDate] = useState(currentProject.startDate);
  const [endDate, setEndDate] = useState(currentProject.endDate);
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); 
  const [htmlString, setHtmlString] = useState(draftjsToHtml(currentProject.editorStateSave[0]));
  const [editorStateSave, setEditorStateSave] = useState(currentProject.editorStateSave);
  const [imgs, setImgs] = useState(currentProject.imgs);
  const user_id = portfolioOwnerId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    await Api.put(`${user_id}/projects/${currentProject._id}`, {
      user_id,
      title,
      content,
      startDate,
      endDate,
      editorStateSave,
      imgs
    });

    // const res = await Api.get(`${user_id}/projects/${currentProject.id}`);
    // setProjects(res.data);
    setIsEditing(false);
  };

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent())); 
    setHtmlString(html);
    setEditorStateSave(() => {
      const newStateSave = editorStateSave;
      newStateSave[0] = convertToRaw(editorState.getCurrentContent())
      newStateSave[1] = editorState.getCurrentContent()
      return newStateSave;
    })
  };

  const uploadCallback = async (file) => { //공식문서에서 promise 객체 반환하라고 함
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post(`${user_id}/projects/${currentProject._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        resolve({ data: { link: response.data.imageUrl } }).then(setImgs(() => {
          const imgUrl = response.data.imageUrl;
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

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 요약 및 기술스택을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicStartDate" className="mt-3">
        <Form.Control
          type='Date'
          placeholder="프로젝트 시작일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndDate" className="mt-3">
        <Form.Control
          type="Date"
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
        onEditorStateChange={updateTextDescription}
        toolbar={{
        image: { uploadCallback: uploadCallback },
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

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;