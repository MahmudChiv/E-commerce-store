import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRoutes from "./routes/auth";
import { sequelize } from "./config/db";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ SQLite connected successfully!");
    await sequelize.sync({ alter: true, force: true });
    console.log("✅ All models were synchronized successfully.");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome, this is the API");
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
