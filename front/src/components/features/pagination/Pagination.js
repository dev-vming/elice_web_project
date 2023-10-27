import React from "react";

import { Button } from "react-bootstrap";

function Pagination({ page, totalPosts, postPerPage, paginate }) {
  const numPages = Math.ceil(totalPosts / postPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= numPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <Button
        key={number}
        onClick={() => paginate(number)}
        variant={number === page ? "primary" : "outline-primary"}
      >
        {number}
      </Button>
    ));
  };

  return (
    <div className="pagination">
      <Button
        onClick={() => paginate(page - 1)}
        disabled={page === 1}
        variant="outline-primary"
      >
        &lt;
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => paginate(page + 1)}
        disabled={page === numPages}
        variant="outline-primary"
      >
        &gt;
      </Button>
    </div>
  );
}

export default Pagination;