import express from "express";
import {
  addDestination,
  getAllDestination,
  getSpecificDestination,
  updateDestinationDetails,
  deleteDestination,
} from "../controller/destination.controller";

const destinationRouter = express.Router();

destinationRouter.post("/add-destination", addDestination);
destinationRouter.get("/get-all-destinations", getAllDestination);
destinationRouter.get("/destination/:destination_id", getSpecificDestination);
destinationRouter.put("/updated-destination", updateDestinationDetails);
destinationRouter.delete("/delete-destination", deleteDestination);

export default destinationRouter;
