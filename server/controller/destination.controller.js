import destinationModel from "../model/destination.model";
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

export const addDestination = (req, res) => {
  try {
    const uploadFile = upload.fields([
      { name: "desThumbnail", maxCount: 1 },
      { name: "desImages", maxCount: 10 },
    ]);
    uploadFile(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      const { desName, desDescription } = req.body;
      let imgname = [];
      if (req.files["desThumbnail"] !== undefined) {
        for (let i = 0; i < req.files["desThumbnail"].length; i++) {
          const element = req.files["desThumbnail"][i];
          imgname.push(element.filename);
        }
      }
      let imgArr = [];
      if (req.files["desImages"] != undefined) {
        for (let i = 0; i < req.files["desImages"].length; i++) {
          const element = req.files["desImages"][i];
          imgArr.push(element.filename);
        }
      }
      const desData = new destinationModel({
        destination_name: desName,
        destination_description: desDescription,
        thumbnail_image: imgname[0],
        destination_images: imgArr,
      });

      desData.save();
      if (desData) {
        res.status(201).json({
          data: desData,
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

export const getAllDestination = async (req, res) => {
  try {
    const desData = await destinationModel.find({ status: 1 });
    return res.status(200).json({
      data: desData,
      message: "Destinations data collected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getSpecificDestination = async (req, res) => {
  try {
    const { destination_id } = req.params;
    const specificDesData = await destinationModel.find({
      status: 1,
      _id: destination_id,
    });
    return res.status(200).json({
      data: specificDesData,
      message: "Destination data collected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateDestinationDetails = async (req, res) => {
  try {
    const { _id, destination_name, destination_description } = req.body;

    if (!_id || !destination_name || !destination_description) {
      return res.status(400).json({
        message: "Destination fields empty.",
      });
    }
    const updateDestinationDetails = await destinationModel.updateOne(
      {
        _id,
      },
      {
        $set: {
          destination_name: destination_name,
          destination_description: destination_description,
        },
      }
    );
    if (updateDestinationDetails.acknowledged) {
      return res.status(200).json({
        data: updateDestinationDetails,
        message: "Destination updated successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const { args } = req.body;
    console.log(req.body);
    if (!args) {
      return res.status(400).json({
        message: "Destination id empty.",
      });
    }
    const updateDestinationDetails = await destinationModel.updateOne(
      {
        _id: args,
      },
      {
        $set: {
          status: 9,
        },
      }
    );
    if (updateDestinationDetails.acknowledged) {
      return res.status(200).json({
        data: updateDestinationDetails,
        message: "Destination delete successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
