const Joi = require('joi');

const salesDTO = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}).messages({
  'any.required': '{{#label}} is required',
});

const aux1 = (error) => {
  console.log(error[0]);
  const status = (
    error[0].type === 'number.min' || error.details[0].type === 'string.min' ? 422 : 404);
  return status;
};

const salesMiddleware = (req, res, next) => {
  const error = req.body.map((item) => {
    const { error } = salesDTO.validate(item, { abortEarly: false })
    if(error !== undefined) {
      return error.details[0];
    };
  }).filter((item) => item !== undefined);
  console.log(error)
  if (error) {
    const messages = error.map((item) => item.message);
    if (error[0].context.limit) {
      const status = aux1(error);
      console.log(status);
      return res.status(status).json({ message: messages[0] }); 
    }
    return res.status(400).json({ message: messages[0] }); 
  }
  next();
};

module.exports = salesMiddleware;
