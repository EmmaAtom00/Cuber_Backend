const { passenger } = require("../../../models/ride");

const deletePassengerRide = async (req, res) => {
  const email = req.user.email;
  try {
    if (!email) return res.status(404).json({ msg: "Please login" });

    const findRide = await passenger.findOneAndDelete({ email: email });

    return res.status(200).json({ msg: "Ride has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = deletePassengerRide;
