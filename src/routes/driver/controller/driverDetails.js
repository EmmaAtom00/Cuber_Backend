const { driver } = require("../../../models/ride");
const user = require("../../../models/user");

const getDriverDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(404).json({ msg: "no userId present" });

    const findDriver = await driver.findById({ _id: id });

    if (!findDriver)
      return res.status(404).json({ msg: "no driver with this Id" });

    const dbUser = await user.findOne({ email: findDriver.email });

    if (!dbUser) return res.status(404).json({ msg: "Driver not found" });

    const ride = {
      name: `${findDriver.firstName} ${findDriver.lastName}`,
      trip: `${findDriver.pickup} - ${findDriver.destination}`,
      size: findDriver.size,
      available_space: "",
      type: dbUser.car_type,
      reg_no: dbUser.reg_no,
      price: findDriver.price,
    };

    return res.status(200).json({ ride });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = getDriverDetails;
