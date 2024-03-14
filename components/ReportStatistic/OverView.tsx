import React from "react";
import Box from "./Box";
import { info } from "console";
import { FormattedMessage, useIntl } from "react-intl";
import { ShippersOperation, OrdersOperation } from "@/TDLib/tdlogistics";
const OverView = () => {
  const intl = useIntl();
  return (
    <div className="text-black ml-4 text-l mr-4 my-4">
      <div className="flex justify-between">
        <div className="ml-0">
          <div className="text-xl font-semibold ">
            <FormattedMessage id="ReportStatistics.overview.index" />
          </div>
        </div>
        <div className="mr-0">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2
                                        w-24 h-10 
                                        sm:w-32 sm:h-10 
                                        rounded-full
                                        flex items-center justify-center"
          >
            <span className="text-xs ">
              <FormattedMessage id="ReportStatistics.overview.downloadreport" />
            </span>
          </button>
        </div>
      </div>
      <div>
        <div>
          <FormattedMessage id="ReportStatistics.overview.indexorder" />
        </div>
        <div className="flex flex-wrap ">
          <div className="m-4">
            <Box
              data={{
                text: "Tổng đơn hàng",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option1info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Đơn hàng thành công",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option2info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Đơn hàng thất bại",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option3info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Đang chờ lấy",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option4info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Đang chờ giao",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option4info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Lấy thành công",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option4info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Lấy thất bại",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option4info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Đã hủy",
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.orderindex.option4info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <FormattedMessage id="ReportStatistics.overview.indexfin" />
        </div>
        <div className="flex flex-wrap ">
          <div className="m-4">
            <Box
              data={{
                text: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option1",
                }),
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option1info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option2",
                }),
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option2info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option3",
                }),
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option3info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option4",
                }),
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option4info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option5",
                }),
                info: intl.formatMessage({
                  id: "ReportStatistics.overview.finindex.option5info",
                }),
                num: 0,
                percent: 0,
              }}
            />
          </div>
        </div>
      </div>
      {/* <div>
        <div>Chỉ số khác</div>
        <div className="flex flex-wrap ">
          <div className="m-4">
            <Box
              data={{
                text: "Thu hộ",
                info: "Tổng tiền ứng (COD)",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Phí mỗi điểm giao",
                info: "Chi phí trung bình mỗi điểm giao",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Tổng khoảng cách",
                info: "Tổng khoảng cách các đơn hàng (km)",
                num: 0,
                percent: 0,
              }}
            />
          </div>
          <div className="m-4">
            <Box
              data={{
                text: "Trung bình khoảng cách",
                info: "Trung bình khoảng cách các đơn hàng (km)",
                num: 0,
                percent: 0,
              }}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default OverView;
