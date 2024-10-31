import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profileImage: "",
    });

    const navigate = useNavigate();

    // Load user data from local storage on component mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("meraGrahak")) || {};
        const storedProfileImage = localStorage.getItem("profileImage");
        setUserData({
            name: storedUser.name || "",
            email: storedUser.email || "visitor@gmail.com",
            profileImage:
                storedProfileImage ||
                "https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png",
        });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserData((prevState) => ({
                ...prevState,
                profileImage: reader.result,
            }));
            // Save the profile image to local storage
            localStorage.setItem("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const saveProfile = () => {
        if (!isValidEmail(userData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        toast.success("Changes Saved Successfully");
        const storedUser = JSON.parse(localStorage.getItem("meraGrahak")) || {};
        storedUser.name = userData.name;
        storedUser.email = userData.email;
        localStorage.setItem("meraGrahak", JSON.stringify(storedUser));
        setTimeout(() => {
            navigate("/main");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-12">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl rounded-xl border-2 border-soft-teal p-8 w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-soft-teal text-center">
                    Profile
                </h2>

                {/* Profile Image */}
                <div className="flex justify-center">
                    <img
                        src={
                            userData.profileImage ||
                            "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-2 border-soft-teal"
                    />
                </div>

                {/* Upload Image */}
                <div className="mt-4">
                    <label className="block text-soft-teal mb-2">
                        Change Profile Image
                    </label>
                    <input
                        type="file"
                        accept=".png, .svg"
                        onChange={handleImageChange}
                        className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg"
                    />
                </div>

                {/* Name Input */}
                <div>
                    <label className="block text-soft-teal mb-2">
                        Nickname
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Nickname"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg"
                    />
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-soft-teal mb-2">Email</label>
                    <input
                        placeholder="Enter Your Email"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg"
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={saveProfile}
                    className="w-full bg-soft-teal text-black px-6 py-3 rounded-lg hover:bg-muted-purple hover:text-white transition duration-300"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Profile;
