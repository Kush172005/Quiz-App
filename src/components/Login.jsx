import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("meraGrahak");
        if (savedUser && !isAuthenticated) {
            login();
            navigate("/main");
        }
    }, [isAuthenticated, navigate, login]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "test@gmail.com" && password === "quiz@123") {
            toast.success("Login Successful");
            login();
            navigate("/main");
        } else {
            const storedUser = JSON.parse(localStorage.getItem("meraGrahak"));

            if (
                storedUser &&
                storedUser.email === email &&
                storedUser.password === password
            ) {
                toast.success("Login Successful");
                login();
                navigate("/main");
            } else {
                toast.error("Invalid credentials or user not registered");
            }
        }
    };

    const takeToMain = () => {
        setEmail("test@gmail.com");
        setPassword("quiz@123");
    };

    return (
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
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
                            />
                        </div>
                        <div>
                            <label className="block text-soft-teal mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
                            />
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
                <div className="flex gap-4">
                    <div>Want to get a quick look?</div>
                    <button onClick={takeToMain} className="text-soft-teal">
                        Click Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
