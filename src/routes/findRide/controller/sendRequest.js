const { driver, passenger } = require("../../../models/ride");
const inbox = require("../../../models/inbox");
const user = require("../../../models/user");
const sendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user.email;

    const findDriver = await driver.findById({ _id: id });

    const dbUser = await user.findOne({ email: email });

    const userRide = await passenger.findOne({ email: email });

    if (!userRide)
      return res.status(404).json({ msg: "You do not have an active ride" });

    if (!dbUser) return res.status(404).json({ msg: "user not found" });

    if (!findDriver) return res.status(404).json({ msg: "driver not found" });

    const notification = {
      email: email,
      name: `${dbUser.firstName} ${dbUser.lastName}`,
      trip: `${userRide.pickup} ${userRide.destination}`,
      driverEmail: findDriver.email,
      status: "pending",
    };

    const saveNotification = await inbox.create(notification);

    return res.status(201).json({ msg: "request sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = sendRequest;
