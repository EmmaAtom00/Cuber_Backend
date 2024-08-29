const { passenger } = require("../../../models/ride");

const RequestStatus = async (req, res) => {
  try {
    const passengerId = await req.params.id;
    const stat = await passenger.findOne({ _id: passengerId });
    if (stat) return res.status(200).json({ stat: stat.requestToDrop });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports = RequestStatus;
