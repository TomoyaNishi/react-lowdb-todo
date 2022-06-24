import "./Login.css";
import { useRef } from "react";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-wrap">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="login-input"
            type="email"
            required
            placeholder="email"
            ref={emailRef}
          />
          <input
            className="login-input"
            type="password"
            required
            placeholder="password"
            ref={passwordRef}
          />
          <button className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
};
