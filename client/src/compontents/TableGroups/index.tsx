import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGetGroupsQuery, useDeleteGroupMutation } from "../../api";
import { GroupExtended } from "../../types";
import Button from "../Button";
import { columns } from "./utils";
import { useMuiTable } from "../../hooks";

export default function TableGroups({ editModalSwitcher = (arg: any) => {} }) {
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useMuiTable();

  const { data: groups, isFetching, isLoading } = useGetGroupsQuery();
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();

  const handleClickDelete = (group: GroupExtended) => {
    if (!(group.users.length > 0)) deleteGroup(group.id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!groups) {
    return <div>Error</div>;
  }

  if (groups.length === 0) {
    return <div>Groups absent</div>;
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
            {groups
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((group) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={group.id}>
                    {columns.map((column) => {
                      const value = group[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value && column.format ? column.format(value) : ""}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      key={group.id}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Button
                        buttonType="Delete"
                        text="Delete"
                        onClick={() => handleClickDelete(group)}
                        style={{ marginBottom: "15px" }}
                      />
                      <Button
                        buttonType="Edit"
                        text="Edit"
                        onClick={() => editModalSwitcher(group)}
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
        count={groups.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
