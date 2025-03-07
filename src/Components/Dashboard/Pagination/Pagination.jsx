import ReactPaginate from 'react-paginate';
import "./Pagination.css"
export default function PaginatedItems({PageCount, setPage}) {
  return (
    <>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>>'
        onPageChange={e => {
          setPage(e.selected + 1);
        }}
        pageRangeDisplayed={3}
        pageCount={PageCount}
        activeClassName=' rounded-circle bg-primary'
        className='d-flex justify-content-center   align-items-center mt-5 column-gap-1 list-unstyled'
        pageClassName='point'
        previousLabel='<<'
        previousClassName='previous'
        nextClassName='next'
        renderOnZeroPageCount={null}
      />
    </>
  );
}
