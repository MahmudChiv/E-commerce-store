import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { ProductCart } from "../models/ProductCart";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: false,
  models: [User, Product, ProductCart], // register your models here
});



