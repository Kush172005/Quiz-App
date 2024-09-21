import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Confetti = ({ isExploding }) => {
    return (
        <>
            <div className="flex justify-center">
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
