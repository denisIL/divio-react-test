import { basicApi } from "../basicApi";
import { GetProductRequestDto, UpdateProductRequestDto } from "../dto/product";
import { IProduct } from "../model/IProduct";

const apiWithTag = basicApi.enhanceEndpoints({
  addTagTypes: ["Product"],
});

export const productApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], GetProductRequestDto>({
      query: (params) => ({
        url: "/products/list/products/flat_list/",
        params: {
          search: params.search,
          ordering:
            params.order === "asc" ? params.orderBy : `-${params.orderBy}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Product" as const,
                id: id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    selectProduct: build.mutation<IProduct, UpdateProductRequestDto>({
      query: (body) => ({
        url: "/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Product",
          id,
        },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetProductsQuery, useSelectProductMutation } = productApi;
