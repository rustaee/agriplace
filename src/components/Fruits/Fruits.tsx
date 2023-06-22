import styled from "styled-components";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, IconButton } from "@mui/material";

//Components
import Layout from "layouts/admin/admin.layout";

//API
import {
  useGetFruitsQuery,
  useAddFruitMutation,
  useUpdateFruitMutation,
  useGetFruitTagsQuery,
} from "../../app/api";

//Icons
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil } from "@mdi/js";

export interface FruitsProps {}

const Wrapper = styled.div`
  margin: 20px;

  .actions {
    display: flex;

    svg {
      width: 20px !important;
    }
  }
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
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Tags</TableCell>
                <TableCell align="center">Actions</TableCell>
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
                    <TableCell>
                      {truncateDescription(fruit.description, 100)}
                    </TableCell>
                    <TableCell align="center">
                      {fruit.tags?.map((tag) => (
                        <Chip label={tag} style={{ margin: "1px" }} />
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="actions">
                        <IconButton aria-label="edit">
                          <Icon path={mdiPencil} size={1} color="#59A96A" />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <Icon path={mdiDelete} size={1} color="#AF1B3F" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Layout>
  );
};
