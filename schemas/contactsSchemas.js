const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": "Name must not be empty",
    "string.empty": "Name must not be empty",
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "any.required": "Email must not be empty",
      "string.empty": "Email must not be empty",
      "string.pattern.base": "Email does not have a right format",
    }),
  phone: Joi.string()
    .required()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .messages({
      "any.required": "phone must not be empty",
      "string.empty": "phone must not be empty",
      "string.pattern.base":
        "Phone number must be in the format (XXX) XXX-XXXX",
    }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.email": "Email mast be valid",
      "string.pattern.base": "Email does not have a right format",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .messages({
      "string.empty": "phone must not be empty",
      "string.pattern.base":
        "Phone number must be in the format (XXX) XXX-XXXX",
    }),
}).or("name", "email", "phone");

module.exports = {
  addSchema,
  updateSchema,
};