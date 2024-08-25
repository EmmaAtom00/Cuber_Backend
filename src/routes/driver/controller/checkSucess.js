const { passengerHistory } = require("../../../models/history");

const checkSuccess = async (req, res) => {
  try {
    const passengerId = req.params.id;
    if (!passengerId) return res.status(404).json({ msg: "No user found" });

    const Status = await passengerHistory.findOne({ email: passengerId });
    if (!Status) return res.status(200).json({ success: false });
    else {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = checkSuccess;
