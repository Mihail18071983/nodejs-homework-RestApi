const express = require("express");

const router = express.Router();

const ctrl=require("../../controllers/contacts-controllers")

const { validateBody } = require("../../utils");

const schemas = require("../../schemas/contactsSchemas");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", validateBody(schemas.updateSchema), ctrl.updateContactById);

module.exports = router;
