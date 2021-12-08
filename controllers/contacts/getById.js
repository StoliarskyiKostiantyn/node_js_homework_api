const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const contactId = await Contact.findById(id);
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
