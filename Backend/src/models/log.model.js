import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { Execution } from "./execution.model.js";

export const Log = sequelize.define('Log', {
    logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    executionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Execution,
            key: "executionId",
        },
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM("info", "warning", "error"),
        allowNull: false,
    },
    meta: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: true
});

Execution.hasMany(Log, { foreignKey: "executionId", onDelete: "CASCADE" });
Log.belongsTo(Execution, { foreignKey: "executionId" });