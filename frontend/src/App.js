import "./App.css";
import { useEffect, useState } from "react";
import { GetFetch } from "./GetFetch";
import { PostFetch } from "./PostFetch";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    await PostFetch("http://localhost:8080/todos", input);
    GetFetch("http://localhost:8080/todos", setTodos);
    setInput("");
  };

  useEffect(() => {
    GetFetch("http://localhost:8080/todos", setTodos);
  }, []);

  return (
    <div className="container">
      <input value={input} onChange={(e) => handleChange(e)} />
      <button onClick={() => handleClick()}>button</button>
      <ul className="">
        {todos
          ? todos.map((todo, index) => {
              return (
                <li key={index} className="list-item">
                  ({todo.id}) {todo.text}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default App;
