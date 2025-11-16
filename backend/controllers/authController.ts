import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signIn = async (req: Request, res: Response) => {
  const jwtSecret = process.env.TOKEN;
  const { email } = req.body;
  if (!email || typeof email !== "string")
    return res.status(400).json({ message: "Email is required" });

  if (!jwtSecret)
    return res.status(500).json({ error: "JWT secret not configured" });

  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1d" });
      if (!userExist.password) {
        return res.json({ msg: "User exists, proceed to set password", token });
      } else if (!userExist.firstName || !userExist.lastName) {
        return res.json({
          msg: "User exists, proceed to add your firstname and lastname",
          token,
        });
      } else {
        return res
          .status(200)
          .json({ msg: "User exists, proceed to login", token });
      }
    }

    await User.create({ email });

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1d" });
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "User not found" });
  }
};

export const setPassword = async (req: Request, res: Response) => {
  try {
    const userEmail = (req.user as { email?: string })?.email;
    const verifiedUser = await User.findOne({ where: { email: userEmail } });
    if (!verifiedUser)
      return res
        .status(401)
        .json({ message: "Unauthorized from authcontroller line36" });

    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword || password !== confirmPassword)
      return res.status(400).json({ message: "Password do not match" });

    const hashedPassword: string = await bcrypt.hash(password, 10);
    verifiedUser.password = hashedPassword;
    await verifiedUser.save();
    return res.sendStatus(202);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const setProfile = async (req: Request, res: Response) => {
  try {
    const userEmail = (req.user as { email?: string })?.email;
    const verifiedUser = await User.findOne({ where: { email: userEmail } });
    if (!verifiedUser)
      return res.status(403).json({ message: "Unauthorized from line72" });

    const { firstName, lastName } = req.body;
    if (!firstName || !lastName)
      return res
        .status(400)
        .json({ message: "First name and Last name are required" });

    verifiedUser.firstName = firstName;
    verifiedUser.lastName = lastName;
    await verifiedUser.save();
    return res.sendStatus(202);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const enterPassword = async (req: Request, res: Response) => {
  const jwtSecret = process.env.TOKEN;
  if (!jwtSecret)
    return res.status(500).json({ error: "JWT secret not configured" });

  const userEmail = (req.user as { email?: string })?.email;
  const verifiedUser = await User.findOne({ where: { email: userEmail } });
  if (!verifiedUser) return res.status(401).json({ msg: "No user found" });

  try {
    const { password } = req.body;
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const verifyPassword = await bcrypt.compare(
      password,
      verifiedUser.password
    );
    if (!verifyPassword)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ email: verifiedUser.email }, jwtSecret, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        email: verifiedUser.email,
        firstName: verifiedUser.firstName,
        lastName: verifiedUser.lastName,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userDetails = async (req: Request, res: Response) => {
  const userEmail = (req.user as { email?: string })?.email;
  const foundUser = await User.findOne({ where: { email: userEmail } });
  if (!foundUser) return res.status(400).json({ msg: "No user found" });
  
  return res.status(200).json(foundUser);
};
