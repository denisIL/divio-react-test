import { Order } from "../../components/product/ProductTable";

export interface GetProductRequestDto {
  search: string;
  orderBy: string;
  order: Order;
}

export interface UpdateProductRequestDto {
  id: number;
}
