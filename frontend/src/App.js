import "./App.css";
import { useEffect, useState } from "react";
import { GetFetch } from "./GetFetch";
import { PostFetch } from "./PostFetch";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    await PostFetch("http://localhost:8080/todos", input);
    GetFetch("http://localhost:8080/todos", setTodos);
    setInput("");
    setDisabled(true);
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
        <input
          className="input-form"
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <button
          className={disabled ? "is-disabled" : "add-button"}
          disabled={disabled}
          onClick={() => handleClick()}
        >
          ADD
        </button>
      </div>
      <ul className="lists">
        {todos
          ? todos.map((todo, index) => {
              return (
                <li key={index} className="list-item">
                  <p>{todo.text}</p>
                  <button className="delete-button">DELETE</button>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default App;
