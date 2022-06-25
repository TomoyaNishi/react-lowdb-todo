import "./AuthForm.css";

export const AuthForm = ({
  type,
  placeholder,
  onChange,
  value,
  error,
  errorCode,
  errorMsg,
}) => {
  return (
    <div className="auth-item">
      <input
        className="auth-form"
        type={type}
        required
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
      />
      {error === errorCode ? <p className="error">{errorMsg}</p> : null}
    </div>
  );
};
