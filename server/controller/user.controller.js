import jwt from "jsonwebtoken";
import userModel from "../model/user.model";
export const signUp = (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    if (!firstName || !lastName || !email || !password) {
      return res.status(204).json({
        message: "Please enter all the fields.",
      });
    }

    const userSignUpData = new userModel({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    userSignUpData.save();
    if (userSignUpData) {
      res.status(200).json({
        message: "User signed up successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(password, email);

    if (!password) {
      return res.status(400).json({
        message: "User data not entered.",
      });
    }

    const userData = await userModel.findOne({
      email: email,
      password: password,
    });

    if (!userData) {
      return res.status(400).json({
        message: "Email or password incorrect.",
      });
    }

    const token = jwt.sign(
      {
        userid: userData._id,
        email: userData.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // console.log(token);

    return res.status(200).json({
      token: token,
      data: userData,
      message: "Successfull login.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllActiveUsers = async (req, res) => {
  try {
    const activeUserData = await userModel.find({
      status: 1,
    });
    if (!activeUserData) {
      return res.status(400).json({
        message: "Email or password incorrect.",
      });
    }
    return res.status(200).json({
      data: activeUserData,
      message: "Userdata retrived successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserViaId = async (req, res) => {
  const { user_id } = req.body;
  try {
    const userViaId = await userModel.findOne({ _id: user_id });
    return res.status(200).json({
      data: userViaId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { _id, password, last_name, first_name, email } = req.body;
    console.log(_id, password, last_name, first_name, email);
    if (!_id || !password || !last_name || !first_name || !email) {
      return res.status(400).json({
        message: "User fields empty.",
      });
    }
    const updateDetails = await userModel.updateOne(
      { _id: _id },
      {
        $set: {
          password: password,
          last_name: last_name,
          first_name: first_name,
          email: email,
        },
      }
    );
    if (updateDetails.acknowledged) {
      return res.status(200).json({
        data: updateDetails,
        message: "Updated successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id, status } = req.body;
    console.log(_id, status)

    if (!_id || !status) {
      return res.status(400).json({
        message: "User fields empty.",
      });
    }
    const updateDetails = await userModel.updateOne(
      { _id: _id },
      {
        $set: {
          status: status,
        },
      }
    );
    if (updateDetails.acknowledged) {
      return res.status(200).json({
        data: updateDetails,
        message: "Updated successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
