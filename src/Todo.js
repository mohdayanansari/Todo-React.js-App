import React, { useState } from "react";
import "./Todo.css";
import { List, ListItem, ListItemText, Button, Modal } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    //update the dtodo with the new input
    db.collection(`todos_${props.uid}`).doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Update Todo</h1>
          <input
            placeholder={props.todo.todo}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo_list">
        <div className="todo-child-1" >
          <ListItem>
            <ListItemText
              primary={props.todo.todo}
              secondary="You have to this ⌚"
            />
          </ListItem>
        </div>

        <div className="todo-child-2">
          <button className="edit-todo" onClick={(e) => setOpen(true)}>Edit</button>
          <DeleteForeverRoundedIcon
          className="delete-todo" 
            onClick={(event) =>
              db.collection(`todos_${props.uid}`).doc(props.todo.id).delete()
            }
          />
        </div>
      </List>
    </>
  );
}

export default Todo;
