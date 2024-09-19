import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("meraGrahak");
        if (savedUser) {
            login();
            navigate("/main");
        }
    }, [navigate, login]);

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const userData = { email, password };
        localStorage.setItem("meraGrahak", JSON.stringify(userData));
        navigate("/main");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-soft-teal text-center">
                    Signup
                </h2>
                <form onSubmit={handleSignup} className="space-y-4">
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
                    <div>
                        <label className="block text-soft-teal mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-teal"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-soft-teal text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300"
                    >
                        Signup
                    </button>
                    <div className="flex justify-evenly">
                        <p>Already Have an account ?</p>
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
    );
};

export default Signup;
