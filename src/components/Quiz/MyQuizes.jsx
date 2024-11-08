import React, { useEffect, useState } from "react";
import { deleteQuiz, getAllQuiz } from "../../api/quiz";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const MyQuizes = () => {
    const [myQuizes, setMyQuizes] = useState([]);
    var accessToken = localStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await getAllQuiz({
                    accessToken,
                });

                if (response.ok) {
                    const data = await response.json();

                    setMyQuizes(data.quizzes || []);
                } else {
                    console.error("Failed to fetch quizzes");
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };

        fetchQuizzes();
    }, [accessToken]);

    const handleDeleteQuiz = async (quizId) => {
        try {
            const response = await deleteQuiz({ accessToken, quizId });
            if (response.ok) {
                toast.success("Quiz deleted successfully");

                setMyQuizes((prevQuizzes) =>
                    prevQuizzes.filter((quiz) => quiz.id !== quizId)
                );
            } else {
                toast.error("Failed to delete quiz");
            }
        } catch (error) {
            toast.error("Error deleting quiz");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myQuizes.map((quiz) => (
                <div
                    key={quiz.id}
                    className="bg-gray-800 p-8 card rounded-[20px] border border-soft-teal transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <h3 className="text-2xl font-semibold text-neon-blue mb-3">
                        {quiz.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{quiz.description}</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate(`/questions/${quiz.id}`)}
                            className="bg-soft-teal card-button text-black px-6 py-2 rounded-lg text-lg font-medium hover:bg-muted-purple hover:text-white transition duration-300"
                        >
                            Open Quiz
                        </button>
                        <button
                            onClick={() => handleDeleteQuiz(quiz.id)}
                            className="bg-red-700 px-4 py-2 rounded-lg flex items-center justify-center text-white text-lg font-medium hover:bg-red-800 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyQuizes;
