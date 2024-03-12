import { columns } from "./column";
import { DataTable } from "./datatable";
import https from "https";
import {
  OrdersOperation,
  GettingOrdersConditions,
  StaffsOperation,
} from "@/TDLib/tdlogistics";

const service = new OrdersOperation();
const conditions: GettingOrdersConditions = {}; // Modify the type of 'conditions' to 'GettingOrdersConditions'

async function getData(): Promise<any> {
  // Fetch data from your API here.
  const res = await service.get(conditions);
  return res.data;
}

export default async function DemoPage() {
  const data = await getData();
  console.log(data);
  if (data === undefined) {
    return <div>Something went wrong please contact admin</div>;
  }
  return <DataTable columns={columns} data={data} />;
}
