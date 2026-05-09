import { useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function CreateJob() {

    const navigate =
        useNavigate();

    const [title,
        setTitle] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [retryLimit,
        setRetryLimit] =
        useState(1);

    const [cron,
        setCron] =
        useState("");

    const [runAt,
        setRunAt] =
        useState("");

    const cronOptions = {

        "Every Minute":
            "* * * * *",

        "Every 5 Minutes":
            "*/5 * * * *",

        "Every Hour":
            "0 * * * *",

        "Every Day":
            "0 0 * * *",

    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await api.post(

                    "/jobs",

                    {

                        title,

                        description,

                        retryLimit,

                        cron,

                        runAt:
                            runAt || null,

                        timezone:
                            "Asia/Kolkata",

                    }

                );

                toast.success(
                    "Job created successfully"
                );

                navigate(
                    "/dashboard"
                );

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to create job"
                );

            }

        };

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-10">

                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        Create Job
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">
                                Job Title
                            </label>

                            <input
                                type="text"
                                placeholder="Enter job title"
                                value={title}
                                onChange={(e) =>
                                    setTitle(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                                required
                            />

                        </div>

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">
                                Description
                            </label>

                            <textarea
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                                rows="4"
                            />

                        </div>

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">
                                Retry Limit
                            </label>

                            <input
                                type="number"
                                value={retryLimit}
                                onChange={(e) =>
                                    setRetryLimit(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                                min="1"
                            />

                        </div>

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">
                                Recurring Schedule
                            </label>

                            <select

                                value={cron}

                                onChange={(e) =>
                                    setCron(
                                        e.target.value
                                    )
                                }

                                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"

                            >

                                <option value="">
                                    Select Schedule
                                </option>

                                {

                                    Object.entries(
                                        cronOptions
                                    ).map(

                                        ([label, value]) => (

                                            <option
                                                key={value}
                                                value={value}
                                            >

                                                {label}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">
                                Run At (One-Time Job)
                            </label>

                            <input
                                type="datetime-local"
                                value={runAt}
                                onChange={(e) =>
                                    setRunAt(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-semibold transition"
                        >
                            Create Job
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default CreateJob;