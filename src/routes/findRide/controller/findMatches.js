const knn = require("../../../knn/knnCarpool");
const { driver, passenger } = require("../../../models/ride");

const findM = async (req, res) => {
  try {
    const drivers = await driver.find();

    if (!drivers)
      return res.status(205).json({ msg: "No available driver at the moment" });

    const Passenger = await passenger.findOne({ email: req.user.email });

    if (!Passenger) return res.status(404).json({ msg: "user not found" });

    const matches = knn(drivers, [Passenger]);

    // console.log(matches[0]);

    return res.status(200).json({ data: matches[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
  }
};

module.exports = findM;
