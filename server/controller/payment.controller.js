import { razorpayInstance } from "../index.js";
import crypto from "crypto";

export const checkOut = async (req, res) => {
  try {
    const { amount } = req.body;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: "1234567890",
    };

    const response = await razorpayInstance.orders.create(options);
    console.log(response);
    res.status(200).json({
      response: response,
      key: process.env.RAZOR_API_KEY,
    });
  } catch (error) {
    console.log(error);
  }
};

export const paymentVerification = (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET_KEY)
      .update(body.toString())
      .digest("hex");
    console.log(expectedSignature);
    console.log(razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        message: "Payment successfull.",
      });
    } else {
      res.status(400).json({
        message: "Payment failed.",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
