import bookingModel from "../model/booking.model";

export const addBooking = async (req, res) => {
  try {
    const {
      user_id,
      hotel_id,
      room_id,
      checkin,
      checkout,
      hotel_name,
      room_name,
      room_cost,
      order_id,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    console.log(req.body);

    if (
      !user_id ||
      !hotel_id ||
      !room_id ||
      !checkin ||
      !checkout ||
      !hotel_name ||
      !room_name ||
      !room_cost
    ) {
      return res.status(204).json({
        message: "Booking failed.",
      });
    }

    const addBookingData = new bookingModel({
      user_id: user_id,
      hotel_id: hotel_id,
      room_id: room_id,
      checkin: checkin,
      checkout: checkout,
      hotel_name: hotel_name,
      room_name: room_name,
      room_cost: room_cost,
      order_id: order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      razorpay_signature: razorpay_signature,
    });

    addBookingData.save();

    if (addBookingData) {
      return res.status(200).json({
        message: "Hotel room reserved successfully.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "User id not found.",
      });
    }

    const bookingData = await bookingModel.find({
      user_id: _id,
    });

    if (!bookingData) {
      return res.status(400).json({
        message: "User does not exist.",
      });
    }

    return res.status(200).json({
      data: bookingData,
      message: "User booking data retrived successfully login.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllBookedHotels = async (req, res) => {
  try {
    const activeBookingsData = await bookingModel.find({
      status: 2,
    });
    if (!activeBookingsData) {
      return res.status(400).json({
        message: "Bookings not found.",
      });
    }
    return res.status(200).json({
      data: activeBookingsData,
      message: "Bookingdata retrived successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
