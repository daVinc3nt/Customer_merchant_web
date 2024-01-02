import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import Fakedata from "./FakeData";
import ReactPaginate from 'react-paginate';
import React, { useEffect } from 'react';
import FakeData2 from "./FakeData2";

const columns = [
  { key: "orderId", label: "Order ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "orderDate", label: "Order Date" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "shippingAddress", label: "Shipping Address" },
];

const rowsPerPage = 10;

const DetailOrder = ({rows}: {rows: Array<object>}) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const handlePageClick = ({ selected: selectedPage }: { selected: number }) => {
    const maxPage = Math.floor(rows.length / rowsPerPage);
    if (selectedPage > maxPage) {
      setCurrentPage(maxPage);
    } else {
      setCurrentPage(selectedPage);
    }
  }
  
  const currentPageData = rows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  if (rows.length === 0) {
    return (
      <div>
        <div className='text-black text-xl ml-3 mt-5'>Không tìm thấy đơn hàng nào</div>
      </div>
    )
  }

  return (
    <div className="content-center mx-5" key={currentPage}>
      <div className="overflow-x-auto jusitfy-center">
        <Table className="shadow-lg bg-white rounded-lg w-80 md:w-full xl:w-full 2xl:w-full lg:w-full border overflow-x-scroll">
          <TableHeader className="bg-blue-500 text-black">
            {columns.map((column) =>
              <TableColumn className="p-2 border text-black" key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {currentPageData.map((row, index) =>
              <TableRow className={index % 2 === 0 ? 'bg-slate-400' : 'bg-slate-500'} key={(row as { customerName: string }).customerName}>
                {(columnKey) => {
                  const cellValue = getKeyValue(row, columnKey);
                  if (columnKey === 'shippingAddress' && typeof cellValue === 'object') {
                    return <TableCell className="p-2 border">{`${cellValue.street}, ${cellValue.city}, ${cellValue.state}, ${cellValue.zipCode}`}</TableCell>;
                  }
                  return <TableCell className="p-2 border">{cellValue}</TableCell>;
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ReactPaginate 
          className="text-black align-middle flex justify-center items-center space-x-4"
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={Math.ceil(rows.length / rowsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link  hover:text-red-500 "}
          nextLinkClassName={"pagination__link  hover:text-red-500 "}
          pageLinkClassName={"pagination__link  hover:text-red-500 active:text-red-500"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active text-red-500"}
        />
      </div>
    </div>
  );
}

export default DetailOrder;
