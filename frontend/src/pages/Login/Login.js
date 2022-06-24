import "./Login.css";
import { useRef } from "react";
import { PostFetch } from "../../fetch";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await PostFetch("http://localhost:8080/auth/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    const isStatus = res.status === 200;
    if (!isStatus) return;

    navigate("/");
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
