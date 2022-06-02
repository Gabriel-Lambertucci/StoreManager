const Joi = require('joi');

const salesDTO = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required()
}).messages({
  'any.required': `{{#label}} is required`,
})

const salesMiddleware = (req, res, next) => {
  const { error } = salesDTO.validate(req.body, { abortEarly: false });
  console.log(error.details);
  if (error) {
    const messages = error.details.map( item => item.message);
    if (error.details[0].context.limit) {
      return res.status(404).json({ message: messages[0] }); 
    }
    return res.status(400).json({ message: messages[0] }); 
  }
  next();
}

module.exports = salesMiddleware;