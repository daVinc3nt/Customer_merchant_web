import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import ReactPaginate from 'react-paginate';
import React, { useEffect } from 'react';

// const rows = [
//   { key: "orderId", label: "Order ID" },
//   { key: "customerName", label: "Customer Name" },
//   { key: "orderDate", label: "Order Date" },
//   { key: "totalAmount", label: "Total Amount" },
//   { key: "shippingAddress", label: "Shipping Address" },
// ];

interface Row {
  orderId: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const rowsPerPage = 10;

const DetailOrder = ({rows}: {rows: Array<Row>}) => {
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
    <div className="content-center mx-5 sm:h-96 lg:h-96 " key={currentPage}>
      <div className="overflow-x-auto jusitfy-center overflow-y-scroll h-96 lg:h-104">
        <div className="shadow-lg bg-white rounded-lg w-full h-full md:w-full xl:w-full 2xl:w-full lg:w-full border  ">
          {currentPageData.map((row, index) =>
              <div className={` ${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-300'}`} key={(row as { customerName: string }).customerName}>
                <p className="ml-3"> 
                  <strong>Mã vận đơn:</strong> {row.orderId} <br/>
                  <strong>Người gửi:</strong> {row.customerName} <br/>
                  <strong>Ngày gửi:</strong> {row.orderDate} <br/>
                  <strong>Tổng tiền:</strong> {row.totalAmount} <br/>
                  <strong>Địa chỉ gửi:</strong> {`${row.shippingAddress.street}, ${row.shippingAddress.city}, ${row.shippingAddress.state}, ${row.shippingAddress.zipCode}`} <br/>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold w-20 h-5 rounded-full text-s text-center">
                    <span>Chi tiết</span>
                  </button>
                </p>
              </div>
          )}
        </div>

      </div>
      <ReactPaginate 
          className="text-black align-middle flex justify-center items-center space-x-4 pt-2"
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
  );
}

export default DetailOrder;
