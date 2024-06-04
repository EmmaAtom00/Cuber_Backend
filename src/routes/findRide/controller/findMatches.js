const knn = require("../../../knn/knnCarpool");
const { driver, passenger } = require("../../../models/ride");

const findM = async (req, res) => {
  const drivers = await driver.find();
  if (!drivers)
    return res.status(205).json({ msg: "No available driver at the moment" });
  const Passenger = await passenger.findOne({ email: req.user.email });
  if (!Passenger) return res.status(404).json({ msg: "user not found" });
  const matches = knn(drivers, Passenger);
  console.log(matches);
  return res.status(200).json({ data: matches });
};

module.exports = findM;
