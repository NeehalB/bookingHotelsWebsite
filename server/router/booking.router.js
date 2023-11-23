import express from "express";
import {
  addBooking,
  getUserBookings,
  getAllBookedHotels,
} from "../controller/booking.controller";

const bookingRouter = express.Router();

bookingRouter.post("/add-booking", addBooking);
bookingRouter.post("/user-bookings", getUserBookings);
bookingRouter.post("/get-all-bookings", getAllBookedHotels);

export default bookingRouter;
