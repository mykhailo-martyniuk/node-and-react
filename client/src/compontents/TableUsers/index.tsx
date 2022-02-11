import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGetUsersQuery, useDeleteUserMutation } from "../../api";
import Button from "../Button";
import { columns } from "./utils";
import { useMuiTable } from "../../hooks";

export default function TableUsers({ editModalSwitcher = (arg: any) => {} }) {
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useMuiTable();

  const { data: users, isFetching, isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleClickDelete = (id: string | number) => {
    deleteUser(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isDeleting) {
    return <div>Deleting...</div>;
  }

  if (!users) {
    return <div>Error</div>;
  }

  if (users.length === 0) {
    return <div>Users absent</div>;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 100 }} align="left">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    {columns.map((column) => {
                      const value = user[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value && column.format ? column.format(value) : ""}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      key={user.id}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Button
                        buttonType="Delete"
                        text="Delete"
                        onClick={() => handleClickDelete(user.id)}
                        style={{ marginBottom: "15px" }}
                      />
                      <Button
                        buttonType="Edit"
                        text="Edit"
                        onClick={() => editModalSwitcher(user)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
