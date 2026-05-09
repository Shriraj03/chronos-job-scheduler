import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { User }
from "../models/user.model.js";

export const register =
  async (req, res) => {

    try {

      const {

        firstName,

        lastName,

        email,

        password,

      } = req.body;

      const existingUser =
        await User.findOne({

          where: { email },

        });

      if (existingUser) {

        return res.status(400).json({

          success: false,

          message:
            "Email already exists",

        });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({

          firstName,

          lastName,

          email,

          passwordHash:
            hashedPassword,

        });

      res.status(201).json({

        success: true,

        message:
          "User registered successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

export const login =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({

          where: { email },

        });

      if (!user) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }

      const isMatch =
        await bcrypt.compare(

          password,

          user.passwordHash

        );

      if (!isMatch) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid credentials",

        });

      }

      const token =
        jwt.sign(

          {

            userId:
              user.userId,

            email:
              user.email,

          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "1d",

          }

        );

      res.status(200).json({

        success: true,

        token,

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };