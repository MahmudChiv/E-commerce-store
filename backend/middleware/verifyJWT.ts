import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/User";

const secret = process.env.TOKEN;

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); //Bearer token
    const token = authHeader.split(" ")[1];
    console.log(token);
    console.log(process.env.TOKEN)
    if (!secret || typeof secret !== "string") {
      return res.sendStatus(500); // Internal Server Error if secret is missing
    }
    
    const decoded: any = jwt.verify(token, secret);
    if (!decoded) return res.status(403).json({ error: 'Invalid token.' });
    
    const user = await User.findOne({where: {email: decoded.email}})
    if (!user) return res.status(404).json({ error: 'User not found.' });

    req.user = user;
  } catch (error) {
    console.log(`Error from verifyline29${error}`);
    res.sendStatus(401);
  }
};
