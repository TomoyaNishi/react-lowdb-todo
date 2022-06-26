import "../Auth.css";
import { useContext, useState } from "react";
import { PostFetch } from "../../fetch";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../../components";
import { UserContext } from "../../context/UserContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await PostFetch("http://localhost:8080/auth/login", {
      email: email,
      password: password,
    });

    const isStatus = res.status === 200;
    if (!isStatus) return;
    setError(res.status);

    const data = await res.json();
    setUser({
      name: data.name,
      email: data.email,
      isAccess: true,
    });

    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", data.email);

    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrap">
        <h1 className="auth-title">LOGIN</h1>
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
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
          <button className="auth-button">LOGIN</button>
        </form>
        <Link to="/register" className="link-text">
          新規登録する
        </Link>
      </div>
    </div>
  );
};
