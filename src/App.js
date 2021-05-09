import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(prompt("What is your name?"));
  }, []);
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="App">
      <img
        id="img1"
        src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
        height="300px"
        width="300px"
      />
      <h1>Hello world</h1>
      <h2>Welcome {username}</h2>
      <form className="app_form">
        <FormControl className="app_formcontrol">
          <Input
            className="app_input"
            placeholder="Enter your message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app_iconbutton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
