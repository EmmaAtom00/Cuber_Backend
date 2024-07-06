const notification = require("../../../models/notification ");

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "Notification ID is required" });
    }

    const deletedNotification = await notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ msg: "Notification not found" });
    }

    return res.status(200).json({ msg: "Notification deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = deleteNotification;
