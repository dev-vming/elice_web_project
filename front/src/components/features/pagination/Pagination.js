import React from "react";
import { Button, ButtonGroup  } from "react-bootstrap";


function Pagination({ page, totalPage, setPage, listPerPage, handlePageChange  }) {
  // const numPages = Math.ceil(totalPosts / postPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <Button 
        key={number}
        onClick={() => handlePageChange(number)}
        variant={number === page ? "secondary" : "outline-secondary"}
        style= {{ width: "50px" }}
      >
        {number}
      </Button >
    ));
  };

  return (
    <div className="pagination">
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        variant="outline-secondary"
        style= {{ width: "50px" }}
      >
        &lt;
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
        variant="outline-secondary"
        style= {{ width: "50px" }}
      >
        &gt;
      </Button>
    </div>
  );
}

export default Pagination;