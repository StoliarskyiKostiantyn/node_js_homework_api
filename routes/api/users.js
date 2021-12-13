const express = require("express");
const { ctrlWrapper, auth, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
module.exports = router;
