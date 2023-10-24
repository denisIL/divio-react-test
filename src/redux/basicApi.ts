import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const basicApi = createApi({
  reducerPath: "basicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { extra: ctx }: any) => {
      const token = window.localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 60 * 3, //  3 mins
  endpoints: () => ({}),
  tagTypes: ["Product"],
});
