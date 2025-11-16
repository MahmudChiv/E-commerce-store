import { Request, Response } from "express";
import { Product } from "../models/Product";

export const products = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
