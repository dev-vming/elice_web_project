import React from "react";
import { Button } from "react-bootstrap";

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
        variant={number === page ? "primary" : "outline-primary"}
      >
        {number}
      </Button>
    ));
  };

  return (
    <div className="pagination">
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        variant="outline-primary"
      >
        &lt;
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
        variant="outline-primary"
      >
        &gt;
      </Button>
    </div>
  );
}

export default Pagination;