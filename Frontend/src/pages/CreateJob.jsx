import { useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";

import toast from "react-hot-toast";

function CreateJob() {

    const [title, setTitle] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [retryLimit,
        setRetryLimit] =
        useState(1);

    const [runAt, setRunAt] =
        useState("");

    const [cron, setCron] =
        useState("");

    const [jobType,
        setJobType] =
        useState("one-time");

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

                        runAt:
                            jobType ===
                                "one-time"

                                ? runAt

                                : null,

                        cron:
                            jobType ===
                                "recurring"

                                ? cron

                                : null,

                        timezone:
                            "Asia/Kolkata",

                    }
                );

                toast.success(
                    "Job created"
                );

                setTitle("");

                setDescription("");

                setRetryLimit(1);

                setRunAt("");

                setCron("");

            } catch (error) {

                console.log(error);

                toast.error(
                    "Create failed"
                );

            }

        };

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <div className="bg-white rounded-2xl shadow-md p-10 max-w-2xl mx-auto">

                    <h1 className="text-4xl font-bold text-purple-600 mb-8">
                        Create Job
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <input
                            type="text"
                            placeholder="Job Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                            required
                        />

                        <textarea
                            placeholder="Job Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                        />

                        <input
                            type="number"
                            placeholder="Retry Limit"
                            value={retryLimit}
                            onChange={(e) =>
                                setRetryLimit(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                        />

                        <select
                            value={jobType}
                            onChange={(e) =>
                                setJobType(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                        >

                            <option value="one-time">
                                One Time Job
                            </option>

                            <option value="recurring">
                                Recurring Job
                            </option>

                        </select>

                        {
                            jobType ===
                                "one-time" && (

                                    <input
                                        type="datetime-local"
                                        value={runAt}
                                        onChange={(e) =>
                                            setRunAt(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                                        required
                                    />

                                )
                        }

                        {
                            jobType ===
                                "recurring" && (

                                    <input
                                        type="text"
                                        placeholder="Cron Expression (Example: */1 * * * *)"
                                        value={cron}
                                        onChange={(e) =>
                                            setCron(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500"
                                        required
                                    />

                                )
                        }

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-semibold"
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