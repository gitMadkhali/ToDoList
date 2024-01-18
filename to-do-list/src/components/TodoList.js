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
import { useState, useContext, useEffect } from "react";
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
  const [displayTodosType, setDisplayTodosType] = useState("all");

  const completedTods = todos.filter((t) => t.isCompleted);
  const nonCompletedTods = todos.filter((t) => !t.isCompleted);
  let todosToBeRendered = todos;

  if (displayTodosType === "completed") {
    todosToBeRendered = completedTods;
  } else if (displayTodosType === "non-completed") {
    todosToBeRendered = nonCompletedTods;
  }

  const todosJSX = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("useEffect  >> ");
  }, []);
  function changeDisabledTodosType(e) {
    console.log(e.target.value);
    setDisplayTodosType(e.target.value);
  }
  function handleAddClick() {
    // alert("Add todos");
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  return (
    <>
      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h2">مهامي</Typography>
            <Divider variant="middle" />
            {/* ToggleButtonGroup*/}
            <ToggleButtonGroup
              value={displayTodosType}
              exclusive
              onChange={changeDisabledTodosType}
              aria-label="text alignment"
              style={{ direction: "ltr", marginTop: "30px" }}
            >
              <ToggleButton value="non-completed">الغير مكتمل</ToggleButton>
              <ToggleButton value="completed">المكتمل</ToggleButton>
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
                  disabled={titleInput.length <= 1}
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
