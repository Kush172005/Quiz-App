import React, { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Confetti = () => {
    const [isExploding, setIsExploding] = useState(false);

    const triggerConfetti = () => {
        setIsExploding(true);
        setTimeout(() => {
            setIsExploding(false);
        }, 2500);
    };

    return (
        <div className="relative">
            {isExploding && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <ConfettiExplosion
                        force={0.6}
                        duration={2500}
                        particleCount={80}
                        width={1000}
                        colors={["#64d2b3", "#9180c2", "#FF4081", "#00B8D9"]}
                    />
                </div>
            )}
            <button
                onClick={triggerConfetti}
                className="bg-soft-teal text-black px-4 py-2 rounded-lg hover:text-white transition duration-300"
            >
                Celebrate
            </button>
        </div>
    );
};

export default Confetti;
