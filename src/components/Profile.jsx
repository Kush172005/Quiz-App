import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage") ||
            "https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png"
    );

    const [nickname, setNickname] = useState(user.name);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            localStorage.setItem("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const saveProfile = () => {
        setUser({ ...user, name: nickname });

        toast.success("Changes Saved Successfully");
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

                <div className="flex justify-center">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-2 border-soft-teal"
                    />
                </div>

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

                <div>
                    <label className="block text-soft-teal mb-2">
                        Nickname
                    </label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={handleNicknameChange}
                        className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-soft-teal mb-2">Email</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="w-full p-3 bg-gray-800 border border-soft-teal text-white rounded-lg"
                    />
                </div>

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
