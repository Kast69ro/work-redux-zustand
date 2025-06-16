import { useEffect, useState } from "react";
import { useStore } from "../store/store-zustand";

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
  const {
    data,
    get,
    deleteUs,
    addUser,
    editUser,
    delImage,
    addImages,
    complit,
  } = useStore();

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
    get();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newUser = new FormData();
    newUser.append("Name", addName);
    newUser.append("Description", addDescription);
    for (let i = 0; i < addImage.length; i++) {
      newUser.append("Images", addImage[i]);
    }
    addUser(newUser);
    setOpen(false);
    setAddName("");
    setAddDescription("");
    setAddImage([]);
  };

  const handleEdit = (el) => {
    setOpenEdit(true);
    setEditName(el.name);
    setEditDescription(el.description);
    setIdx(el.id);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const editedUser = {
      id: idx,
      name: editName,
      description: editDescription,
    };
    editUser(editedUser);
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
    addImages({ id: currentImageTaskId, img: newImage });
    setOpenAddImage(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        NEW+
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAdd}>
            <input
              type="file"
              multiple
              required
              onChange={(e) => setAddImage(e.target.files)}
            />
            <TextField
              required
              margin="dense"
              label="Name"
              fullWidth
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Description"
              fullWidth
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <TableContainer sx={{marginTop:'20px'}} component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Completed</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el) => (
              <TableRow key={el.id}>
                <TableCell>{el.id}</TableCell>
                <TableCell align="center">
                  {el.images?.map((img) => (
                    <div key={img.id}>
                      <img
                        src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                        alt=""
                        width={60}
                        height={40}
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center">{el.name}</TableCell>
                <TableCell align="center">{el.description}</TableCell>
                <TableCell align="center">
                  <h4
                    style={{
                      backgroundColor: el.isCompleted ? "green" : "red",
                      borderRadius: "10px",
                      padding: "8px",
                      color: "#fff",
                      width: "70px",
                      margin: "auto",
                    }}
                  >
                    {el.isCompleted ? "DONE" : "UNDO"}
                  </h4>
                </TableCell>
                <TableCell align="center">
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <Button variant="outlined" color="error" onClick={() => deleteUs(el.id)}>
                      <BackspaceIcon />
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleEdit(el)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        if (el.images.length > 0) {
                          const lastImageId = el.images[el.images.length - 1].id;
                          delImage(lastImageId);
                        }
                      }}
                    >
                      <HideImageIcon />
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => complit(el.id)}>
                      Check
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => handleAddImage(el.id)}>
                      <PhotoCameraIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSave}>
            <TextField
              required
              margin="dense"
              label="Name"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Description"
              fullWidth
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <DialogActions>
              <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddImage} onClose={() => setOpenAddImage(false)}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSaveAddImage}>
            <input
              type="file"
              multiple
              required
              onChange={(e) => setImage(e.target.files)}
            />
            <DialogActions>
              <Button onClick={() => setOpenAddImage(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
