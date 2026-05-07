import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

export const Job = sequelize.define('Job', {
    jobId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    retryLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3
    },
}, {
    timestamps: true
});
User.hasMany(Job, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Job.belongsTo(User, {
    foreignKey: "userId",
});