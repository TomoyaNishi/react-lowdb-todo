import "./Login.css";
import { useState } from "react";
import { PostFetch } from "../../fetch";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await PostFetch("http://localhost:8080/auth/login", {
      email: email,
      password: password,
    });

    const isStatus = res.status === 200;
    setError(res.status);
    if (!isStatus) return;

    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-wrap">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <AuthForm
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
            error={error}
            errorCode={404}
            errorMsg="入力した内容のユーザーが見つかりません"
          />
          <AuthForm
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            error={error}
            errorCode={400}
            errorMsg="パスワードが正しくありません"
          />
          <button className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
};
