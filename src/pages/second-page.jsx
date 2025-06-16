import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  get,
  delUser,
  addUser,
  editUser,
  delImage,
  addImages,
  complit
} from "../slices/second-slice";

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
import BackspaceIcon from "@mui/icons-material/Backspace";
import HideImageIcon from "@mui/icons-material/HideImage";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function SecondPage() {
  const data = useSelector((state) => state.second.data);
  const loading = useSelector((state) => state.second.loading);
  const error = useSelector((state) => state.second.errors);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addImage, setAddImage] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [idx, setIdx] = useState(null);

  const [openAddImage, setOpenAddImage] = useState(false);
  const [Image, setImage] = useState([]);
  const [currentImageTaskId, setCurrentImageTaskId] = useState(null);

  useEffect(() => {
    dispatch(get());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseAddImage = () => {
    setOpenAddImage(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newUser = new FormData();
    newUser.append("Name", addName);
    newUser.append("Description", addDescription);
    for (let i = 0; i < addImage.length; i++) {
      newUser.append("Images", addImage[i]);
    }
    dispatch(addUser(newUser));
    setOpen(false);
    setAddName("");
    setAddDescription("");
    setAddImage([]);
  };

  const handleEdit = (el) => {
    setOpenEdit(true), setEditName(el.name);
    setEditDescription(el.description);
    setIdx(el.id);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    let editedUser = {
      name: editName,
      description: editDescription,
      id: idx,
    };
    dispatch(editUser(editedUser));
    setOpenEdit(false);
    setIdx(null);
  };

  const handleAddImage = (id) => {
    setOpenAddImage(true);
    setCurrentImageTaskId(id);
  };

  const handleSaveAddImage = (e) => {
    e.preventDefault();
    const newImage = new FormData();
    for (let i = 0; i < Image.length; i++) {
      newImage.append("Images", Image[i]);
    }
    dispatch(addImages({ id: currentImageTaskId, img: newImage }));
    setOpenAddImage(false);
  };

  return (
    <div>
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          NEW+
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <form onSubmit={handleAdd}>
              <input
                type="file"
                multiple
                name="img"
                required
                onChange={(e) => setAddImage(e.target.files)}
                className="task-input"
              />

              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="desc"
                name="name"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </>
      <TableContainer sx={{marginTop:'20px'}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Complited</TableCell>
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
                  {el.images.map((foto) => {
                    return (
                      <div key={foto.id}>
                        <img
                          style={{ borderRadius: "10px" }}
                          width={60}
                          height={40}
                          src={`https://to-dos-api.softclub.tj/images/${foto.imageName}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {el.name}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {el.description}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <h4
                    style={{
                      padding: "8px 0px",
                      backgroundColor: el.isCompleted ? "green" : "red",
                      width: "70px",
                      margin: "auto",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    {el.isCompleted ? "DONE" : "UNDO"}
                  </h4>
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
                      <BackspaceIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleEdit(el)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        if (el.images.length > 0) {
                          const lastImageId =
                            el.images[el.images.length - 1].id;
                          dispatch(delImage(lastImageId));
                        }
                      }}
                    >
                      <HideImageIcon />
                    </Button>
                      <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => dispatch(complit(el.id))}
                    >
                      check
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAddImage(el.id)}
                    >
                      <PhotoCameraIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <>
        {loading && <div className="task-loading">Загрузка...</div>}
        {error && <div className="task-error">Упс, что-то пошло не так</div>}
      </>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSave}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="desc"
              name="name"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddImage} onClose={handleClose}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSaveAddImage}>
            <input
              type="file"
              multiple
              name="img"
              required
              onChange={(e) => setImage(e.target.files)}
            />
            <DialogActions>
              <Button onClick={handleCloseAddImage}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
