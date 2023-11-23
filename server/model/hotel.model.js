import mongoose from "mongoose";
import destinationModel from "./destination.model";

const Schema = mongoose.Schema;

const hotelModel = new Schema({
  destination_id: {
    type: Schema.Types.ObjectId,
    ref: destinationModel,
    required: true,
  },
  hotel_name: {
    type: String,
    required: true,
  },
  hotel_description: {
    type: String,
    required: null,
  },
  hotel_location: {
    type: String,
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
  hotel_images: {
    type: Array,
    default: [],
  },
  hotel_facilities: {
    type: String,
    required: true,
  },
  hotel_rules: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1, //1 - active, 0 - inactive, 9 - deleted
  },
});

export default mongoose.model("hotel", hotelModel);
