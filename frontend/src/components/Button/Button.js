import "./Button.css";

export const Button = ({ style, disabled, arg, onClick, text }) => {
  return (
    <button
      className={`${style} ${arg ? "is-disabled" : null}`}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};
