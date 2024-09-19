import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfettiExplosion from "react-confetti-explosion";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
    const [isExploding, setIsExploding] = useState(false);

    const triggerConfetti = () => {
        setIsExploding(true);
        setTimeout(() => {
            setIsExploding(false);
        }, 2500); 
    };

    return (
        <>
            <App triggerConfetti={triggerConfetti} />
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
            />

            {isExploding && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <ConfettiExplosion
                        force={0.6}
                        duration={2500}
                        particleCount={220}
                        width={1500}
                        colors={["#64d2b3", "#9180c2", "#FF4081", "#00B8D9"]}
                    />
                </div>
            )}
        </>
    );
};

root.render(<Index />);
