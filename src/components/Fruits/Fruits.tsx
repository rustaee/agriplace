import styled from "styled-components";
import { useState } from "react";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip, IconButton } from "@mui/material";

//Components
import Layout from "layouts/admin/admin.layout";
import LoadingTable from "components/loadings/loadingTable";
import FruitForm from "./FruitForm";

//API
import {
  useGetFruitsQuery,
  useAddFruitMutation,
  useUpdateFruitMutation,
} from "../../app/api";

//Icons
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

export interface FruitsProps {}

const Wrapper = styled.div`
  margin: 20px;
  position: relative;

  .actions {
    display: flex;

    svg {
      width: 20px !important;
    }
  }

  .create-btn {
    position: absolute;
    right: 0;
    top: -75px;
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

  //Manage the drawer state to show the edit form
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = () => setDrawerState(!drawerState);

  //Handle the form submit
  const [addFruit, { isLoading: isAdding }] = useAddFruitMutation();
  const [updateFruit, { isLoading: isUpdating }] = useUpdateFruitMutation();

  const handleSubmit = async (fruit: any) => {
    if (fruit.id) {
      await updateFruit(fruit);
    } else {
      await addFruit(fruit);
    }
    toggleDrawer();
  };

  return (
    <Layout
      drawerState={drawerState}
      drawerContent={
        <FruitForm
          onCancel={toggleDrawer}
          onSubmit={(fruit) => handleSubmit(fruit)}
        />
      }
      onDrawerClose={toggleDrawer}
    >
      <Wrapper>
        {/* Create Button */}
        <Button
          className="create-btn"
          variant="contained"
          startIcon={<Icon path={mdiPlus} size={1} />}
          onClick={toggleDrawer}
          style={{ backgroundColor: "#59A96A", color: "#fff" }}
        >
          Add Fruit
        </Button>

        {/* Loading */}
        {(isLoading || isFetching) && <LoadingTable />}

        {/* Data table */}
        {fruits && (
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
                        {fruit.tags?.map((tag, index) => (
                          <Chip
                            label={tag}
                            key={index}
                            style={{ margin: "1px" }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        <div className="actions">
                          <IconButton
                            aria-label="edit"
                            onClick={() => setDrawerState(true)}
                          >
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
        )}
      </Wrapper>
    </Layout>
  );
};
