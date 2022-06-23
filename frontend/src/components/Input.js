export const Input = ({ input, onClick }) => {
  return (
    <input className="input-form" value={input} onChange={(e) => onClick(e)} />
  );
};
