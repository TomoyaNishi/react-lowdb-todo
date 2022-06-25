import "./Todo.css";
import { Button, TodoInput, Lists, Header } from "../../components";
import { useContext, useEffect, useState } from "react";
import { DeleteFetch, GetFetch, PostFetch } from "../../fetch";
import { UpdateFetch } from "../../fetch/UpdateFetch";
import { UserContext } from "../../context/UserContext";

export const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();

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
      <Header user={user} setUser={setUser} />
      <form className="input-wrap" onSubmit={(e) => addTodo(e)}>
        <TodoInput input={input} onClick={handleChange} />
        <Button
          style="add-button"
          disabled={disabled}
          arg={disabled}
          onClick={() => {}}
          text="ADD"
        />
      </form>
      <Lists lists={todos} clickUpdate={updateTodo} clickDelete={deleteTodo} />
    </div>
  );
};
