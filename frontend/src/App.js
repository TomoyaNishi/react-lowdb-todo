import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Login, Register, Todo } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
