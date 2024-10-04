import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/LOgin";
import Home from "./pages/Home";

function App() {
  const [token, settoken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(function () {
    if (localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, []);

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }

    return children;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={!!token}>
              <Home></Home>
            </PrivateRoute>
          }
        ></Route>

        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
