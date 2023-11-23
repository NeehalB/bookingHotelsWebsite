import express from "express";
import {
  addHotel,
  getAllHotels,
  getHotel,
  getDestinationHotel,
  updateHotelDetails,
  deleteHotel,
} from "../controller/hotel.controller";

const hotelRouter = express.Router();

hotelRouter.post("/add-hotel", addHotel);
hotelRouter.get("/get-all-hotels", getAllHotels);
hotelRouter.get("/hotel-rooms/:hotel_id", getHotel);
hotelRouter.get("/hotel-destination/:destination_id", getDestinationHotel);
hotelRouter.put("/update-hotel-details", updateHotelDetails);
hotelRouter.delete("/delete-hotel", deleteHotel);

export default hotelRouter;
