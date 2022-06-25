import "./Header.css";

export const Header = ({ user, setUser }) => {
  return (
    <div className="header">
      <p className="header-text">👤 {user.name}</p>
      <p className="header-text">📧 {user.email}</p>
      <p
        className="logout"
        onClick={() => setUser({ name: "", email: "", isAccess: false })}
      >
        LOGOUT
      </p>
    </div>
  );
};
