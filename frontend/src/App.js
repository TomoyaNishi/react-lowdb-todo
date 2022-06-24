import "./App.css";
import { useEffect, useState } from "react";
import { GetFetch, PostFetch, DeleteFetch } from "./fetch";
import { Lists, Button, Input } from "./components";
import { UpdateFetch } from "./fetch/UpdateFetch";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async () => {
    await PostFetch("http://localhost:8080/todos", input);
    GetFetch("http://localhost:8080/todos", setTodos);
    setInput("");
    setDisabled(true);
  };

  const updateTodo = async (id, text) => {
    await UpdateFetch("http://localhost:8080/todos", id, text);
    GetFetch("http://localhost:8080/todos", setTodos);
  };

  const deleteTodo = async (id) => {
    await DeleteFetch("http://localhost:8080/todos", id);
    GetFetch("http://localhost:8080/todos", setTodos);
  };

  useEffect(() => {
    if (input.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  });

  useEffect(() => {
    GetFetch("http://localhost:8080/todos", setTodos);
  }, []);

  return (
    <div className="container">
      <div className="input-wrap">
        <Input input={input} onClick={handleChange} />
        <Button disabled={disabled} onClick={addTodo} text="ADD" />
      </div>
      <Lists lists={todos} clickUpdate={updateTodo} clickDelete={deleteTodo} />
    </div>
  );
}

export default App;
