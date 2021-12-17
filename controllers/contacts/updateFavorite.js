const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: _id },
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact wit id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateFavorite;
