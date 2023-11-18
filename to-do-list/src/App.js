// import logo from "./logo.svg";
import React from "react";

import "./App.css";
import TodoList from "./components/TodoList";
// import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./context/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Cairo",
  },
});
const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة الكتاب",
    details: "قراءة ثلاثة أجزاء من كتاب فن اللامبالاة  ",
    isCompleted: true,
  },
  {
    id: uuidv4(),
    title: "تصميم واجه المستخدم",
    details: "تصميم واجهة المستخدم ",
    isCompleted: true,
  },
  {
    id: uuidv4(),
    title: "قراءة الكتاب",
    details: "قراءة ثلاثة أجزاء من كتاب فن اللامبالاة  ",
    isCompleted: true,
  },
];
function App() {
    const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "Gray",
          backgroundSize: "cover",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
