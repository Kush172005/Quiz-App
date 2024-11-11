import React, { useState } from "react";
import { createQuiz } from "../api/quiz";
import { toast } from "react-toastify";

const CreateQuiz = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [accessType, setAccessType] = useState("private");
    const [restrictedEmail, setRestrictedEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem("authToken");

            const payload = {
                accessToken,
                title,
                description,
                accessType,
                accessTo: restrictedEmail.split(","),
            };

            const response = await createQuiz(payload);
            if (response.ok) {
                toast.success("Quiz Created Successfully");
            } else {
                toast.error("Quiz Creation Failed");
                console.log(response);
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-4xl space-y-6">
                <h2 className="text-3xl font-bold text-soft-teal text-center mb-6">
                    Create a New Quiz
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Quiz Title"
                            className="w-full p-3 bg-gray-800 border border-soft-teal rounded-lg text-white placeholder-[#9180c2] focus:outline-none focus:ring-2 focus:ring-soft-teal"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter quiz description"
                            rows="4"
                            className="w-full p-3 bg-gray-800 text-white border border-soft-teal rounded-lg placeholder-[#9180c2] focus:outline-none focus:ring-2 focus:ring-soft-teal"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-soft-teal mb-2">
                            Select Access Type:
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="private"
                                    checked={accessType === "private"}
                                    onChange={() => setAccessType("private")}
                                    className="mr-2"
                                />
                                Private (Only for me)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="public"
                                    checked={accessType === "public"}
                                    onChange={() => setAccessType("public")}
                                    className="mr-2"
                                />
                                Public (Accessible to everyone)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="restricted"
                                    checked={accessType === "restricted"}
                                    onChange={() => setAccessType("restricted")}
                                    className="mr-2"
                                />
                                Restricted (Accessible only to specific user)
                            </label>
                        </div>
                    </div>

                    {accessType === "restricted" && (
                        <div className="mb-6">
                            <input
                                type="email"
                                value={restrictedEmail}
                                onChange={(e) =>
                                    setRestrictedEmail(e.target.value)
                                }
                                placeholder="Enter user's email for restricted access"
                                className="w-full p-3 bg-gray-800 border border-soft-teal rounded-lg text-white placeholder-[#9180c2] focus:outline-none focus:ring-2 focus:ring-soft-teal"
                                required
                            />
                        </div>
                    )}

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full bg-soft-teal text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300"
                        >
                            Submit Quiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuiz;
