import hotelModel from "../model/hotel.model";
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

export const addHotel = (req, res) => {
  try {
    const uploadFile = upload.fields([
      { name: "hotelThumbnail", maxCount: 1 },
      { name: "hotelImages", maxCount: 10 },
    ]);
    uploadFile(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      const {
        hotelName,
        hotelDescription,
        hotelLocation,
        baseCost,
        hotelFacilities,
        hotelRules,
        destinationId,
      } = req.body;
      let imgname = [];
      if (req.files["hotelThumbnail"] !== undefined) {
        for (let i = 0; i < req.files["hotelThumbnail"].length; i++) {
          const element = req.files["hotelThumbnail"][i];
          imgname.push(element.filename);
        }
      }
      let imgArr = [];
      if (req.files["hotelImages"] != undefined) {
        for (let i = 0; i < req.files["hotelImages"].length; i++) {
          const element = req.files["hotelImages"][i];
          imgArr.push(element.filename);
        }
      }
      const hotelData = new hotelModel({
        destination_id: destinationId,
        hotel_name: hotelName,
        hotel_description: hotelDescription,
        hotel_location: hotelLocation,
        base_cost: baseCost,
        hotel_facilities: hotelFacilities,
        hotel_rules: hotelRules,
        thumbnail_image: imgname[0],
        hotel_images: imgArr,
      });

      hotelData.save();
      if (hotelData) {
        res.status(201).json({
          data: hotelData,
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

export const getAllHotels = async (req, res) => {
  try {
    const hotelsData = await hotelModel.find({ status: 1 });
    return res.status(200).json({
      data: hotelsData,
      message: "Hotels data collected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getHotel = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    // console.log(hotel_id);
    const hotelData = await hotelModel.find({ status: 1, _id: hotel_id });
    return res.status(200).json({
      data: hotelData,
      message: "Hotel data collected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getDestinationHotel = async (req, res) => {
  try {
    const { destination_id } = req.params;
    const hotelData = await hotelModel.find({
      status: 1,
      destination_id: destination_id,
    });
    return res.status(200).json({
      data: hotelData,
      message: "Hotel data collected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateHotelDetails = async (req, res) => {
  try {
    const { hotel_rules, hotel_name, hotel_location, hotel_description, _id } =
      req.body;
    console.log(
      hotel_rules,
      hotel_name,
      hotel_location,
      hotel_description,
      _id
    );
    const updateDetails = await hotelModel.updateOne(
      { _id: _id },
      {
        $set: {
          hotel_rules,
          hotel_name,
          hotel_location,
          hotel_description,
        },
      }
    );

    if (updateDetails.acknowledged) {
      return res.status(200).json({
        data: updateDetails,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const updateDetails = await hotelModel.updateOne(
      { _id: _id },
      {
        $set: {
          status: 9,
        },
      }
    );

    if (updateDetails.acknowledged) {
      return res.status(200).json({
        data: updateDetails,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// let a = "Neehal";
// let alenght = 0;
// let reverse = "";

// while (a[alenght] !== undefined) {
//   ++alenght;
// }

// console.log(alenght);

// for (let i = alenght - 1; i >= 0; i--) {
//   reverse += a[i];
// }

// console.log(reverse);
