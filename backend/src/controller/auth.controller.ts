import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";

type TRegister = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  identifier: string;
  password: string;
};

const registerValidateSchema = Yup.object({
  fullname: Yup.string().required("Fullname is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export default {
  register: async (req: Request, res: Response) => {
    const { fullname, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate({
        fullname,
        username,
        email,
        password,
        confirmPassword,
      });

      const result = await UserModel.create({
        fullname,
        username,
        email,
        password,
      });

      res.status(200).json({
        app_version: process.env.APP_VERSION,
        message: "Successfully registered",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        app_version: process.env.APP_VERSION,
        message: err.message,
        data: null,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      // ambil data user based by identifier -> email or username
      const { identifier, password } = req.body as unknown as TLogin;
      const userByIdentifier = await UserModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      });

      if (!userByIdentifier) {
        return res.status(403).json({
          app_version: process.env.APP_VERSION,
          message: "User not found",
          data: null,
        });
      }

      // validasi password
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        return res.status(403).json({
          app_version: process.env.APP_VERSION,
          message: "Invalid password",
          data: null,
        });
      }

      return res.status(200).json({
        app_version: process.env.APP_VERSION,
        message: "Login successful",
        data: userByIdentifier,
      });
      
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        app_version: process.env.APP_VERSION,
        message: err.message,
        data: null,
      });
    }
  },
};
