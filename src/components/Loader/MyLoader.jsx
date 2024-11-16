import React from "react";
import { ThreeDots } from "react-loader-spinner";

const MyLoader = () => {
    return (
        <div className="min-h-screen bg-gray-900 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="90"
                    color="#64d2b3"
                    radius="10"
                    ariaLabel="three-dots-loading"
                />
            </div>
        </div>
    );
};

export default MyLoader;
