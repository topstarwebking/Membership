import React from "react";
import classnames from "classnames";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { usePagination, DOTS } from "./usePagination";

const PaginationComponent = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Pagination
      className={classnames("pagination-container navigation", {
        [className]: className,
      })}
    >
      <PaginationItem
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <PaginationLink previous />
      </PaginationItem>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <PaginationItem key={pageNumber} className="pagination-item dots">
              &#8230;
            </PaginationItem>
          );
        }

        return (
          <PaginationItem
            key={pageNumber}
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            <PaginationLink href="#">{pageNumber}</PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <PaginationLink next />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
