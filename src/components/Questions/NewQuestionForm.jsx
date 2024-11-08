import React, { useEffect, useState } from "react";
import {
    createQuestion,
    deleteQuestion,
    updateQuestion,
} from "../../api/questions";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const NewQuestionForm = ({
    formData = {
        title: "",
        options: ["", "", "", ""],
        correctAnswer: [false, false, false, false],
        explanation: "",
    },
}) => {
    const { id: quizId } = useParams();
    const [form, setForm] = useState(formData);
    const accessToken = localStorage.getItem("authToken");

    const handleTitle = (e) => {
        console.log(e.target.value);
        setForm((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleOptionChange = (optionIndex, value) => {
        setForm((prev) => {
            const newOptions = [...prev.options];
            newOptions[optionIndex] = value;
            return { ...prev, options: newOptions };
        });
    };

    const handleCorrectAnswerChange = (optionIndex) => {
        setForm((prev) => {
            const newCorrectAnswer = [...prev.correctAnswer];
            newCorrectAnswer[optionIndex] = !newCorrectAnswer[optionIndex];
            return { ...prev, correctAnswer: newCorrectAnswer };
        });
    };

    const handleExplanation = (e) => {
        setForm((prev) => ({ ...prev, explanation: e.target.value }));
    };

    const handlePush = async () => {
        try {
            const response = await createQuestion({
                accessToken,
                form: {
                    title: form.title,
                    correctAnswer: form.correctAnswer,
                    options: form.options,
                    explanation: form.explanation,
                    description: form.description,
                    quizId,
                },
            });
            if (response) {
                console.log(response);
                toast.success("Question added successfully");
                setForm((prev) => ({
                    ...prev,
                    questionId: response.questionId,
                }));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleQuestionUpdate = async () => {
        var questionId = formData.id;
        try {
            const updatedQuestion = await updateQuestion({
                accessToken,
                form: {
                    title: form.title,
                    correctAnswer: form.correctAnswer,
                    options: form.options,
                    explanation: form.explanation,
                    id: questionId,
                },
            });
            if (updatedQuestion) {
                toast.success("Question updated successfully");
                console.log(await updatedQuestion.json());
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleQuestionDelete = async () => {
        // console.log(formData.id);
        var questionId = formData.id;
        try {
            const deletedQuestion = await deleteQuestion({
                accessToken,
                id: questionId,
            });
            if (deletedQuestion) {
                toast.success("Question deleted successfully");
                console.log(await deletedQuestion.json());
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="space-y-4 mt-6 bg-gray-700 p-6 rounded-lg">
            <input
                type="text"
                value={form.title}
                onChange={handleTitle}
                placeholder="Enter question"
                className="w-full p-3 bg-gray-800 text-white border border-soft-teal rounded-lg"
            />

            {form.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                            handleOptionChange(optionIndex, e.target.value)
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className="w-full p-3 bg-gray-800 text-white border border-soft-teal rounded-lg"
                    />
                    <label className="flex items-center space-x-2 text-white">
                        <input
                            type="checkbox"
                            checked={form.correctAnswer[optionIndex]}
                            onChange={() =>
                                handleCorrectAnswerChange(optionIndex)
                            }
                            className="form-checkbox h-5 w-5 text-soft-teal focus:ring-soft-teal"
                        />
                        <span>Correct</span>
                    </label>
                </div>
            ))}

            <textarea
                value={form.explanation}
                onChange={handleExplanation}
                placeholder="Explanation for the correct answer (optional)"
                className="w-full h-[100px] p-3 bg-gray-800 text-white border border-soft-teal rounded-lg"
            ></textarea>

            <div className="flex space-x-4">
                {formData.id ? (
                    <button
                        onClick={handleQuestionUpdate}
                        className="bg-soft-teal px-4 py-2 rounded-lg text-black hover:bg-teal-700 transition"
                    >
                        Update
                    </button>
                ) : (
                    <button
                        onClick={handlePush}
                        className="bg-soft-teal px-4 py-2 rounded-lg text-black hover:bg-teal-700 transition"
                    >
                        Push
                    </button>
                )}
                <button
                    onClick={handleQuestionDelete}
                    className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NewQuestionForm;
