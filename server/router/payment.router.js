import express from "express";
import {
  checkOut,
  paymentVerification,
} from "../controller/payment.controller";

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkOut);
paymentRouter.post("/booking", paymentVerification);

export default paymentRouter;
