import { Router } from "express";
import {
  getUser,
  getUserFriends,
  updateFriends,
} from "../controllers/userControllers";

import catchAsyncErrors from "../utils/catchAsyncErrors";
import { verifyUser } from "../middlewares/verify";

const router = Router();

router.get("/:userId", catchAsyncErrors(getUser));
router.get("/:userId/friends", catchAsyncErrors(getUserFriends));
router.patch("/:userId/:friendId", catchAsyncErrors(updateFriends));

export default router;
