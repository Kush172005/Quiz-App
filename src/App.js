import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Quiz from "./components/Quiz";
import Create from "./components/Create";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Confetti from "./components/Confetti";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Result from "./components/Result";
import Profile from "./components/Profile";
import MainPage from "./components/MainPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected routes */}
                    <Route
                        path="/main"
                        element={<PrivateRoute element={<Main />} />}
                    />

                    <Route
                        path="/quiz/:quizId"
                        element={<PrivateRoute element={<Quiz />} />}
                    />

                    <Route
                        path="/result"
                        element={<PrivateRoute element={<Result />} />}
                    />

                    <Route
                        path="/create"
                        element={<PrivateRoute element={<Create />} />}
                    />

                    <Route
                        path="/confetti"
                        element={<PrivateRoute element={<Confetti />} />}
                    />
                    <Route
                        path="/profile"
                        element={<PrivateRoute element={<Profile />} />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
