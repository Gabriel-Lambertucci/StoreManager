const Joi = require('joi');

const productsDTO = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required()
}).messages({
  'any.required': `{{#label}} is required`,
})

const productsMiddleware = (req, res, next) => {
  const { error } = productsDTO.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map( item => item.message);
    console.log(messages);
    if (error.details[0].context.limit) {
      const status = error.details[0].context.label === 'name' ? 422 : 404;
      return res.status(status).json({ message: messages[0] }); 
    }
    return res.status(400).json({ message: messages[0] }); 
  }
  next();
}

module.exports = productsMiddleware;