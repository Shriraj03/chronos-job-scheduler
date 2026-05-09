import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

import Sidebar from "../components/Sidebar";

function Executions() {

    const { jobId } =
        useParams();

    const [executions,
        setExecutions] =
        useState([]);

    const [logs,
        setLogs] =
        useState([]);

    const [selectedExecution,
        setSelectedExecution] =
        useState(null);

    const fetchExecutions =
        async () => {

            try {

                const response =
                    await api.get(

                        `/jobs/${jobId}/executions`

                    );

                setExecutions(

                    response.data.executions

                );

            } catch (error) {

                console.log(error);

            }

        };

    const fetchLogs =
        async (executionId) => {

            try {

                const response =
                    await api.get(

                        `/jobs/executions/${executionId}/logs`

                    );

                setLogs(
                    response.data.logs
                );

                setSelectedExecution(
                    executionId
                );

            } catch (error) {

                console.log(error);

            }

        };

    useEffect(() => {

        fetchExecutions();

        const interval =
            setInterval(() => {

                fetchExecutions();

            }, 5000);

        return () =>
            clearInterval(interval);

    }, []);

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Execution Timeline
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Monitor execution history and retries
                    </p>

                </div>

                {
                    executions.length === 0 && (

                        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

                            <h2 className="text-2xl font-bold text-gray-700 mb-2">
                                No Executions Yet
                            </h2>

                            <p className="text-gray-500">
                                Executions will appear here 🚀
                            </p>

                        </div>

                    )
                }

                <div className="space-y-6">

                    {
                        executions.map(
                            (execution) => (

                                <div
                                    key={
                                        execution.executionId
                                    }
                                    className="bg-white rounded-2xl shadow-md p-6 border-l-8 transition hover:shadow-xl"

                                    style={{

                                        borderColor:

                                            execution.status === "success"

                                                ? "#22c55e"

                                                : execution.status === "failed"

                                                    ? "#ef4444"

                                                    : "#3b82f6",

                                    }}
                                >

                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                                        <div>

                                            <div className="flex items-center gap-3 mb-3 flex-wrap">

                                                <span
                                                    className={

                                                        execution.status === "success"

                                                            ? "bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold"

                                                            : execution.status === "failed"

                                                                ? "bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold"

                                                                : "bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold"

                                                    }
                                                >

                                                    {
                                                        execution.status
                                                    }

                                                </span>

                                                <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold">

                                                    Retry:
                                                    {" "}
                                                    {
                                                        execution.retryCount
                                                    }

                                                </span>

                                            </div>

                                            <h2 className="text-xl font-bold text-gray-800">

                                                Execution ID:
                                                {" "}

                                                {
                                                    execution.executionId
                                                }

                                            </h2>

                                            {

                                                execution.errorSummary && (

                                                    <p className="text-red-500 mt-2">

                                                        {
                                                            execution.errorSummary
                                                        }

                                                    </p>

                                                )

                                            }

                                        </div>

                                        <div className="text-sm text-gray-500 space-y-2">

                                            <p>

                                                <span className="font-semibold">
                                                    Started:
                                                </span>

                                                {" "}

                                                {

                                                    execution.startedAt

                                                        ? new Date(
                                                            execution.startedAt
                                                        ).toLocaleString()

                                                        : "-"

                                                }

                                            </p>

                                            <p>

                                                <span className="font-semibold">
                                                    Completed:
                                                </span>

                                                {" "}

                                                {

                                                    execution.completedAt

                                                        ? new Date(
                                                            execution.completedAt
                                                        ).toLocaleString()

                                                        : "-"

                                                }

                                            </p>

                                            <button
                                                onClick={() =>
                                                    fetchLogs(
                                                        execution.executionId
                                                    )
                                                }
                                                className="mt-3 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                                            >
                                                View Logs
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

                {
                    selectedExecution && (

                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl max-h-[80vh] overflow-y-auto">

                                <div className="flex justify-between items-center mb-6">

                                    <h2 className="text-3xl font-bold text-gray-800">
                                        Execution Logs
                                    </h2>

                                    <button
                                        onClick={() => {
                                            setSelectedExecution(null);
                                            setLogs([]);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Close
                                    </button>

                                </div>

                                {
                                    logs.length === 0 && (

                                        <p className="text-gray-500">
                                            No logs found.
                                        </p>

                                    )
                                }

                                <div className="space-y-4">

                                    {
                                        logs.map((log) => (

                                            <div
                                                key={log.logId}
                                                className="border rounded-xl p-4 bg-gray-50"
                                            >

                                                <div className="flex justify-between items-center mb-2 flex-wrap gap-2">

                                                    <span
                                                        className={
                                                            log.level === "error"
                                                                ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold"
                                                                : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
                                                        }
                                                    >
                                                        {log.level}
                                                    </span>

                                                    <span className="text-sm text-gray-500">
                                                        {
                                                            new Date(
                                                                log.createdAt
                                                            ).toLocaleString()
                                                        }
                                                    </span>

                                                </div>

                                                <p className="text-gray-800 font-medium">
                                                    {log.message}
                                                </p>

                                            </div>

                                        ))
                                    }

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default Executions;