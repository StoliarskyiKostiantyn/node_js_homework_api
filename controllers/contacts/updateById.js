const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: _id },
    req.body
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
module.exports = updateById;
