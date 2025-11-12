import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ total, limit, offset, onPageChange }) => {
  const pageCount = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.floor(offset / limit); // 0-index

  return (
    <div className="flex justify-center py-8">
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={(e) => onPageChange(e.selected)} // selected: 0-index
        // Görünüm:
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Prev"
        containerClassName="inline-flex items-center border rounded-md overflow-hidden text-sm"
        pageClassName="px-4 py-2 border-l"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-4 py-2"
        nextClassName="px-4 py-2 border-l"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
