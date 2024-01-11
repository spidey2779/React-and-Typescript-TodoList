import { useEffect, useState } from "react"
import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import Todoitem from "./components/Todoitem"
import { getTodos, saveTodos } from "./utils/features"

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());

  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodo=todos.map((todo) =>{
      if(todo.id === id) todo.isCompleted= !todo.isCompleted;
      return todo;
    })
    setTodos(newTodo);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodo=todos.filter((todo)=> todo.id!==id)
    setTodos(newTodo)
  };

  const editHandler = (id: TodoItemType["id"], title:TodoItemType["title"]): void => {
    const newTodo=todos.map((todo) =>{
      if(todo.id === id) todo.title=title;
      return todo;
    })
    setTodos(newTodo);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    }
    setTodos(prev => ([...prev, newTodo]))
    setTitle("")
  }

  useEffect(()=>{
    saveTodos(todos);
  },[todos])

  return (
    <Container maxWidth="sm" sx={{
      maxHeight: "100vh",
      height: "100vh"

    }}>
      <AppBar position="static">
        <Toolbar sx={{
          justifyContent: "center",
        }}>
          <Typography sx={{
            fontWeight: "900",
          }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack height={"72%"} direction={"column"} spacing={"1rem"} p={"1rem"} sx={{
        overflowX: "hidden",
        overflowY: "auto",
        scrollbarWidth: "thin",  
        "::-webkit-scrollbar": {
          width: "8px", 
          backgroundColor: "gray"
        },
        "::-webkit-scrollbar-thumb": {
          // background: "#c7f502",  // Set the desired color for the scrollbar thumb
          background: "lightgreen",  // Set the desired color for the scrollbar thumb
          borderRadius: "6px",  // Adjust the border radius if needed
        },
        scrollbarGutter:"stable",
        paddingRight:"8px"
      }}>
        {
          todos.map((i) => (
            <Todoitem
              completeHandler={completeHandler}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              key={i.id} todo={i} />
          ))
        }
      </Stack>
      <TextField fullWidth label={"NewTask"} value={title} onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title.trim()) {
            submitHandler()
          }
        }} />
      <Button variant="contained" fullWidth sx={{
        margin: "1rem 0",
        fontWeight: "bold",
      }}
        disabled={!title.trim()}
        onClick={submitHandler}
      >Add</Button>
    </Container>
  )
}

export default App
