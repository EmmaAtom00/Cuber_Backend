const { driver } = require("../../../models/ride");

const allUserDropped = async (req, res) => {
  try {
    const email = req.user.email;

    const findRide = await driver.findOne({ email: email });
    if (!findRide) return res.status(404).json({ msg: "ride not found" });

    let status = [];
    for (let i in findRide.passengers) {
      if (findRide.passengers[i].success) status.push("true");
    }
    if (findRide.passengers.length == status.length) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};

module.exports = allUserDropped;
