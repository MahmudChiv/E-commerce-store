import { Router } from "express";
import { products, getProductById } from "../controllers/routeController";

const router = Router();

router.get("/products", products);
router.get("/products/:id", getProductById);

export default router;
