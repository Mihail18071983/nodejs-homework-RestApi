const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const { ctrlWrapper } = require("../utils");
const crtlWrapper = require("../utils/ctrlWrapper");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  if (Object.keys(req.body).length < 3) {
    throw HttpError(400, "missing required name field");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400);
  }
  const { contactId: id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  console.log("body", req.body);
  console.log("result", result);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: crtlWrapper(getContactById),
  addContact: crtlWrapper(addContact),
  deleteContactById: crtlWrapper(deleteContactById),
  updateContactById: crtlWrapper(updateContactById),
};
