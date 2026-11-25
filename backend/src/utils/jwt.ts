import { Types } from "mongoose";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";


// dibuat sebagai interface untuk menghapus beberapa properti dari User model, seperti password, activationCode, isActive, email, fullname, profilePicture, dan username. Properti id ditambahkan sebagai optional karena akan digunakan untuk menyimpan ObjectId dari user yang diambil dari database.
export interface IUserToken extends Omit<
  User,
  | "password"
  | "activationCode"
  | "isActive"
  | "email"
  | "fullname"
  | "profilePicture"
  | "username"
> {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
  const SECRET = process.env.SECRET as string;
  const token = jwt.sign(user, SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const getuserData = (token: string) => {
  const SECRET = process.env.SECRET as string;
  const user = jwt.verify(token, SECRET) as IUserToken;
  return user;
};
