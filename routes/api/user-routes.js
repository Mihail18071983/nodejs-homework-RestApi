const express = require("express");

const ctrl = require("../../controllers/user-controllers");


const { validateBody } = require("../../utils");

const { authSchema } = require("../../models/user-schema");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrl.register);

router.post("/login", validateBody(authSchema), ctrl.login);

module.exports = router;