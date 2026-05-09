import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import api from "../services/api";

import toast from "react-hot-toast";

function Register() {

    const navigate =
        useNavigate();

    const [firstName,
        setFirstName] =
        useState("");

    const [lastName,
        setLastName] =
        useState("");

    const [email,
        setEmail] =
        useState("");

    const [password,
        setPassword] =
        useState("");

    const handleRegister =
        async (e) => {

            e.preventDefault();

            try {

                await api.post(

                    "/auth/register",

                    {

                        firstName,

                        lastName,

                        email,

                        password,

                    }

                );

                toast.success(
                    "Registration successful"
                );

                navigate("/");

            } catch (error) {

                console.log(error);

                toast.error(

                    error.response?.data?.message ||

                    "Registration failed"

                );

            }

        };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
                    Create Account
                </h1>

                <form
                    onSubmit={handleRegister}
                    className="space-y-5"
                >

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) =>
                                setLastName(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                            required
                        />

                    </div>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-semibold"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center text-gray-500 mt-6">

                    Already have an account?

                    {" "}

                    <Link
                        to="/"
                        className="text-purple-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;