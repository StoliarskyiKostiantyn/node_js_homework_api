const { Contact } = require("../../models");
const { BadRequest } = require("http-errors");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 3 } = req.query;
  if (isNaN(page) || isNaN(limit)) {
    throw new BadRequest("Bad Request");
  }
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

module.exports = getAll;
