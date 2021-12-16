const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contactId = await Contact.findOne({ _id: id, owner: _id });
  if (!contactId) {
    throw new NotFound(`Contact wit id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactId,
    },
  });
};
module.exports = getById;
