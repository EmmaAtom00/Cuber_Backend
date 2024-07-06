const inbox = require("../../../models/inbox");
const notification = require("../../../models/notification ");

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "Request ID is required" });
    }

    const details = await inbox.findById(id);

    if (!details) {
      return res.status(404).json({ msg: "Request not found" });
    }

    const deletedRequest = await inbox.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ msg: "Request not found" });
    }

    await notification.create({
      email: details.email,
      message: `${details.name}, your request for the trip ${details.trip} with ID: ${details._id} has been declined.`,
    });

    return res
      .status(200)
      .json({ msg: "Request deleted and user notified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = deleteRequest;
