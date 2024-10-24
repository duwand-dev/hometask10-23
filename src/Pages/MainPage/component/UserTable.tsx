import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteUser, GetAllUsers } from "../../../Actions/AuthAction";

export default function UserTable() {
  const [rowData, setRowData] = useState<
    Array<{
      email: string;
      password: string;
      usertype: string;
    }>
  >([{ email: "", password: "", usertype: "" }]);
  const [render, setRender] = useState<Boolean>(false);

  useEffect(() => {
    GetAllUsers().then(
      (
        users: Array<{
          email: string;
          password: string;
          usertype: string;
        }>
      ) => {
        setRowData(users);
      }
    );
  }, [render]);

  const handleDeleteUser = (index: number) => {
    DeleteUser(
      rowData[index].email,
      rowData[index].password,
      rowData[index].usertype
    );
    setRender(!render);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">User Type</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.usertype}</TableCell>
              <TableCell align="right">
                <div
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={(e) => handleDeleteUser(index)}
                >
                  &times;
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
