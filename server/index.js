import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./router/user.router";
import destinationRouter from "./router/destination.router";
import hotelRouter from "./router/hotel.router";
import roomRouter from "./router/room.router";
import bookingRouter from "./router/booking.router";
import paymentRouter from "./router/payment.router";
import Razorpay from "razorpay";

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_API_KEY,
  key_secret: process.env.RAZOR_SECRET_KEY,
});

const app = express();
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("You have successfully connect to the database."))
  .catch((err) => console.log(err));

app.use(userRouter);
app.use(destinationRouter);
app.use(hotelRouter);
app.use(roomRouter);
app.use(bookingRouter);
app.use(paymentRouter);
