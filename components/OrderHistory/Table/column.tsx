"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { LogoIcon, UsersIcon } from "@/components/Icons";
import DetailPost from "./detailPost";
import { Checkbox } from "@/components/TableUI/checkbox";
import { FormattedMessage } from "react-intl";
import { FindingAgencyByAdminInfo } from "@/TDLib/tdlogistics";

interface OrderDetail {
  order_id: string;
  user_id: string;
  agency_id: string;
  order_time: string;
  COD: number;
  fee: number;
  height: number;
  length: number;
  width: number;
  last_update: string;
  parent: string;
  mass: number;
  miss: number;
  journey: [string];
  service_type: number;
  status_code: number;

  detail_dest: string;
  district_dest: string;
  ward_dest: string;
  province_dest: string;
  phone_number_receiver: string;
  name_receiver: string;

  detail_source: string;
  district_source: string;
  ward_source: string;
  province_source: string;
  phone_number_sender: string;
  name_sender: string;

  shipper: string;
}
export const columns: ColumnDef<OrderDetail>[] = [
  {
    accessorKey: "order_id",

    cell: ({ row }) => {
      return (
        <div className="flex flex-row">
          <div className="text-base font-semibold"> Mã đơn hàng : </div>
          <div className="ml-2 text-base">{row.original.order_id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "COD",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row">
          <div className="text-base font-semibold"> Phí COD : </div>
          <div className="ml-2 text-base">{row.original.COD} (vnđ)</div>
        </div>
      );
    },
  },
  {
    accessorKey: "fee",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row">
          <div className="text-base font-semibold"> Phí vận chuyển : </div>
          <div className="ml-2 text-base">{row.original.fee} (vnđ)</div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number_sender",

    cell: ({ row }) => {
      return (
        <div className="flex flex-row">
          <div className="text-base font-semibold">
            {" "}
            Số điện thoại người gửi :{" "}
          </div>
          <div className="ml-2 text-base">
            {row.original.phone_number_sender}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name_sender",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row">
          <div className="text-base font-semibold"> Tên người gửi : </div>
          <div className="ml-2 text-base">{row.original.name_sender}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "Chi tiết",

    cell: ({ row }) => {
      const [modalIsOpen, setModalIsOpen] = useState(false);

      const openModal = () => {
        setModalIsOpen(true);
      };

      const closeModal = () => {
        setModalIsOpen(false);
      };

      return (
        <div className="flex flex-row  mr-2">
          <Button
            onClick={openModal}
            className=" font-bold  py-1 px-[0.65rem] border-2  text-red-500 border-red-500 rounded-full hover:text-white hover:bg-red-500"
          >
            Chi tiết
          </Button>
          {modalIsOpen && (
            <DetailPost onClose={closeModal} dataInitial={row.original} />
          )}
        </div>
      );
    },
  },
];
