const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findByIdAndRemove({ _id: id, owner: _id });
  if (!result) {
    throw new NotFound(`Contact wit id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: { result },
  });
};
module.exports = removeById;
