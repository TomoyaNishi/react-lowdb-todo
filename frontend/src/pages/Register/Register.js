import "../Auth.css";
import { useContext, useRef, useState } from "react";
import { PostFetch } from "../../fetch";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../../components";
import { UserContext } from "../../context/UserContext";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsMatch(password !== confirmPassword);
    if (password !== confirmPassword) return;

    const res = await PostFetch("http://localhost:8080/auth/register", {
      name: name,
      email: email,
      password: password,
    });

    const data = await res.json();
    setUser({
      name: data.name,
      email: data.email,
      isAccess: true,
    });

    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrap">
        <h1 className="auth-title">REGISTER</h1>
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
          <AuthForm
            type="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="name"
            error={null}
            errorCode={null}
            errorMsg={null}
          />
          <AuthForm
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
            error={null}
            errorCode={null}
            errorMsg={null}
          />
          <AuthForm
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            error={null}
            errorCode={null}
            errorMsg={null}
          />
          <AuthForm
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="confirm password"
            error={isMatch}
            errorCode={true}
            errorMsg="パスワードが一致しません"
          />
          <button className="auth-button">LOGIN</button>
        </form>
        <Link to="/login" className="link-text">
          ログインする
        </Link>
      </div>
    </div>
  );
};
