import { Stack, Typography } from "@mui/material";
import { ProductTable } from "../components/product/ProductTable";

export const HomePage = () => {
  return (
    <Stack gap={2}>
      <Typography fontSize={32} textAlign={"center"}>
        Products
      </Typography>
      <ProductTable />
    </Stack>
  );
};
