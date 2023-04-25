const express = require("express");

const ctrl = require("../../controllers/user-controllers");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../middlewares");

const { authSchema } = require("../../models/user-schema");

const router = express.Router();

router.post("/register", validateBody(authSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/login", validateBody(authSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

router.patch(
  "/",
  authenticate,
  validateBody(authSchema),
  ctrl.updateUserSubscription
);


module.exports = router;
