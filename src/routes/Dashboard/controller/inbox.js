const inbox = require("../../../models/inbox");
const user = require("../../../models/user");

const getInbox = async (req, res) => {
  try {
    const email = req.user.email;

    const dbUser = await user.findOne({ email: email });

    if (!dbUser) return res.status(404).json({ msg: "Not found" });

    const Inbox = await inbox.find({ driverEmail: email });

    if (!inbox) res.status(204).json({ msg: "You have no request yet" });

    return res.status(200).json({ Inbox });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = getInbox;
