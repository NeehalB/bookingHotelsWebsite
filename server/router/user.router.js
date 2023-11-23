import express from "express";
import {
  signUp,
  signIn,
  getAllActiveUsers,
  getUserViaId,
  updateUserDetails,
  deleteUser,
} from "../controller/user.controller";

const userRouter = express.Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.get("/all-users", getAllActiveUsers);
userRouter.post("/get-user-via-id", getUserViaId);
userRouter.put("/update-user-details", updateUserDetails);
userRouter.delete("/delete-user", deleteUser);

export default userRouter;
