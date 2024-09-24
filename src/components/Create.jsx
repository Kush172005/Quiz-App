import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import { toast } from "react-toastify";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [quizTitle, setQuizTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const quillRef = useRef(null);

    const [form, setForm] = useState({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswers: [false, false, false, false],
        explanation: "",
    });

    useEffect(() => {
        const quillOptions = {
            placeholder: "Write your question here...",
            theme: "snow",
            modules: {
                toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }],
                    [{ indent: "-1" }, { indent: "+1" }],
                ],
            },
        };
        const quill = new Quill("#editor", quillOptions);

        quill.on("text-change", () => {
            setForm((prev) => ({
                ...prev,
                questionText: quill.root.innerHTML,
            }));
        });
        quillRef.current = quill;
    }, []);

    const handleOptionChange = (index, value) => {
        const newOptions = [...form.options];
        newOptions[index] = value;
        setForm((prev) => ({ ...prev, options: newOptions }));
    };

    const handleCorrectAnswerChange = (index) => {
        const newCorrectAnswers = [...form.correctAnswers];
        newCorrectAnswers[index] = !newCorrectAnswers[index];
        setForm((prev) => ({ ...prev, correctAnswers: newCorrectAnswers }));
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        setQuestions((prev) => [...prev, form]);

        // Reset form fields after adding a question
        setForm({
            options: ["", "", "", ""],
            questionText: "",
            correctAnswers: [false, false, false, false],
            explanation: "",
        });
        quillRef.current.root.innerHTML = ""; // Clear the Quill editor
    };

    const handleQuizSubmit = () => {
        toast.success("Quiz created successfuly");
        const newQuiz = {
            title: quizTitle,
            questions: questions.map((q) => ({
                question: q.questionText,
                options: q.options,
                ans: q.options.filter((_, i) => q.correctAnswers[i]),
                explanation: q.explanation,
            })),
        };
        setTimeout(() => {
            navigate("/main");
        }, 2000);

        // Save the quiz in local storage or send to server/database
        localStorage.setItem("createdQuiz", JSON.stringify(newQuiz));
        console.log("Quiz Saved: ", newQuiz);

        // Clear the quiz creation form
        setQuizTitle("");
        setQuestions([]);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-4xl space-y-6">
                <h2 className="text-3xl font-bold text-soft-teal text-center mb-6">
                    Create a New Quiz
                </h2>

                {/* Quiz Title */}
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

                <form onSubmit={handleAddQuestion}>
                    {/* Question Editor */}
                    <div className="border border-soft-teal rounded-lg p-4 bg-gray-800 mb-4">
                        <div
                            id="editor"
                            className="h-[150px] bg-gray-900 text-white border border-soft-teal rounded-lg"
                        ></div>
                    </div>

                    {/* Options and Correct Answer */}
                    <div className="space-y-4">
                        {form.options.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-4"
                            >
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Option ${index + 1}`}
                                    className="w-full p-3 font-bold bg-gray-800 border border-soft-teal rounded-lg placeholder-[#9180c2] text-white focus:outline-none focus:ring-2 focus:ring-soft-teal"
                                    required
                                />
                                <label className="flex items-center space-x-2 text-white">
                                    <input
                                        type="checkbox"
                                        checked={form.correctAnswers[index]}
                                        onChange={() =>
                                            handleCorrectAnswerChange(index)
                                        }
                                        className="form-checkbox h-5 w-5 text-soft-teal focus:ring-soft-teal"
                                    />
                                    <span>Correct</span>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Explanation */}
                    <div className="mt-4">
                        <textarea
                            value={form.explanation}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    explanation: e.target.value,
                                }))
                            }
                            placeholder="Explanation for the correct answer (optional)"
                            className="w-full h-[100px] p-3 bg-gray-800 text-white border border-soft-teal rounded-lg placeholder-[#64d2b3] focus:outline-none focus:ring-2 focus:ring-soft-teal"
                        ></textarea>
                    </div>

                    {/* Add More Button */}
                    <div className="flex gap-6 justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-soft-teal text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300"
                        >
                            ADD MORE
                        </button>

                        {/* Submit Entire Quiz */}
                        <div
                            onClick={handleQuizSubmit}
                            className="bg-soft-teal cursor-pointer text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300"
                        >
                            Submit Quiz
                        </div>
                    </div>
                </form>

                {/* Questions Preview */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-soft-teal mb-6">
                        Questions List
                    </h2>
                    {questions.length === 0 ? (
                        <p className="text-gray-300">No questions added yet.</p>
                    ) : (
                        questions.map((q, index) => (
                            <div
                                key={index}
                                className="mb-6 p-4 bg-gray-800 rounded-lg border border-soft-teal"
                            >
                                <h4 className="text-xl font-semibold text-soft-teal mb-2">
                                    {index + 1}.{" "}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: q.questionText,
                                        }}
                                    />
                                </h4>
                                <ul className="space-y-2 mb-2">
                                    {q.options.map((opt, i) => (
                                        <li
                                            key={i}
                                            className="p-2 bg-muted-purple border border-soft-teal rounded-lg"
                                        >
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                                <p>
                                    <strong className="text-soft-teal">
                                        Correct Answer(s):
                                    </strong>{" "}
                                    {q.options
                                        .filter((_, i) => q.correctAnswers[i])
                                        .join(", ")}
                                </p>
                                {q.explanation && (
                                    <p>
                                        <strong className="text-soft-teal">
                                            Explanation:
                                        </strong>{" "}
                                        {q.explanation}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Create;

