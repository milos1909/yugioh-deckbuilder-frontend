'use client'

import ReactPaginate from "react-paginate";

interface PaginationProps {
    data: any,
    handlePageChange: ( selectedItem: { selected: number } ) => void,
    pageNumber: number;
};

export const Pagination = ({data, handlePageChange, pageNumber} : PaginationProps) => {
    return (
        <div className='d-flex justify-content-center align-items-center gap-3'>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={data.totalPages} 
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                forcePage={pageNumber}
                containerClassName={"pagination pagination-sm d-flex justify-content-center mt-3"}
                pageClassName={"page-item"} 
                pageLinkClassName={"page-link"} 
                previousClassName={"page-item"} 
                previousLinkClassName={`page-link ${pageNumber === 0 ? "disabled" : ""}`} 
                nextClassName={"page-item"} 
                nextLinkClassName={`page-link ${pageNumber >= data.totalPages ? "disabled" : ""}`} 
                activeClassName={"active"}
                disableInitialCallback={true}
            />
            <span>Total {data.totalElements} results</span>
      </div>
    );
}