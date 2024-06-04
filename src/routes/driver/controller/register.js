const user = require("../../../models/user");

const register = async (req, res) => {
  const email = req.user.email;
  const findEmail = await user.findOne({ email: email });
  if (!findEmail) return res.status(404).json({ msg: "user not found" });
  const details = req.body;
  if (!(details.nin && details.car_type && details.reg_no))
    return res
      .status(400)
      .json({ msg: "please complete your details to proceed" });
  if (findEmail.nin && findEmail.car_type && findEmail.reg_no) {
    if (findEmail.approved) {
      return res.status(200).json({ msg: "Your account has been approved" });
    } else {
      return res.status(200).json({
        msg: "Your information has been accepted an awaiting approval",
      });
    }
  }
  const newUpdate = {
    nin: details.nin,
    car_type: details.car_type,
    reg_no: details.reg_no,
  };
  const updateDetails = await user.findOneAndUpdate(
    { email: email },
    newUpdate,
    {
      new: false,
      runValidators: true,
    }
  );
  return res.status(200).json({
    msg: "Your details have been accepted, please wait till your account has been approved",
  });
};

module.exports = register;
