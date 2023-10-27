import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as Api from "../utils/api";
import Project from "../components/features/project/Project";
import Pagination from "../components/features/pagination/Pagination";

export function SearchPortfolios() {
//searching 관련 state
const [isSearching , setIsSearching ] = useState(false);
const [searchResult, setSearchResult] = useState([]);

//paging 관련 state
const [projects, setProjects] = useState([]); //프로젝트 data
const [page, setPage] = useState(1);  //현재 페이지
const [searchPage, setSearchPage] = useState(1);
const [totalPage, setTotalPage] = useState(1)
const listPerPage = 10;
// const totalPage = Math.ceil(projects.length/listPerPage);

  const getProjects = () => {
   Api.get(`projects`)
     .then((res) => {
      // console.log(res.data);
      setProjects(res.data);
      // setSearchResult(res.data);
    });
    };

  useEffect(() => {
    const lastPage = Math.ceil(projects.length / listPerPage);
    setTotalPage(lastPage ? lastPage : 1)
  }, [projects])

  useEffect(() => {
    getProjects();
  }, [] );

  // const paginate = (pageNum) => setCurrentPage(pageNum); //현재 페이지를 변경하는 함수 
  
  const handlePageChange = useCallback((pageNum) => {
    setPage(pageNum);
} ,[]);

  // 한페이지에 보여주는 prj data 인덱스
  const pagingProjects = projects.slice(
    (page - 1) * listPerPage,
     page * listPerPage, 
  ); 
  
  
  const searchHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input == '') setSearchResult(projects);

    setSearchResult(() => {
      const newResult = projects;
      return newResult.filter(project => {
        const contentArray = project.content;
        return contentArray.some(stack => stack.toLowerCase().includes(input));;
      })
    })
  }

  const newSearchResult = searchResult;

  useEffect(() => {
    const lastPage = Math.ceil(newSearchResult.length / listPerPage);
    setSearchPage(lastPage ? lastPage : 1)
  }, [])

  // const searchPage = 

  const searchPaging =  newSearchResult.slice(
    (searchPage - 1) * listPerPage,
    searchPage * listPerPage, 
  ); 

    return (
      <Container fluid>
        <Row xs="auto" className="justify-content-center align-items-center mt-4 mb-4" style={{ height: '200px', width: '100%' }}>
          <Form>
            <Row>
              <Col className="d-flex">
                <Form.Control
                  style={{ width: '400px' }}
                  type="text"
                  placeholder="Search"
                  className="me-2"
                  onChange={searchHandler} 
                  onClick={()=> {setIsSearching(true)}}
                  
                  />
              </Col>
            </Row>
          </Form>
        </Row>
        <>
        <Row className="justify-content-center">
         {isSearching
         ? searchPaging.map((project) => (
            <Project 
            key={project._id} 
            project={project}
           
             />
          ))
          
         :  pagingProjects.map((project) => (
            <Project key={project._id} 
            project={project} 
          
            />
            )
          )
         }

        </Row>
        </>
        <Pagination
          page = {page}
          listPerPage= {listPerPage}
          totalPage={totalPage}
          setPage={setPage}
          handlePageChange={handlePageChange}
          />

      </Container>
    );
    }


  export default SearchPortfolios;