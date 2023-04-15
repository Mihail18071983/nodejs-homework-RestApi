const express = require("express");

const ctrl = require("../../controllers/user-controllers");

const { validateBody } = require("../../utils");

const { authenticate } = require("../../middlewares");

const { authSchema } = require("../../models/user-schema");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrl.register);

router.post("/login", validateBody(authSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;