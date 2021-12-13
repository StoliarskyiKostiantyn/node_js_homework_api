const express = require("express");
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:id", ctrlWrapper(ctrl.getById));
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));
router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));
router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
router.delete("/:id", ctrlWrapper(ctrl.removeById));
module.exports = router;
