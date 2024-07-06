const notification = require("../../../models/notification ");

const readNotification = async (req, res) => {
  try {
    const options = { new: false, runValidators: true };
    const filter = { email: req.user.email };
    const update = { read: true };

    const result = await notification.updateMany(filter, update, options);

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ msg: "No notifications found for this user" });
    }

    return res.status(200).json({ msg: "All notifications marked as read" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = readNotification;
