import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSignup } from "../../api/auth";
import MyLoader from "../Loader/MyLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const response = await userSignup({ name, email, password });

            const data = await response.json();

            if (response.ok) {
                toast.success("Signup Successful");
                navigate("/login");
            } else {
                toast.error(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Failed to signup. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {loading ? (
                <MyLoader />
            ) : (
                <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-md space-y-6">
                        <h2 className="text-3xl font-bold text-soft-teal text-center">
                            Signup
                        </h2>
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="block text-soft-teal mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
                                />
                            </div>
                            <div>
                                <label className="block text-soft-teal mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-soft-teal mb-2">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal pr-12" // Add padding on the right for the icon
                                    autoComplete="password"
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 mt-4 cursor-pointer text-gray-600 text-xl"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-soft-teal text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300"
                            >
                                Signup
                            </button>
                            <div className="flex justify-evenly">
                                <p>Already have an account?</p>
                                <span
                                    onClick={() => navigate("/login")}
                                    className="text-soft-teal cursor-pointer"
                                >
                                    Login
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup;
