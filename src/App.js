import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Quiz from "./components/Quiz";
import Create from "./components/Create";
import Signup from "./components/auth/Signup";
import Confetti from "./components/Confetti";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Result from "./components/Result";
import Profile from "./components/Profile";
import MainPage from "./components/MainPage";
import Login from "./components/auth/Login";
import CreateQuiz from "./components/CreateQuiz";
import QuestionsPage from "./components/Questions/QuestionsPage";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

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
                    path="/createQuiz"
                    element={<PrivateRoute element={<CreateQuiz />} />}
                />

                <Route
                    path="/questions/:id"
                    element={<PrivateRoute element={<QuestionsPage />} />}
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
        </AuthProvider>
    );
}

export default App;
