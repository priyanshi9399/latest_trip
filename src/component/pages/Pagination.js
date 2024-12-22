import React ,{useEffect,useState} from "react";
import ReactPaginate from 'react-paginate';

//it's data will come from api 


export default function Pagination({ itemsPerPage,totalPage,pagechangeHandler }) {

    
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    
    const [itemOffset, setItemOffset] = useState(0);
    const [tTotal,setTTotal] = useState(totalPage)
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //    setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(tTotal / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % tTotal;
      pagechangeHandler(event.selected+1);

      setItemOffset(newOffset);
    };

    return (
        <>
            <ReactPaginate
    
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
        </>
    )
}