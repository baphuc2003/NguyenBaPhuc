import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { AxiosService } from "./Services/AxiosService";

export const UserContext = React.createContext({});
function App() {
  const axiosService = new AxiosService();
  if (localStorage.getItem("access_token")) {
    axiosService.setAccessToken(localStorage.getItem("access_token") as string);
  }
  if (localStorage.getItem("user_id")) {
    axiosService.setUserId(localStorage.getItem("user_id") as string);
  }

  const [axios, setAxios] = useState(axiosService);
  return (
    <UserContext.Provider value={axios}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
