import "./Todo.css";
import { Button, Input, Lists } from "../../components";
import { useEffect, useState } from "react";
import { DeleteFetch, GetFetch, PostFetch } from "../../fetch";
import { UpdateFetch } from "../../fetch/UpdateFetch";

export const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async () => {
    await PostFetch("http://localhost:8080/todos", { text: input });
    GetFetch("http://localhost:8080/todos", setTodos);
    setInput("");
    setDisabled(true);
  };

  const updateTodo = async (id, text) => {
    await UpdateFetch("http://localhost:8080/todos", {
      id: id,
      text: text,
    });
    GetFetch("http://localhost:8080/todos", setTodos);
  };

  const deleteTodo = async (id) => {
    await DeleteFetch("http://localhost:8080/todos", {
      id: id,
    });
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
};
