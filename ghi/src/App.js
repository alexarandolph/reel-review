import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import MainPage from "./MainPage.js";
import Login from "./components/Login.js";
import { AuthProvider, useToken } from "./components/useToken";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp.js";
import WelcomePage from "./components/WelcomePage.js";
import MovieDetail from "./components/MovieDetail.js";
import ReviewsForm from "./components/ReviewsForm.js";
import Profile from "./components/Profile.js";
import Nav from "./components/Nav.js";
import ReviewList from "./components/ReviewList.js";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  const [error, setError] = useState(null);


  return (
    <div>
      <BrowserRouter>
        <AuthProvider>

          <GetToken />
          <Nav></Nav>
          <ErrorNotification error={error} />
          {/* <Construct info={launch_info} /> */}

          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/" element={<MainPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/movie/detail/:id" element={<MovieDetail />} />
            <Route path="/reviews/list" element={<ReviewList />} />
            <Route path="/reviews/create/:id" element={<ReviewsForm />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
