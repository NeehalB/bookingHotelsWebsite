import mongoose from "mongoose";

const Schema = mongoose.Schema;

const destinationModel = new Schema({
  destination_name: {
    type: String,
    required: true,
  },
  destination_description: {
    type: String,
    required: null,
  },
  thumbnail_image: {
    type: String,
    required: true,
  },
  destination_images: {
    type: Array,
    default: [],
  },
  status: {
    type: Number,
    default: 1, //1 - active, 0 - inactive, 9 - deleted
  },
});

export default mongoose.model("destination", destinationModel);
