import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
    return (
        <AuthProvider>
            <Router>
                <App />
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnHover
                />
            </Router>
        </AuthProvider>
    );
};

root.render(<Index />);
