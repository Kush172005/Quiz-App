import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizzes } from "../assets/data";

const Quiz = () => {
    const { quizId } = useParams();
    const [index, setIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [questions, setQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerDuration, setTimerDuration] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const navigate = useNavigate();

    // Quiz Questions Load Honge
    useEffect(() => {
        const quiz = quizzes.find((q) => q.id === parseInt(quizId));
        if (quiz) {
            setQuestions(quiz.questions);
        }
    }, [quizId]);

    // Timer effect handling
    useEffect(() => {
        if (timeLeft > 0 && quizStarted) {
            const countdown = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(countdown);
        } else if (timeLeft === 0) {
            handleSubmit();
        }
    });

    // Konsa Option Choose Hua
    const handleOptionClick = (optionIndex) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [index]: optionIndex + 1,
        }));
    };

    const getSelectedOption = () => selectedOptions[index];

    // Quiz submission
    const handleSubmit = () => {
        navigate(`/result`, {
            state: {
                selectedOptions,
                quizId: parseInt(quizId),
            },
        });
    };

    // Start the quiz with the selected timer
    const startQuiz = () => {
        setTimeLeft(timerDuration * 60);
        setQuizStarted(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
            {!quizStarted ? (
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-lg space-y-6">
                    <h2 className="text-3xl font-bold text-soft-teal text-center">
                        Select Quiz Duration
                    </h2>
                    <div className="space-y-4">
                        <button
                            onClick={() => setTimerDuration(1)}
                            className={`w-full bg-gray-800 p-4 rounded-lg ${
                                timerDuration === 1
                                    ? "bg-soft-teal text-black"
                                    : "text-white"
                            } hover:bg-soft-teal transition`}
                        >
                            1 Minute
                        </button>
                        <button
                            onClick={() => setTimerDuration(5)}
                            className={`w-full bg-gray-800 p-4 rounded-lg ${
                                timerDuration === 5
                                    ? "bg-soft-teal text-black"
                                    : "text-white"
                            } hover:bg-soft-teal transition`}
                        >
                            5 Minutes
                        </button>
                        <button
                            onClick={() => setTimerDuration(10)}
                            className={`w-full bg-gray-800 p-4 rounded-lg ${
                                timerDuration === 10
                                    ? "bg-soft-teal text-black"
                                    : "text-white"
                            } hover:bg-soft-teal transition`}
                        >
                            10 Minutes
                        </button>
                        <button
                            onClick={() => setTimerDuration(20)}
                            className={`w-full bg-gray-800 p-4 rounded-lg ${
                                timerDuration === 20
                                    ? "bg-soft-teal text-black"
                                    : "text-white"
                            } hover:bg-soft-teal transition`}
                        >
                            20 Minutes
                        </button>
                    </div>
                    <button
                        onClick={startQuiz}
                        className="w-full bg-soft-teal text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-muted-purple hover:text-white transition"
                        disabled={!timerDuration}
                    >
                        Start Quiz
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-3xl">
                    {/* Timer Display */}
                    <div className="flex justify-between mb-4">
                        <div className="bg-gray-800 text-soft-teal py-2 px-4 rounded-lg font-semibold text-xl">
                            Time Left: {Math.floor(timeLeft / 60)}:
                            {timeLeft % 60 < 10 ? "0" : ""}
                            {timeLeft % 60} minutes
                        </div>
                    </div>

                    {/* Quiz Question */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 space-y-6">
                        <h4 className="text-3xl font-bold text-soft-teal text-center">
                            {index + 1}. {questions[index]?.question}
                        </h4>
                        <ul className="space-y-4">
                            {questions[index]?.options?.map(
                                (option, optionIndex) => (
                                    <li
                                        key={optionIndex}
                                        onClick={() =>
                                            handleOptionClick(optionIndex)
                                        }
                                        className={`p-4 rounded-lg cursor-pointer bg-opacity-30 border border-soft-teal hover:border-[#64d2b3] transition
                                    ${
                                        getSelectedOption() === optionIndex + 1
                                            ? "bg-[#9180c2] border-[#64d2b3]"
                                            : ""
                                    }`}
                                    >
                                        {option}
                                    </li>
                                )
                            )}
                        </ul>
                        <div className="flex justify-between">
                            <button
                                onClick={() => {
                                    if (index > 0) setIndex(index - 1);
                                }}
                                className="bg-soft-teal text-black px-4 py-2 rounded-lg hover:text-white transition duration-300"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => {
                                    if (index < questions.length - 1) {
                                        setIndex(index + 1);
                                    } else {
                                        handleSubmit();
                                    }
                                }}
                                className="bg-soft-teal text-black px-4 py-2 rounded-lg hover:text-white transition duration-300"
                            >
                                {index < questions.length - 1
                                    ? "Next"
                                    : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
