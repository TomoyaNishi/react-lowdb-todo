import "./Header.css";

export const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser({ name: "", email: "", isAccess: false });
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
  };
  return (
    <div className="header">
      <p className="header-text">👤 {user.name}</p>
      <p className="header-text">📧 {user.email}</p>
      <p className="logout" onClick={() => handleLogout()}>
        LOGOUT
      </p>
    </div>
  );
};
