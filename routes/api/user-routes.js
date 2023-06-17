const express = require("express");

const ctrl = require("../../controllers/user-controllers");

const { validateBody } = require("../../utils");

const { authenticate, upload } = require("../../middlewares");

const { registerSchema, refreshSchema, loginSchema } = require("../../models/user-schema");

const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('Welcome to Phone book API!');
// });

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post("/refresh", validateBody(refreshSchema), ctrl.refresh);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

router.patch(
  "/",
  authenticate,
  validateBody(registerSchema),
  ctrl.updateUserSubscription
);


module.exports = router;
