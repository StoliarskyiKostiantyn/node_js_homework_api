const { User } = require("../../models");
const { BadRequest, NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");

const repeatVerify = async (req, res) => {
  const { email } = req.body;
  const { verify } = req.user;
  if (!email) {
    throw BadRequest("Email is required");
  }
  if (verify) {
    throw BadRequest("Already verifyed");
  }
  const verificationToken = nanoid();
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw NotFound();
  }
  const mail = {
    to: email,
    subject: "Подтверждение Email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить Email</a>`,
  };
  await sendEmail(mail);
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: verificationToken,
  });
  res.json({
    message: "Verify success",
  });
};
module.exports = repeatVerify;
