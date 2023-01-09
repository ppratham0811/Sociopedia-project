import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authControllers";
import catchAsyncErrors from "../utils/catchAsyncErrors";
import { upload } from "../utils/storage";

const router = Router();

router.post(
  "/register",
  upload.single("profilePic"),
  catchAsyncErrors(registerUser)
);
router.post("/login", catchAsyncErrors(loginUser));

export default router;
