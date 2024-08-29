const { passenger } = require("../../../models/ride");
const user = require("../../../models/user");

const drop = async (req, res) => {
  try {
    const email = req.user.email;
    const findUser = user.findOne({ email: email });
    if (!findUser) return res.status(404).send("user not found");

    const ride = passenger.findOneAndUpdate(
      { email: email },
      { success: true },
      { new: false, runValidators: true }
    );
    return res.status(200).send("dropped successfull");
  } catch (error) {
    return res.status(500).send("server error");
  }
};

module.exports = drop;
