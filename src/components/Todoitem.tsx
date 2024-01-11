import { Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';

type PropsType = {
    todo: TodoItemType;
    deleteHandler: (id: TodoItemType["id"]) => void;
    completeHandler: (id: TodoItemType["id"]) => void;
    editHandler: (id: TodoItemType["id"], title: TodoItemType["title"]) => void;
}

const Todoitem = ({ todo, completeHandler, deleteHandler, editHandler }: PropsType) => {

    const [editActive, setEditActive] = useState<boolean>(false);
    const [textVal, setTextVal] = useState<TodoItemType["title"]>(todo.title);

    const buttonHandler = (): void => {
        setEditActive(prev => !prev);
        if(editActive) {
            editHandler(todo.id, textVal);
            setEditActive(false);
        }
    }

    return (
        <Paper sx={{
            padding: "10px",
        }}>
            <Stack direction={"row"} alignItems={"center"}>
                {
                    editActive ? <TextField value={textVal}
                        sx={{
                            marginRight: "auto",
                        }}
                        onChange={(e) => setTextVal(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && textVal.trim()) {
                                editHandler(todo.id, textVal);
                                setEditActive(false)
                            }
                        }}
                    /> :
                        <Typography marginRight={"auto"}>{todo.title}</Typography>
                }
                <Checkbox checked={todo.isCompleted} onChange={() => completeHandler(todo.id)} />

                <Button color='error' onClick={() => deleteHandler(todo.id)}><Delete /></Button>

                <Button color='info' sx={{
                    fontWeight: "bold",
                }}
                    onClick={ buttonHandler}

                >
                    {
                        editActive ? "DONE" : "EDIT"
                    }
                </Button>
            </Stack>
        </Paper>
    )
}

export default Todoitem
