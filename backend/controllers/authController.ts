import { Request, Response } from "express";
import { User } from "../models/User";
import fsPromises from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) res.status(400).json({ message: "Email is required" });

    const userExist = await User.findOne({ where: { email } });
    if (userExist)
      return res.status(200).json({ msg: "User exists, proceed to login" });

    await User.create({ email });
    const jwtSecret = process.env.TOKEN;
    if (!jwtSecret)
      return res.status(500).json({ error: "JWT secret not configured" });

    const token = jwt.sign({ email }, jwtSecret);
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const setPassword = async (req: Request, res: Response) => {
  try {
    const userEmail = (req.user as { email?: string })?.email;
    const verifiedUser = await User.findOne({ where: { email: userEmail } });
    if (!verifiedUser) return res.status(401).json({ message: "Unauthorized from authcontroller line36" });

    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      res.status(400).json({ message: "Password do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    verifiedUser.password = hashedPassword;
    await verifiedUser.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const setProfile = async (req: Request, res: Response) => {
  try {
    const userEmail = (req.user as { email?: string })?.email;
    const verifiedUser = await User.findOne({ where: { email: userEmail } });
    if (!verifiedUser) return res.sendStatus(401);

    const { firstName, lastName } = req.body;
    verifiedUser.firstName = firstName;
    verifiedUser.lastName = lastName;
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const enterPassword = async (req: Request, res: Response) => {
  try {
    const userEmail = (req.user as { email?: string })?.email;
    const verifiedUser = await User.findOne({ where: { email: userEmail } });
    if (!verifiedUser) return res.sendStatus(401);

    const { password } = req.body;
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    await bcrypt.compare(password, verifiedUser.password)? res.status(200).json({ message: "Login successful" }): res.sendStatus(401);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
