const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");

const { isValidId, authenticate } = require("../../middlewares");

const { validateBody } = require("../../utils");

const schemas = require("../../models/contact-schema");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.deleteContactById);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.updateSchema), ctrl.updateContactById);

router.patch("/:contactId/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
