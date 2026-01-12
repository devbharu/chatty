import { Routes, Route, Navigate } from "react-router-dom";


import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function App() {
  const isAuthenticated = true;

  return (

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Route */}
      <Route
        path="/home/*"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>

  );
}

export default App;
