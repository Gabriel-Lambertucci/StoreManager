const Joi = require('joi');

const productsDTO = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
}).messages({
  'any.required': '{{#label}} is required',
});

const aux1 = (error) => {
  console.log(error.details[0]);
  const status = (
    error.details[0].type === 'number.min' || error.details[0].type === 'string.min' ? 422 : 404);
  return status;
};

const productsMiddleware = (req, res, next) => {
  const { error } = productsDTO.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((item) => item.message);
    if (error.details[0].context.limit) {
      const status = aux1(error);
      console.log(status);
      return res.status(status).json({ message: messages[0] }); 
    }
    return res.status(400).json({ message: messages[0] }); 
  }
  next();
};

module.exports = productsMiddleware;