import Layout from "layouts/admin/admin.layout";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import {
  useGetFruitsQuery,
  useAddFruitMutation,
  useUpdateFruitMutation,
  useGetFruitTagsQuery,
} from "../../app/api";
import { Fruit } from "types/Fruit";

export interface FruitsProps {}

const Wrapper = styled.div`
  margin: 20px;
`;

export const Fruits: React.FC<FruitsProps> = () => {
  const { isError, isLoading, isFetching, data: fruits } = useGetFruitsQuery();

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  };

  return (
    <Layout>
      <Wrapper>
        {isLoading && <div>Loading...</div>}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Tags</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fruits &&
                fruits.map((fruit) => (
                  <TableRow
                    key={fruit.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {fruit.name}
                    </TableCell>
                    <TableCell align="right">
                      {truncateDescription(fruit.description, 100)}
                    </TableCell>
                    <TableCell align="right">{fruit.tags}</TableCell>
                    <TableCell align="right">edit | delete</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Layout>
  );
};
