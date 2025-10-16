import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import fsPromises from "fs/promises";
import path from "path";
import users from "../models/User";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        if (!password)
          return done(null, false, { message: "Password is required" });

        const user = usersDB.users.find((user) => user.email === email);
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch)
          return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user.email));

passport.deserializeUser((email: string, done) => {
  const user = usersDB.users.find((user) => user.email === email);
  return done(null, user);
});
