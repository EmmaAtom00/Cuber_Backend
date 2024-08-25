const notification = require("../../../models/notification ");
const user = require("../../../models/user");

const getNotification = async (req, res) => {
  try {
    const email = req.user.email;

    const findUser = await user.findOne({ email });

    if (!findUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const findNotifications = await notification.find({ email });

    if (!findNotifications || findNotifications.length === 0) {
      return res.status(204).json({ msg: "Notifications not found" });
    }

    return res.status(200).json({ notifications: findNotifications });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = getNotification;
