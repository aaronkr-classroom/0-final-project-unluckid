// data/seedTransportations.js

const mongoose = require("mongoose");
const Transportation = require("../models/Transportation");

mongoose.connect("mongodb://localhost:27017/your_database_name", { useNewUrlParser: true });

const transportations = [
  { name: "Express Train", type: "Train", departureTime: new Date(), arrivalTime: new Date() },
  { name: "City Bus", type: "Bus", departureTime: new Date(), arrivalTime: new Date() },
  // 필요에 따라 데이터 추가
];

Transportation.insertMany(transportations)
  .then(() => {
    console.log("Transportations seeded successfully");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
