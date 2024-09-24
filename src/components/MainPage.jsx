import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const MainPage = () => {
    const navigate = useNavigate();

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative min-h-screen bg-gray-900 text-white">
            {/* Fixed Background Animation */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-soft-teal to-muted-purple opacity-25 animate-pulse"></div>

            {/* Main Content Section */}
            <header className="relative w-full min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col items-center justify-center text-center space-y-6 z-10">
                {/* Title and Overview */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    <h1 className="text-6xl font-extrabold text-soft-teal">
                        Welcome to QuizMaster
                    </h1>
                    <p className="text-2xl mt-6 text-gray-400">
                        Your ultimate destination for engaging quizzes and fun
                        learning!
                    </p>
                </motion.div>

                {/* Animated Highlights Section */}
                <motion.div
                    className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 z-10"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1.5 }}
                >
                    {/* Feature 1 */}
                    <motion.div
                        className="bg-gray-800 p-8 rounded-xl border border-soft-teal hover:bg-muted-purple-h transition-all duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-2xl font-semibold text-soft-teal">
                            Create Custom Quizzes
                        </h3>
                        <p className="text-gray-400 mt-4">
                            Easily create your own quizzes and challenge your
                            friends with our user-friendly quiz creation tool.
                        </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        className="bg-gray-800 p-8 rounded-xl border border-soft-teal hover:bg-muted-purple-h transition-all duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-2xl font-semibold text-soft-teal">
                            Fun Learning Experience
                        </h3>
                        <p className="text-gray-400 mt-4">
                            Explore a wide range of quizzes in various
                            categories, and make learning an enjoyable
                            experience.
                        </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        className="bg-gray-800 p-8 rounded-xl border border-soft-teal hover:bg-muted-purple-h transition-all duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-2xl font-semibold text-soft-teal">
                            Track Your Progress
                        </h3>
                        <p className="text-gray-400 mt-4">
                            Keep track of your quiz results and progress with
                            our personalized dashboard.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Additional Feature Row */}
                <motion.div
                    className="flex max-sm:flex-wrap justify-evenly px-14 gap-8 mt-12 z-10"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1.5 }}
                >
                    {/* Feature 4 */}
                    <motion.div
                        className="bg-gray-800 p-8 rounded-xl border border-soft-teal hover:bg-muted-purple-h transition-all duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-2xl font-semibold text-soft-teal">
                            Real-Time Leaderboards
                        </h3>
                        <p className="text-gray-400 mt-4">
                            Compete with friends and see your ranking in
                            real-time after completing quizzes.
                        </p>
                    </motion.div>

                    {/* Feature 5 */}
                    <motion.div
                        className="bg-gray-800 p-8 rounded-xl border border-soft-teal hover:bg-muted-purple-h transition-all duration-300 ease-in-out transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-2xl font-semibold text-soft-teal">
                            Fully Responsive Design
                        </h3>
                        <p className="text-gray-400 mt-4">
                            Enjoy a seamless experience on any device, whether
                            you're on mobile, tablet, or desktop.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="mt-12 z-10"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.8, duration: 1.5 }}
                >
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-soft-teal text-black px-8 py-4 rounded-lg text-2xl font-semibold hover:bg-muted-purple hover:text-white transition duration-300"
                    >
                        Get Started!
                    </button>
                </motion.div>

                {/* Floating Shapes */}
                <motion.div
                    className="absolute z-0 top-1/4 left-1/4 w-80 h-80 bg-soft-teal opacity-25 rounded-full blur-[120px] animate-pulse"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2 }}
                ></motion.div>

                <motion.div
                    className="absolute z-0 top-1/4 right-1/4 w-80 h-80 bg-muted-purple opacity-25 rounded-full blur-[120px] animate-pulse"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2 }}
                ></motion.div>
            </header>

            {/* About Section */}
            <motion.section
                className="py-16 px-8 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-soft-teal">
                        Why Choose QuizMaster?
                    </h2>
                    <p className="text-gray-400 mt-6 text-lg">
                        We offer the best tools for creating, sharing, and
                        tracking quizzes. Whether you're an educator, a student,
                        or just someone looking for fun, QuizMaster provides
                        everything you need.
                    </p>
                </div>
            </motion.section>
        </div>
    );
};

export default MainPage;
