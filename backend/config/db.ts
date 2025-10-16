import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: false,
  models: [User], // register your models here
});



