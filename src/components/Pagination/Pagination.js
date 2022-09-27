import React, { Component } from "react";

import "./Pagination.css";

class Pagination extends Component {
  render() {
    let pages = [];

    for (
      let i = 1;
      i <= Math.ceil(this.props.totalPosts / this.props.itemPerPage);
      i++
    ) {
      pages.push(i);
    }
    return (
      <div className="pagination">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => this.props.setCurrentPage(page)}
              className={page === this.props.currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Pagination;
