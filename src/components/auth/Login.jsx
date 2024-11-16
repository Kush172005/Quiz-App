import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { userLogin } from "../../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MyLoader from "../Loader/MyLoader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/main");
        }
    }, [isAuthenticated, navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email) || !password) {
            toast.error("Please enter valid credentials");
            return;
        }

        setLoading(true);

        try {
            const response = await userLogin({ email, password });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                localStorage.setItem("authToken", data.token);
                setUser(data);
                setIsAuthenticated(true);
                navigate("/main");
            } else {
                toast.error(
                    data.message || "Invalid credentials or user not registered"
                );
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Failed to login. Please try again.");
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
                    <div className="flex flex-col gap-4 w-full items-center">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-md space-y-6">
                            <h2 className="text-3xl font-bold text-soft-teal text-center">
                                Login
                            </h2>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-soft-teal mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="block text-soft-teal mb-2">
                                        Password
                                    </label>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
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
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-soft-teal text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300"
                                >
                                    Login
                                </button>
                                <div className="flex justify-evenly">
                                    <p>Not Registered yet?</p>
                                    <span
                                        onClick={() => navigate("/signup")}
                                        className="text-soft-teal cursor-pointer"
                                    >
                                        Signup
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
