import React, { useEffect, useState } from "react";
import { deleteQuiz, getAllQuiz } from "../../api/quiz";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const MyQuizes = () => {
    const [myQuizes, setMyQuizes] = useState([]);
    const [sharedQuizes, setSharedQuizes] = useState([]);
    const accessToken = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await getAllQuiz({ accessToken });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    const myQuizzes = data.quizzes.filter(
                        (quiz) => quiz.userId === user.id
                    );

                    const sharedQuizzes = data.quizzes.filter(
                        (quiz) => quiz.userId !== user.id
                    );

                    setMyQuizes(myQuizzes);
                    setSharedQuizes(sharedQuizzes);
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
        <div className="p-6 bg-gray-900 text-white">
            {/* My Quizzes Section */}
            <h2 className="text-3xl font-semibold mb-6 text-soft-teal">
                Quizzes Created By Me
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {myQuizes.length === 0 ? (
                    <p className="text-gray-300">No quiz created by me yet.</p>
                ) : (
                    myQuizes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-gray-800 p-6 rounded-lg border border-soft-teal transition transform hover:scale-105 shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-neon-blue mb-3">
                                {quiz.title}
                            </h3>
                            <p className="text-gray-300 mb-4">
                                {quiz.description}
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() =>
                                        navigate(`/questions/${quiz.id}`)
                                    }
                                    className="bg-soft-teal text-black px-6 py-2 rounded-lg text-lg font-medium hover:bg-muted-purple transition"
                                >
                                    Open Quiz
                                </button>
                                <button
                                    onClick={() => handleDeleteQuiz(quiz.id)}
                                    className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-red-800 transition"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Shared Quizzes Section */}
            <h2 className="text-3xl font-semibold mb-6 text-soft-teal mt-12">
                Quizzes Shared With Me
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sharedQuizes.length === 0 ? (
                    <p className="text-gray-300">
                        No shared quizzes available.
                    </p>
                ) : (
                    sharedQuizes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-gray-800 p-6 rounded-lg border border-soft-teal transition transform hover:scale-105 shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-neon-blue mb-3">
                                {quiz.title}
                            </h3>
                            {/* <h3 className="text-xl font-semibold text-neon-blue mb-3">
                                {getMeTheEmail(quiz.userId)}
                            </h3> */}

                            <p className="text-gray-300 mb-4">
                                {quiz.description}
                            </p>
                            <div className="flex gap-4">
                                <button
                                    disabled
                                    onClick={() =>
                                        navigate(`/questions/${quiz.id}`)
                                    }
                                    className="bg-soft-teal text-black px-6 py-2 rounded-lg text-lg font-medium hover:bg-muted-purple transition"
                                >
                                    Play Quiz
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyQuizes;
