import * as React from "react";
// import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// Card
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// ToggleButtonGroup
// import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
// import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
// import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
// import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// Copmnents
import Todo from "./Todo";
// Grid
import Grid from "@mui/material/Grid";
// TextFiled
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../context/todosContext";
// Other
import { v4 as uuidv4 } from "uuid";

const divStyle = {
  overflowY: "scroll",
  border: "1px solid red",
  width: "500px",
  float: "left",
  height: "500px",
  position: "relative",
};
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  // function handleCheckClick(todoID) {
  //   // alert("Handle check click   " + todoID);
   
  // }
  const todosJSX = todos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        // handleCheck={handleCheckClick}  //I change or not do't deffernt betwwen that.
      />
    );
  });
  function handleAddClick() {
    // alert("Add todos");
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details:"",
      isCompleted: false,
    }
    setTodos([...todos, newTodo]);
    setTitleInput("")
  }
  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h2">مهامي</Typography>
            <Divider variant="middle" />
            {/* ToggleButtonGroup*/}
            <ToggleButtonGroup
              // value={alignment}
              exclusive
              // onChange={handleAlignment}
              aria-label="text alignment"
              style={{ direction: "ltr", marginTop: "30px" }}
            >
              <ToggleButton value="not">الغير مكتمل</ToggleButton>
              <ToggleButton value="done">المكتمل</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {/*=====ToggleButtonGroup====*/}
            {/* All TODOS */}
            {/*=== All TODOS=== */}
            {todosJSX}
            {/* ADD + INPUT TODO */}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid item xs={8}>
                {" "}
                <TextField
                  style={{ width: "100%", direction: "rtl" }}
                  id="outlined-basic"
                  label="عنوان المهمه"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} style={{ width: "100%" }}>
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  color="success"
                  onClick={handleAddClick}
                >
                  إضافه
                </Button>
              </Grid>
            </Grid>
            {/* ===ADD + INPUT TODO=== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
