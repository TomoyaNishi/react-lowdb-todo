import "./Header.css";

export const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser({ name: "", isAccess: false });
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
  };
  return (
    <div className="header">
      <p className="header-text">👤 {user.name}</p>
      <p className="logout" onClick={() => handleLogout()}>
        LOGOUT
      </p>
    </div>
  );
};
