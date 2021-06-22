import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import db from "./firebase";
import firebase from "firebase/app";
import airplaneSVG from "./airplane.svg";

export default function TodoComponent(props) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(false);

  //When the app loads, we need to listen to the database and fetch new todos as they get added/removed!!!

  useEffect(() => {
    console.log("ok");
    let u = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setUser(u);
      if (!u) props.history.push("/");
    }

    //this code going to execute when the app.js loads!!
    db.collection(`todos_${u.uid}`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //using timestamp to show the recent to do on the top -->
        console.log(snapshot.docs);
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, [user]);

  const addTodo = (event) => {
    //this will apend the todo list
    event.preventDefault(); //will stop the refresh of the page

    db.collection(`todos_${user.uid}`).add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //using this to show the latest todo  on the top.
    });
    // console.log('👽', 'Working!');
    setInput(""); //clears the input field after submitting
  };
  //signout function
  function signOut() {
    localStorage.removeItem("user");
    props.history.push("/");
  }

  return (
    <div className="App">
      <button className="sign-Out" onClick={signOut}>
        Sign Out
      </button>
      <h1>The Todo App</h1>
      <form>
        <div className="input-container">
          <FormControl>
            <InputLabel>✔️ Write a Todo</InputLabel>
            <Input
              type="text"
              name=""
              id=""
              value={input}
              onChange={(event) => {
                setInput(event.target.value.slice(0, 100));
              }}
            />
          </FormControl>
          <button
            className="custom-btn btn-12"
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
            disabled={!input}
          >
            <span>Add Me</span>
            <span>To Do</span>
          </button>
        </div>
      </form>

      <div className="todo-container">
        <ul>
          {todos.map((todo, i) => (
            <Todo key={i} todo={todo} uid={user.uid} />
          ))}
        </ul>
      </div>
      <img className="Airplane" src={airplaneSVG} alt="" />
      <h5 className="footer-main">Designed by Ayan Ansari with ❤️</h5>
    </div>
  );
}
