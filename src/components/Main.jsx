import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "../assets/data";
import { useAuth } from "../context/AuthContext";
import MyQuizes from "./Quiz/MyQuizes";

const QuizList = () => {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        const storedProfileImage = localStorage.getItem("profileImage");
        setProfileImage(
            storedProfileImage ||
                "https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png" // Default dummy image for new users
        );
    }, []);

    const handlePlay = (quizId) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="w-full py-6 md:px-10 rounded-3xl border-b-2 border-[#64d2b3] flex justify-between items-center max-sm:justify-evenly bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl">
                <div
                    onClick={() => navigate("/")}
                    className="text-neon-blue hover:cursor-pointer font-bold text-3xl"
                >
                    <span className="text-neon-blue">𝓠uiz</span>
                </div>

                <div className="flex items-center space-x-6">
                    <button
                        onClick={() => navigate("/createQuiz")}
                        className="bg-neon-blue border-2 hover:bg-magenta glow-button py-2 px-3 rounded-md font-semibold transition duration-300 ease-in-out"
                    >
                        Create a Quiz
                    </button>

                    {/* <button
                        onClick={() => navigate("/create")}
                        className="bg-neon-blue border-2 hover:bg-magenta glow-button py-2 px-3 rounded-md font-semibold transition duration-300 ease-in-out"
                    >
                        Create a Quiz
                    </button> */}

                    {isAuthenticated ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem("authToken");
                                setIsAuthenticated(false);
                                navigate("/login");
                            }}
                            className="border-2 border-neon-blue text-neon-blue py-2 px-4 rounded-md font-semibold hover:bg-magenta hover:text-white transition duration-300 ease-in-out glow-border"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="border-2 border-neon-blue text-neon-blue py-2 px-4 rounded-md font-semibold hover:bg-magenta hover:text-white transition duration-300 ease-in-out glow-border"
                        >
                            Login
                        </button>
                    )}

                    <div className="relative">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-soft-teal"
                            onClick={() => navigate("/profile")}
                        />
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-10 py-12">
                <h2 className="text-4xl font-bold text-soft-teal mb-8">
                    Popular Quizzes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-gray-800 p-8 card rounded-[20px] border border-soft-teal transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <h3 className="text-2xl font-semibold text-neon-blue mb-3">
                                {quiz.title}
                            </h3>
                            <p className="text-gray-300 mb-4">
                                {quiz.description}
                            </p>
                            <button
                                onClick={() => handlePlay(quiz.id)}
                                className="bg-soft-teal card-button text-black px-6 py-2 rounded-lg text-lg font-medium hover:bg-muted-purple hover:text-white transition duration-300"
                            >
                                Play Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center mt-12">
                    <h2 className="text-4xl font-bold text-soft-teal mb-8">
                        My Quizzes
                    </h2>

                    <MyQuizes />
                </div>
            </div>

            <footer className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-center text-gray-400">
                <p>&copy; 2024 Quiz. Embrace the Future of Learning.</p>
            </footer>
        </div>
    );
};

export default QuizList;
