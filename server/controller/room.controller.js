import roomModel from "../model/room.model";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads")) {
      cb(null, "./uploads");
    } else {
      fs.mkdirSync("./uploads", true);
      cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    const imgname = file.originalname;
    const imgArr = imgname.split(".");
    imgArr.pop();
    const imgExt = path.extname(imgname);
    const fname = imgArr.join(".") + "-" + Date.now() + imgExt;
    cb(null, fname);
  },
});

const upload = multer({ storage: storage });

export const addRoom = (req, res) => {
  try {
    const uploadFile = upload.fields([{ name: "roomThumbnail", maxCount: 1 }]);
    uploadFile(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      const {
        roomName,
        roomFootage,
        numberOfBeds,
        numberOfAdults,
        numberOfChildren,
        baseCost,
        hotelId,
      } = req.body;
      let imgname = [];
      if (req.files["roomThumbnail"] !== undefined) {
        for (let i = 0; i < req.files["roomThumbnail"].length; i++) {
          const element = req.files["roomThumbnail"][i];
          imgname.push(element.filename);
        }
      }
      const roomData = new roomModel({
        hotel_id: hotelId,
        room_name: roomName,
        room_footage: roomFootage,
        number_of_beds: numberOfBeds,
        number_of_adults: numberOfAdults,
        number_of_childrens: numberOfChildren,
        base_cost: baseCost,
        thumbnail_image: imgname[0],
      });

      roomData.save();
      if (roomData) {
        res.status(201).json({
          data: roomData,
          message: "Destination data added successfully.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const roomsData = await roomModel.find({ status: 1 });
    return res.status(200).json({
      data: roomsData,
      message: "Hotels data collected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getSpecificHotelRooms = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const hotelRoomData = await roomModel.find({
      status: 1,
      hotel_id: hotel_id,
    });
    return res.status(200).json({
      data: hotelRoomData,
      message: "Rooms data collected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
