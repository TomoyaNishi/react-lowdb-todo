export const Button = ({ disabled, onClick, text }) => {
  return (
    <button
      className={disabled ? "is-disabled" : "add-button"}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};
