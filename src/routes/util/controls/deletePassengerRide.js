const { passenger } = require("../../../models/ride");
const notification = require("../../../models/notification ")

const deletePassengerRide = async (req, res) => {
  const email = req.user.email;
  try {
    if (!email) return res.status(404).json({ msg: "Please login" });

    const findRide = await passenger.findOneAndDelete({ email: email });

    if(findRide) await notification.create({email:email, message:"You ride has been deleted"})

    return res.status(200).json({ msg: "Ride has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = deletePassengerRide;
