import mongoose from "mongoose";
import userModel from "./user.model";
import hotelModel from "./hotel.model";
import roomModel from "./room.model";

const Schema = mongoose.Schema;

const bookingModel = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  hotel_id: {
    type: Schema.Types.ObjectId,
    ref: hotelModel,
    required: true,
  },
  hotel_name: {
    type: String,
    required: true,
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: roomModel,
    required: true,
  },
  room_name: {
    type: String,
    required: true,
  },
  room_cost: {
    type: Number,
    required: true,
  },
  checkin: {
    type: String,
    required: true,
  },
  checkout: {
    type: String,
    required: true,
  },
  order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_signature: { type: String, required: true },

  status: {
    type: Number,
    default: 2, //1 - booked, 0 - deleted, 9 - deleted, 2 - reserved
  },
});

export default mongoose.model("booking", bookingModel);
