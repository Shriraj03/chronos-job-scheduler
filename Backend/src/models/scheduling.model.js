import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Job } from "./job.model.js";

export const Scheduling = sequelize.define('Scheduling', {
    scheduleId: {
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
    cron: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    runAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    nextRunAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    timezone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    indexes: [
        { fields: ["nextRunAt"] }
    ],
    validate: {
        cronOrRunAt() {
            if ((!this.cron && !this.runAt) || (this.cron && this.runAt)) {
                throw new Error("Provide either cron OR runAt, not both");
            }
        }
    }
});

Job.hasMany(Scheduling, { foreignKey: "jobId", onDelete: "CASCADE" });
Scheduling.belongsTo(Job, { foreignKey: "jobId" });