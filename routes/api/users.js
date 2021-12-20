const express = require("express");
const { ctrlWrapper, auth, upload, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify/", auth, ctrlWrapper(ctrl.repeatVerify));
module.exports = router;
