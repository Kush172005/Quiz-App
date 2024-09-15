import React from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "../assets/data";

const QuizList = () => {
    const navigate = useNavigate();

    const handlePlay = (quizId) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="w-full py-6 md:px-10 rounded-3xl border-b-2 border-[#64d2b3] flex justify-between items-center max-sm:justify-evenly bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl">
                {/* Logo */}
                <div className="text-neon-blue font-bold text-3xl">
                    <span className="text-neon-blue">Quiz</span>
                </div>

                {/* Header Buttons */}
                <div className="max-sm:space-x-3 md:space-x-6">
                    <button
                        onClick={() => navigate("/create")}
                        className="bg-neon-blue border-2 hover:bg-magenta glow-button py-2 px-3 rounded-md font-semibold transition duration-300 ease-in-out"
                    >
                        Create a Quiz
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="border-2 border-neon-blue text-neon-blue py-2 px-4 rounded-md font-semibold hover:bg-magenta hover:text-white transition duration-300 ease-in-out glow-border"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Main Section */}
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-10 py-12">
                <h2 className="text-4xl font-bold text-soft-teal mb-8">
                    Popular Quizzes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="card">
                            <h3 className="text-2xl font-semibold text-neon-blue mb-3">
                                {quiz.title}
                            </h3>
                            <p className="text-gray-300 mb-4">
                                {quiz.description}
                            </p>
                            <button
                                onClick={() => handlePlay(quiz.id)}
                                className="card-button"
                            >
                                Play Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-center text-gray-400">
                <p>&copy; 2024 Quiz. Embrace the Future of Learning.</p>
            </footer>
        </div>
    );
};

export default QuizList;
