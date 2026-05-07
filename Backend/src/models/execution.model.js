import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Job } from "./job.model.js";

export const Execution = sequelize.define('Execution', {
    executionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobId: {
        type: DataTypes.INTEGER,
        references: {
            model: Job,
            key: "jobId",
        },
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "running", "success", "failed", "retrying"),
        allowNull: false,
        defaultValue: "pending",
    },
    retryCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    attempt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    startedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    errorSummary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    durationMs: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: true,
    indexes: [
        { fields: ["jobId"] },
        { fields: ["status"] }
    ],
    hooks: {
        beforeSave: (execution) => {
            if (execution.startedAt && execution.completedAt) {
                execution.durationMs =
                    new Date(execution.completedAt) - new Date(execution.startedAt);
            }
        }
    }
});

Job.hasMany(Execution, { foreignKey: "jobId", onDelete: "CASCADE" });
Execution.belongsTo(Job, { foreignKey: "jobId" });