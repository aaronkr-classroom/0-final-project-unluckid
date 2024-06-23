// models/Transportation.js

const mongoose = require("mongoose");

const transportationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["Train", "Bus", "Flight", "Ferry"], // 예시에 맞게 필요한 종류 추가
  },
  departureTime: Date,
  arrivalTime: Date,
});

module.exports = mongoose.model("Transportation", transportationSchema);
