import "./Register.css";
import { useRef, useState } from "react";
import { PostFetch } from "../../fetch";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(isMatch);
    setIsMatch(password !== confirmPassword);
    if (password !== confirmPassword) return;

    await PostFetch("http://localhost:8080/auth/register", {
      name: name,
      email: email,
      password: password,
    });

    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-wrap">
        <h1 className="login-title">REGISTER</h1>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
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
          <button className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
};
