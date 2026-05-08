import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {

    PieChart,

    Pie,

    Cell,

    Tooltip,

    ResponsiveContainer,

} from "recharts";

function Dashboard() {

    const [jobs, setJobs] =
        useState([]);

    const [stats, setStats] =
        useState({});

    const [searchTerm,
        setSearchTerm] =
        useState("");

    const [filterStatus,
        setFilterStatus] =
        useState("all");

    const chartData = [

        {

            name: "Success",

            value:
                stats.successExecutions || 0,

        },

        {

            name: "Failed",

            value:
                stats.failedExecutions || 0,

        },

    ];

    const filteredJobs =
        jobs.filter((job) => {

            const matchesSearch =
                job.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            const matchesFilter =

                filterStatus === "all"

                    ? true

                    : filterStatus === "active"

                        ? job.isActive

                        : !job.isActive;

            return (
                matchesSearch &&
                matchesFilter
            );

        });

    const [editingJob,
        setEditingJob] =
        useState(null);

    const [formData,
        setFormData] =
        useState({

            title: "",

            description: "",

            retryLimit: 1,

        });

    const fetchJobs = async () => {

        try {

            const response =
                await api.get("/jobs");

            setJobs(response.data.jobs);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchStats = async () => {

        try {

            const response =
                await api.get(
                    "/jobs/stats/overview"
                );

            setStats(
                response.data.stats
            );

        } catch (error) {

            console.log(error);

        }

    };

    const toggleJobStatus =
        async (jobId) => {

            try {

                await api.patch(
                    `/jobs/${jobId}/toggle`
                );

                toast.success(
                    "Job status updated"
                );

                fetchJobs();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to update job"
                );

            }

        };

    const deleteJob =
        async (jobId) => {

            const confirmDelete =
                window.confirm(
                    "Delete this job?"
                );

            if (!confirmDelete)
                return;

            try {

                await api.delete(
                    `/jobs/${jobId}`
                );

                toast.success(
                    "Job deleted"
                );

                fetchJobs();

                fetchStats();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Delete failed"
                );

            }

        };

    const openEditModal =
        (job) => {

            setEditingJob(job);

            setFormData({

                title:
                    job.title,

                description:
                    job.description,

                retryLimit:
                    job.retryLimit,

            });

        };

    const updateJob =
        async () => {

            try {

                await api.put(

                    `/jobs/${editingJob.jobId}`,

                    formData

                );

                toast.success(
                    "Job updated"
                );

                setEditingJob(null);

                fetchJobs();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Update failed"
                );

            }

        };

    useEffect(() => {

        fetchJobs();

        fetchStats();

        const interval = setInterval(() => {

            fetchJobs();

            fetchStats();

        }, 5000);

        return () =>
            clearInterval(interval);

    }, []);

    return (

        <div className="flex bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Monitor and manage your scheduled jobs
                        </p>

                    </div>

                    <Link
                        to="/create-job"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-md"
                    >
                        + Create Job
                    </Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-gray-500">
                            Total Jobs
                        </h2>

                        <p className="text-4xl font-bold text-purple-600 mt-2">
                            {stats.totalJobs || 0}
                        </p>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-gray-500">
                            Successful Runs
                        </h2>

                        <p className="text-4xl font-bold text-green-600 mt-2">
                            {stats.successExecutions || 0}
                        </p>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-gray-500">
                            Failed Runs
                        </h2>

                        <p className="text-4xl font-bold text-red-600 mt-2">
                            {stats.failedExecutions || 0}
                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 mb-10">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Execution Analytics
                    </h2>

                    <div className="h-[350px] mb-8">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie

                                    data={chartData}

                                    dataKey="value"

                                    outerRadius={120}

                                    label

                                >

                                    <Cell fill="#22c55e" />

                                    <Cell fill="#ef4444" />

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="flex flex-col md:flex-row gap-4">

                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                            className="flex-1 border border-gray-300 rounded-xl p-3 outline-none focus:border-purple-500"
                        />

                        <select
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(
                                    e.target.value
                                )
                            }
                            className="border border-gray-300 rounded-xl p-3 outline-none focus:border-purple-500"
                        >

                            <option value="all">
                                All Jobs
                            </option>

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {
                        filteredJobs.map((job) => (

                            <div
                                key={job.jobId}
                                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
                            >

                                <div className="flex justify-between items-start mb-4">

                                    <div>

                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {job.title}
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            {job.description}
                                        </p>

                                    </div>

                                    <div className="flex flex-col items-end gap-2">

                                        <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                                            Retry:
                                            {" "}
                                            {job.retryLimit}
                                        </span>

                                        <span
                                            className={
                                                job.isActive
                                                    ? "bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                                                    : "bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full"
                                            }
                                        >
                                            <span
                                                className={

                                                    job.status === "completed"

                                                        ? "bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"

                                                        : job.status === "failed"

                                                            ? "bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full"

                                                            : job.status === "running"

                                                                ? "bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"

                                                                : job.status === "paused"

                                                                    ? "bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"

                                                                    : "bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full"

                                                }
                                            >

                                                {
                                                    job.status
                                                }

                                            </span>
                                            {
                                                job.isActive
                                                    ? "Active"
                                                    : "Inactive"
                                            }

                                        </span>

                                    </div>

                                </div>

                                <div className="mt-6 flex justify-between items-center">

                                    <span className="text-sm text-gray-400">
                                        Job ID:
                                        {" "}
                                        {job.jobId}
                                    </span>

                                    <Link
                                        to={`/jobs/${job.jobId}/executions`}
                                        className="text-purple-600 font-semibold hover:underline"
                                    >
                                        Executions →
                                    </Link>

                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-4">

                                    <button
                                        onClick={() =>
                                            toggleJobStatus(
                                                job.jobId
                                            )
                                        }
                                        className={
                                            job.isActive
                                                ? "bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                                                : "bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                                        }
                                    >

                                        {
                                            job.isActive
                                                ? "Pause"
                                                : "Resume"
                                        }

                                    </button>

                                    <button
                                        onClick={() =>
                                            openEditModal(
                                                job
                                            )
                                        }
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteJob(
                                                job.jobId
                                            )
                                        }
                                        className="col-span-2 bg-gray-800 hover:bg-black text-white py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

                {
                    editingJob && (

                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                            <div className="bg-white p-8 rounded-2xl w-full max-w-md">

                                <h2 className="text-2xl font-bold mb-6">
                                    Edit Job
                                </h2>

                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-3 rounded-lg mb-4"
                                />

                                <textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-3 rounded-lg mb-4"
                                />

                                <input
                                    type="number"
                                    placeholder="Retry Limit"
                                    value={formData.retryLimit}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            retryLimit:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-3 rounded-lg mb-6"
                                />

                                <div className="flex gap-3">

                                    <button
                                        onClick={
                                            updateJob
                                        }
                                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() =>
                                            setEditingJob(
                                                null
                                            )
                                        }
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-lg"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default Dashboard;