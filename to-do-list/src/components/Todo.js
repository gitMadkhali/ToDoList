// Card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Grid
import Grid from "@mui/material/Grid";
// Icon Buttons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useContext, useState } from "react";
import { TodosContext } from "../context/todosContext";

// Delete & Update Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const [showDeleteDialog, setShowDeleDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  // Event Handlers
  function handleCheckClick(todo) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(updatedTodos);
  }
  function handleDeleteClick() {
    setShowDeleDialog(true);
  }
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleDialog(false);
  }
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos= todos.filter((t) => {
      return t.id !== todo.id;
    });
          setTodos(updatedTodos);

  }
  function handlUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      }else{
        return t
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false)
  }
  // ===Event Handlers===

  return (
    <>
      {/* Update Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdateDialog}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleUpdateDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>تعديل المهمه</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهة  "
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل المهة  "
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>إلغاء</Button>
          <Button onClick={handlUpdateConfirm}>تحديث</Button>
        </DialogActions>
      </Dialog>
      {/* ===Update Dialog===*/}

      {/* Delete Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>هل أنت متاكد من رغبتك في حذف المهمه؟</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            بالضغط على زر حذف لا يمكنك التراجع عن هذا الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm}>نعم ، قم بالحذف</Button>
        </DialogActions>
      </Dialog>
      {/* ===Delete Dialog=== */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          backgroundColor: "#7033FF",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" style={{ textAlign: "right" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Delete Icon Button */}
              <IconButton
                className="iconButton"
                aria-label="Delete" //
                style={{
                  background: "white",
                  color: "#D82B53",
                  border: "solid #D82B53 3px ",
                }}
                onClick={handleDeleteClick}
              >
                {/* ===Delete Icon Button=== */}
                <DeleteIcon />
              </IconButton>
              {/* Check Icon Button */}
              <IconButton
                onClick={() => {
                  handleCheckClick(todo);
                }}
                className="iconButton"
                aria-label="check"
                style={{
                  background: todo.isCompleted ? "#2BD880" : "white",
                  color: todo.isCompleted ? "white" : "#2BD880",
                  border: todo.isCompleted
                    ? "white solid 3px #2BD880"
                    : "solid 3px #2BD880",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* ===Check Icon Button=== */}
              {/* Update Icon Button */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="Update"
                style={{
                  background: "white",
                  color: "#878787",
                  border: "solid #878787 3px ",
                }}
              >
                <EditIcon />
              </IconButton>
              {/* ===Update Icon Button=== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
