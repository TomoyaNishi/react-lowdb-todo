import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, Todo } from "./pages";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user.isAccess ? <Todo /> : <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
