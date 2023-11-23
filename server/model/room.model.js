import mongoose from "mongoose";
import hotelModel from "./hotel.model";

const Schema = mongoose.Schema;

const roomModel = new Schema({
  hotel_id: {
    type: Schema.Types.ObjectId,
    ref: hotelModel,
    required: true,
  },
  room_name: {
    type: String,
    required: true,
  },
  room_footage: {
    type: Number,
    required: true,
  },
  number_of_beds: {
    type: Number,
    required: true,
  },
  number_of_adults: {
    type: Number,
    required: true,
  },
  number_of_childrens: {
    type: Number,
    required: true,
  },
  base_cost: {
    type: Number,
    required: true,
  },
  thumbnail_image: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1, //1 - active, 0 - inactive, 9 - deleted
  },
});

export default mongoose.model("rooms", roomModel);
