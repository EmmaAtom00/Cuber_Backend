const { driver, passenger } = require("../../../models/ride");
const { passengerHistory } = require("../../../models/history");
const completeRide = async (req, res) => {
  try {
    const passengerId = req.user.email;

    const passengerRideDetails = await passenger.findOne({
      email: passengerId,
    });

    if (!passengerRideDetails.success) {
      const complete = await passenger.findOneAndUpdate(
        { email: passengerId },
        { success: true },
        { new: false, runValidators: true }
      );

      // console.log(passengerRideDetails);
      const ride = {
        email: passengerRideDetails.email,
        location: {
          lat: passengerRideDetails.location.lat,
          lng: passengerRideDetails.location.lng,
        },
        destination: passengerRideDetails.destination,
        pickup: passengerRideDetails.pickup,
        driver: passengerRideDetails.driver,
        success: true,
      };
      const history = await passengerHistory.create(ride);
      if (history) {
        const removeRide = await passenger.findOneAndDelete({
          email: passengerId,
        });
      }
      return res.status(200).json({ msg: "Ride completed" });
    } else {
      return res.status(203).json({ msg: "Ride already completed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
  }
};

module.exports = completeRide;
