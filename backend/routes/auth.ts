import { Router } from "express";
import {
  signIn,
  setPassword,
  setProfile,
  enterPassword,
  userDetails
} from "../controllers/authController";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = Router();

router.post("/signIn", signIn);
router.post("/setPassword", verifyJWT, setPassword);
router.post("/setProfile", verifyJWT, setProfile);
router.post("/enterPassword", verifyJWT, enterPassword);
router.get("/userDetails", verifyJWT, userDetails);

export default router;
