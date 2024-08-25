const notification = require("../../../models/notification ");
const { driver, passenger } = require("../../../models/ride");

const dropPassenger = async (req, res) => {
  try {
    const passengerId = req.params.id;
    const driverId = req.user.email;

    // console.log(passengerId, driverId);
    const notify = notification.create({
      email: passengerId,
      message: `Driver ${driverId} has requested to drop you check your ride to respond, auto response in 2hours`,
    });
    const requestToRemove = await passenger.findOneAndUpdate(
      { email: passengerId },
      { requestToDrop: true },
      { new: false, runValidators: true }
    );
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = dropPassenger;
