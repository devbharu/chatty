import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkSession } from "./slices/authSlice"; // adjust path

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";


function ProtectedRoute({ children }) {
  const { isLoggedIn, sessionChecked } = useSelector((state) => state.auth);

  if (!sessionChecked) {
    return <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}


function PublicRoute({ children }) {
  const { isLoggedIn, sessionChecked } = useSelector((state) => state.auth);

  if (!sessionChecked) {
    return <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return !isLoggedIn ? children : <Navigate to="/home" replace />;
}

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, sessionChecked } = useSelector((state) => state.auth);

  useEffect(() => {

    dispatch(checkSession());
  }, [dispatch]);


  if (!sessionChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/home/*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;