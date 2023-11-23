import express from "express";
import {
  addRoom,
  getAllRooms,
  getSpecificHotelRooms,
} from "../controller/room.controller";

const roomRouter = express.Router();

roomRouter.post("/add-room", addRoom);
roomRouter.get("/get-all-rooms", getAllRooms);
roomRouter.get("/get-hotel-rooms/:hotel_id", getSpecificHotelRooms);

export default roomRouter;
