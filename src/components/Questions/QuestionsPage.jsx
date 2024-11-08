import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../api/quiz";
import { prepareStackTrace } from "postcss/lib/css-syntax-error";
import NewQuestionForm from "./NewQuestionForm";
import { getQuestionsFromQuizId } from "../../api/questions";

const Questions = () => {
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [forms, setForms] = useState([]); // Array of question forms
    const [quizData, setQuizData] = useState({});
    const accessToken = localStorage.getItem("authToken");
    const { id } = useParams();

    useEffect(() => {
        const getQuizWithId = async () => {
            const response = await getQuizById({
                accessToken,
                id,
            });
            if (response.ok) {
                const data = await response.json();
                setQuizData(data);
                console.log(data);
            }
        };
        const getQuestionId = async () => {
            const response = await getQuestionsFromQuizId({
                accessToken,
                quizId: id,
            });

            if (response.ok) {
                const { questions } = await response.json();
                setForms(questions);
                // console.log(data);
            }
        };
        getQuizWithId();
        getQuestionId();
    }, []);

    useEffect(() => {
        if (quizData.quiz) {
            setQuizTitle(quizData.quiz.title || "");
            setQuizDescription(quizData.quiz.description || "");
        }
    }, [quizData]);

    const addNewForm = () => {
        setForms((prev) => [
            ...prev,
            {
                questionText: "",
                options: ["", "", "", ""],
                correctAnswer: [false, false, false, false],
                explanation: "",
            },
        ]);
    };

    const handleFormChange = (index, updatedForm) => {
        setForms((prev) => {
            const newForms = [...prev];
            newForms[index] = updatedForm;
            return newForms;
        });
    };

    const handleSubmitQuiz = () => {
        console.log("Submitted Quiz:", { quizTitle, quizDescription, forms });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-4xl space-y-6">
                <h2 className="text-3xl font-bold text-soft-teal text-center mb-6">
                    Create a New Quiz
                </h2>

                <div className="mb-6">
                    <input
                        type="text"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        placeholder="Enter Quiz Title"
                        className="w-full p-3 bg-gray-800 border border-soft-teal rounded-lg text-white placeholder-[#9180c2] focus:outline-none focus:ring-2 focus:ring-soft-teal"
                        required
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        placeholder="Enter Quiz Description"
                        className="w-full p-3 bg-gray-800 border border-soft-teal rounded-lg text-white placeholder-[#9180c2] focus:outline-none focus:ring-2 focus:ring-soft-teal"
                        required
                    />
                </div>

                {forms.map((form, index) => (
                    <NewQuestionForm
                        key={index}
                        index={index}
                        formData={form}
                        quizDescription={quizDescription}
                        setQuizDescription={setQuizDescription}
                        onFormChange={handleFormChange}
                    />
                ))}

                <button
                    onClick={addNewForm}
                    className="bg-soft-teal text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300 mt-6"
                >
                    Add New Question
                </button>

                <div
                    className="bg-soft-teal cursor-pointer text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300 mt-4"
                    onClick={handleSubmitQuiz}
                >
                    Submit Quiz
                </div>
            </div>
        </div>
    );
};

export default Questions;
