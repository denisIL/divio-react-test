import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { IProduct } from "../../redux/model/IProduct";
import { useMediaQuery, useTheme } from "@mui/material";

type Order = "asc" | "desc";

interface HeadCell {
  id: keyof IProduct;
  label: string;
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IProduct
  ) => void;
  order: Order;
  orderBy: string;
}

export const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableProps) => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const headCells: readonly HeadCell[] = useMemo(
    () =>
      onlySmallScreen
        ? [
            {
              id: "name",
              label: "Name",
            },
            {
              id: "price",
              label: "Price",
            },
            {
              id: "stock",
              label: "Stock",
            },
          ]
        : [
            {
              id: "name",
              label: "Name",
            },
            {
              id: "description",
              label: "Description",
            },
            {
              id: "price",
              label: "Price",
            },
            {
              id: "stock",
              label: "Stock",
            },
          ],
    [onlySmallScreen]
  );

  const createSortHandler =
    (property: keyof IProduct) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {!onlySmallScreen && <TableCell padding="none"></TableCell>}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
