import { useState } from "react";

import api from "../services/api";

import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.data.token
            );

            setMessage("Login successful ✅");

            navigate("/dashboard");

            console.log(response.data);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
                    Chronos Login
                </h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-purple-500"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-purple-500"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold"
                    >
                        Login
                    </button>

                </form>

                {
                    message && (

                        <p className="mt-4 text-center text-sm">
                            {message}
                        </p>

                    )
                }

            </div>

        </div>

    );

}

export default Login;