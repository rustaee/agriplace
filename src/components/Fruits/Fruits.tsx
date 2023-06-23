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
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";

//Components
import Layout from "layouts/admin/admin.layout";
import LoadingTable from "components/loadings/loadingTable";
import FruitForm from "./FruitForm";
import LoadingBackdrop from "components/loadings/loadingBackdrop";

//API
import {
  useGetFruitsQuery,
  useAddFruitMutation,
  useUpdateFruitMutation,
  useDeleteFruitMutation,
} from "../../app/api";

//Icons
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

//Types
import { Fruit } from "types/Fruit";
import { FruitEdit } from "./FruitForm";

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

  const [addFruit, { isLoading: isAdding }] = useAddFruitMutation();
  const [updateFruit, { isLoading: isUpdating }] = useUpdateFruitMutation();
  const [deleteFruit, { isLoading: isDeleting }] = useDeleteFruitMutation();

  //Handle the form  to Create or Update a fruit
  const openForm = (fruit?: Fruit) => {
    setSelectedFruit(fruit);
    toggleDrawer();
  };

  const editFruit = async (fruit: Fruit) => {
    try {
      await updateFruit(fruit);
      handleSnackbarState(true, "Fruit updated successfully", "success");
    } catch (error) {
      handleSnackbarState(true, "Error updating fruit", "error");
    } finally {
      setSelectedFruit(undefined);
    }
  };

  const createFruit = async (fruit: FruitEdit) => {
    try {
      await addFruit(fruit);
      handleSnackbarState(true, "Fruit created successfully", "success");
    } catch (error) {
      handleSnackbarState(true, "Error creating fruit", "error");
    }
  };

  const handleSubmit = (fruit: FruitEdit | Fruit) => {
    fruit.id ? editFruit(fruit as Fruit) : createFruit(fruit);
    toggleDrawer();
  };

  //Handle the delete action
  const [isDialogOPen, setIsDialogOpen] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState<Fruit>();

  const handleFruitDelete = (fruit: Fruit) => {
    confirmDialogState(true);
    setSelectedFruit(fruit);
  };

  const confirmDialogState = (state: boolean) => {
    setIsDialogOpen(state);
  };

  const DeleteFruit = async () => {
    setIsDialogOpen(false);
    if (!selectedFruit) return;
    try {
      await deleteFruit(selectedFruit);
      handleSnackbarState(true, "Fruit deleted successfully", "success");
    } catch (error) {
      handleSnackbarState(true, "Error deleting fruit", "error");
    } finally {
      setSelectedFruit(undefined);
    }
  };

  //Handle the snackbar state
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info" | undefined
  >();

  const handleSnackbarState = (
    state: boolean,
    message: string,
    severity: "success" | "error" | "warning" | "info" | undefined
  ) => {
    setIsSnackbarOpen(state);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Layout
      drawerState={drawerState}
      drawerContent={
        <FruitForm
          fruit={selectedFruit}
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
          onClick={() => openForm()}
          style={{ backgroundColor: "#59A96A", color: "#fff" }}
        >
          Add Fruit
        </Button>

        {/* Loading */}
        {isLoading && <LoadingTable />}
        {(isFetching || isDeleting || isAdding || isUpdating) && (
          <LoadingBackdrop />
        )}

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
                {fruits.map((fruit) => (
                  <TableRow
                    key={fruit.id}
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
                          onClick={() => openForm(fruit)}
                        >
                          <Icon path={mdiPencil} size={1} color="#59A96A" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleFruitDelete(fruit)}
                        >
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

        {/* Confirm Dialog */}
        <Dialog
          open={isDialogOPen}
          onClose={() => confirmDialogState(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this fruit?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this fruit?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => confirmDialogState(false)}>Cancel</Button>
            <Button
              onClick={DeleteFruit}
              autoFocus
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Layout>
  );
};
