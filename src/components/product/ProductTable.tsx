import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { IProduct } from "../../redux/model/IProduct";
import { useGetProductsQuery } from "../../redux/product/productApi";
import {
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EnhancedTableHead } from "./EnhancedTableHead";

export type Order = "asc" | "desc";

export const ProductTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IProduct>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchWordTemp, setSearchWordTemp] = useState<string>("");

  const { data: products, isLoading } = useGetProductsQuery({
    search,
    orderBy,
    order,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchWordTemp.toLowerCase());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchWordTemp]);

  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IProduct
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Box>
      <Stack flexDirection={"row"} justifyContent={"right"}>
        <TextField
          label="Search"
          value={searchWordTemp}
          size="small"
          onChange={(e) => setSearchWordTemp(e.target.value)}
          sx={{ width: onlySmallScreen ? "168px" : "256px" }}
        />
      </Stack>
      <Paper sx={{ width: "100%", my: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {products && products.length > 0 ? (
                products.map((product, index) => {
                  const isItemSelected = isSelected(product.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, product.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={product.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {!onlySmallScreen && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="right"
                      >
                        {product.name}
                      </TableCell>
                      {!onlySmallScreen && (
                        <TableCell align="right">
                          {product.description}
                        </TableCell>
                      )}
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography textAlign={"center"} padding={4}>
                      {isLoading ? <CircularProgress /> : "No result"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
