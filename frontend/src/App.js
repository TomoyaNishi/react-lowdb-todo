import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  console.log(input);
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const getTodos = async () => {
    const res = await fetch("http://localhost:8080/todos", {
      method: "GET",
    });
    const data = await res.json();
    setTodos(data);
  };

  const handleClick = async () => {
    const post = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    await post.json();
    getTodos();
    setInput("");
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);
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
