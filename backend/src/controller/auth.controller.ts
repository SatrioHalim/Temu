import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";

type TRegister = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
        message: err.message,
        data: null,
      });
    }
  },
};
