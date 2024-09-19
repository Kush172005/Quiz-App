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
        <>
            <div className="flex justify-center">
                <button
                    onClick={triggerConfetti}
                    className="border-2 border-soft-teal text-soft-teal bg-gradient-to-r from-gray-800 to-gray-900 text-black px-4 py-2 rounded-lg hover:text-white transition duration-300"
                >
                    🎉 Celebrate
                </button>

                {isExploding && (
                    <div className="fixed inset-0 flex items-start justify-center mt-10 z-50">
                        <ConfettiExplosion
                            force={0.6}
                            duration={2500}
                            particleCount={220}
                            width={1500}
                            colors={[
                                "#64d2b3",
                                "#9180c2",
                                "#FF4081",
                                "#00B8D9",
                            ]} // Your custom colors
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Confetti;
