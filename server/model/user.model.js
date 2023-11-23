  import mongoose from "mongoose";

const currentDate = new Date();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const year = currentDate.getFullYear().toString().slice(-2);

const formattedDate = `${month}/${day}/${year}`;

const Schema = mongoose.Schema;

const userModel = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1, //1 - active, 0 - inactive, 9 - deleted
  },
  createAt: {
    type: String,
    default: formattedDate,
  },
});

export default mongoose.model("users", userModel);
