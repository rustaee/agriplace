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
import VegetableForm from "../Vegetables/VegetableForm";
import LoadingBackdrop from "components/loadings/loadingBackdrop";

//API
import {
  useGetVegetablesQuery,
  useAddVegetableMutation,
  useUpdateVegetableMutation,
  useDeleteVegetableMutation,
} from "../../app/api";

//Icons
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

//Types
import { Vegetable } from "types/Vegetable";
import { VegetableEdit } from "../Vegetables/VegetableForm";

export interface VegetablesProps {}

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

export const Vegetables: React.FC<VegetablesProps> = () => {
  const {
    isError,
    isLoading,
    isFetching,
    data: Vegetables,
  } = useGetVegetablesQuery();

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  };

  //Manage the drawer state to show the edit form
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = () => setDrawerState(!drawerState);

  const [addVegetable, { isLoading: isAdding }] = useAddVegetableMutation();
  const [updateVegetable, { isLoading: isUpdating }] =
    useUpdateVegetableMutation();
  const [deleteVegetable, { isLoading: isDeleting }] =
    useDeleteVegetableMutation();

  //Handle the form  to Create or Update a Vegetable
  const openForm = (Vegetable?: Vegetable) => {
    setSelectedVegetable(Vegetable);
    toggleDrawer();
  };

  const editVegetable = async (vegetable: Vegetable) => {
    try {
      await updateVegetable(vegetable);
      handleSnackbarState(true, "Vegetable updated successfully", "success");
    } catch (error) {
      handleSnackbarState(true, "Error updating Vegetable", "error");
    } finally {
      setSelectedVegetable(undefined);
    }
  };

  const createVegetable = async (vegetable: VegetableEdit) => {
    try {
      await addVegetable(vegetable);
      handleSnackbarState(true, "Vegetable created successfully", "success");
    } catch (error) {
      handleSnackbarState(true, "Error creating Vegetable", "error");
    }
  };

  const handleSubmit = (vegetable: VegetableEdit | Vegetable) => {
    vegetable.id
      ? editVegetable(vegetable as Vegetable)
      : createVegetable(vegetable);
    toggleDrawer();
  };

  //Handle the delete action
  const [isDialogOPen, setIsDialogOpen] = useState(false);
  const [selectedVegetable, setSelectedVegetable] = useState<Vegetable>();

  const handleVegetableDelete = (Vegetable: Vegetable) => {
    confirmDialogState(true);
    setSelectedVegetable(Vegetable);
  };

  const confirmDialogState = (state: boolean) => {
    setIsDialogOpen(state);
  };

  const DeleteVegetable = async () => {
    setIsDialogOpen(false);
    if (!selectedVegetable) return;
    try {
      await deleteVegetable(selectedVegetable);
      handleSnackbarState(true, "Vegetable deleted successfully", "success");
    } catch (error) {
      handleSnackbarState(true, "Error deleting Vegetable", "error");
    } finally {
      setSelectedVegetable(undefined);
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
        <VegetableForm
          Vegetable={selectedVegetable}
          onCancel={toggleDrawer}
          onSubmit={(Vegetable) => handleSubmit(Vegetable)}
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
          Add Vegetable
        </Button>

        {/* Loading */}
        {isLoading && <LoadingTable />}
        {(isFetching || isDeleting || isAdding || isUpdating) && (
          <LoadingBackdrop />
        )}

        {/* Data table */}
        {Vegetables && (
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
                {Vegetables.map((Vegetable) => (
                  <TableRow
                    key={Vegetable.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {Vegetable.name}
                    </TableCell>
                    <TableCell>
                      {truncateDescription(Vegetable.description, 100)}
                    </TableCell>
                    <TableCell align="center">
                      {Vegetable.tags?.map((tag, index) => (
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
                          onClick={() => openForm(Vegetable)}
                        >
                          <Icon path={mdiPencil} size={1} color="#59A96A" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleVegetableDelete(Vegetable)}
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
            {"Delete this Vegetable?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this Vegetable?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => confirmDialogState(false)}>Cancel</Button>
            <Button
              onClick={DeleteVegetable}
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
