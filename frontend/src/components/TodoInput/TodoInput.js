import "./TodoInput.css";

export const TodoInput = ({ input, onClick }) => {
  return (
    <input className="todo-input" value={input} onChange={(e) => onClick(e)} />
  );
};
