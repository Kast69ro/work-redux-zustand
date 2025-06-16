import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";

import { delUser,addUser,editUser } from "../slices/first-slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FirstPage() {
  const { data } = useSelector((state) => state.first);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [addName, setAddName] = useState("");
  
  const [editName, setEditName] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [idx, setIdx] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleEdit=(el)=>{
    setOpenEdit(true)
    setEditName(el.name)
    setIdx(el.id)
  }
  const handleSaveEdit=()=>{
    dispatch(editUser({idx:idx,name:editName}))
    setOpenEdit(false)
  }

  return (
    <div>
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          NEW+
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="User`s name"
              type="text"
              fullWidth
              variant="outlined"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=>{dispatch(addUser(addName)),setAddName(''),setOpen(false)}}>Save</Button>
          </DialogActions>
        </Dialog>
      </>

      <TableContainer sx={{marginTop:'20px'}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el) => (
              <TableRow key={el.id}>
                <TableCell component="th" scope="row">
                  {el.id}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {el.name}
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(delUser(el.id))}
                    >
                      Delete
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={()=>handleEdit(el)}>
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       <>
      
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="User`s name"
              type="text"
              fullWidth
              variant="outlined"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}
