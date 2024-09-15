import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { quizzes } from "../assets/data";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const { quizId } = useParams();
    const [index, setIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const quiz = quizzes.find((q) => q.id === parseInt(quizId));
        if (quiz) {
            setQuestions(quiz.questions);
        }
    }, [quizId]);

    const question = questions[index] || {};

    const handleOptionClick = (optionIndex) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [index]: optionIndex + 1,
        }));
    };

    const getSelectedOption = () => selectedOptions[index];

    const handleSubmit = () => {
        navigate(`/result`, {
            state: {
                selectedOptions,
                quizId: parseInt(quizId), 
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
            <div className="bg-gradient-to-r mt-8 from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-3xl space-y-6">
                <h4 className="text-3xl font-bold text-soft-teal text-center">
                    {index + 1}. {question.question}
                </h4>
                <ul className="space-y-4">
                    {question.options?.map((option, optionIndex) => (
                        <li
                            key={optionIndex}
                            onClick={() => handleOptionClick(optionIndex)}
                            className={`p-4 rounded-lg cursor-pointer hover:border-[#64d2b3] bg-opacity-30 border border-soft-teal transition
                            ${
                                getSelectedOption() === optionIndex + 1
                                    ? "bg-[#9180c2] border-[#64d2b3]"
                                    : ""
                            }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between">
                    <button
                        onClick={() => index > 0 && setIndex(index - 1)}
                        className="bg-soft-teal text-black px-4 py-2 rounded-lg hover:text-white transition duration-300"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            index < questions.length - 1
                                ? setIndex(index + 1)
                                : handleSubmit()
                        }
                        className="bg-soft-teal text-black px-4 py-2 rounded-lg hover:text-white transition duration-300"
                    >
                        {index < questions.length - 1 ? "Next" : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
