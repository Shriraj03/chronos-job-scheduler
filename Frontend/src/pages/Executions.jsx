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
                        Execution History
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Monitor all job executions
                    </p>

                </div>

                {
                    executions.length === 0 && (

                        <div className="bg-white rounded-2xl p-10 shadow-md text-center">

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
                                    className="bg-white rounded-2xl p-6 shadow-md"
                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h2 className="text-2xl font-bold text-gray-800">
                                                Execution
                                                {" "}
                                                #
                                                {
                                                    execution.executionId
                                                }
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                {
                                                    new Date(
                                                        execution.createdAt
                                                    ).toLocaleString()
                                                }
                                            </p>

                                        </div>

                                        <div className="flex flex-col items-end gap-2">

                                            <span
                                                className={
                                                    execution.status ===
                                                        "success"
                                                        ? "bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"
                                                        : "bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                                                }
                                            >

                                                {
                                                    execution.status
                                                }

                                            </span>

                                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">

                                                Retry:
                                                {" "}
                                                {
                                                    execution.retryCount
                                                }

                                            </span>

                                        </div>

                                    </div>

                                    <div className="mt-6 border-t pt-4">

                                        <p className="text-gray-700">

                                            <span className="font-semibold">
                                                Started:
                                            </span>

                                            {" "}

                                            {
                                                new Date(
                                                    execution.startedAt
                                                ).toLocaleString()
                                            }

                                        </p>

                                        <p className="text-gray-700 mt-2">

                                            <span className="font-semibold">
                                                Completed:
                                            </span>

                                            {" "}

                                            {
                                                execution.completedAt
                                                    ? new Date(
                                                        execution.completedAt
                                                    ).toLocaleString()
                                                    : "Running..."
                                            }

                                        </p>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default Executions;