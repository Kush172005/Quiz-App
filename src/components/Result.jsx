import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { quizzes } from "../assets/data";
import Confetti from "./Confetti";

const Result = () => {
    const [isExploding, setIsExploding] = useState(null);

    const { state } = useLocation();
    const { quizId, selectedOptions } = state || {};
    const quiz = quizzes.find((q) => q.id === quizId);

    const calculateScore = () => {
        return quiz?.questions.reduce((score, question, index) => {
            return score + (selectedOptions[index] === question.ans ? 1 : 0);
        }, 0);
    };

    const navigate = useNavigate();

    const score = quiz ? calculateScore() : 0;
    const totalQuestions = quiz ? quiz.questions.length : 0;

    useEffect(() => {
        if (quiz && score >= 5) {
            setIsExploding(true);
        }
    }, [score, quiz]);

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-3xl space-y-6">
                <h2 className="text-3xl font-bold text-soft-teal text-center">
                    Quiz Results
                </h2>
                <p className="text-center text-gray-300">
                    Your score: {score} / {totalQuestions}
                </p>

                <div className="mt-6 space-y-4">
                    {quiz.questions.map((question, index) => {
                        const userAnswerIndex = selectedOptions[index];
                        const correctAnswerIndex = question.ans;
                        const isCorrect =
                            userAnswerIndex === correctAnswerIndex;

                        return (
                            <div
                                key={index}
                                className="p-4 bg-gray-800 rounded-lg border border-soft-teal"
                            >
                                <p className="font-bold text-soft-teal">
                                    {index + 1}. {question.question}
                                </p>
                                <p
                                    className={`mt-2 ${
                                        isCorrect
                                            ? "text-soft-teal"
                                            : "text-red-500"
                                    }`}
                                >
                                    Your answer:{" "}
                                    {question.options[userAnswerIndex] ||
                                        "Not Answered"}
                                </p>
                                <p className="mt-1 text-gray-400">
                                    Correct answer:{" "}
                                    {question.options[correctAnswerIndex]}
                                </p>
                                {question.explanation && (
                                    <p className="mt-2 text-gray-400">
                                        Explanation: {question.explanation}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => navigate("/main")}
                            className="w-1/2 bg-soft-teal text-black py-3 rounded-lg text-lg font-semibold hover:bg-muted-purple hover:text-white transition"
                        >
                            Done and back to home
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <Confetti
                        isExploding={isExploding}
                        setIsExploding={setIsExploding}
                    />
                </div>
            </div>
        </div>
    );
};

export default Result;
