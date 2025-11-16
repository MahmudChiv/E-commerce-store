import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/User";

const secret = process.env.TOKEN;

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({msg: "No token, not authorized!"});

      if (!secret) {
        return res.status(500).json({msg: "No secret key"});
      }

      const decoded: any = jwt.verify(token, secret);
      if (!decoded) return res.status(403).json({ error: "Invalid token." });

      const user = await User.findOne({
        where: { email: decoded.email },
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      (req.user) = user;
  
      return next();
    } catch (error) {
      console.log(`Error from verifyline29${error}`);
      return res.sendStatus(401);
    }
  }
  return res.status(401).json({ msg: "No token, not authorized!" });
};
