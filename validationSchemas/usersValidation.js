const Joi = require('joi');


    const validatePost = Joi.object({
      firstName: Joi.string().alphanum().min(3).max(20).required(),
      lastName: Joi.string().alphanum().min(3).max(20).required(),
      userName: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(4).max(20).required(),
      email: Joi.string().email().required(),
      adress: Joi.string().alphanum().min(2).max(20).required(),
      phone: Joi.number().integer().required(),
    })

    const validateGetName = Joi.object({
      userName: Joi.string().alphanum().min(4).max(20).required(),
    })
    
    const validateGetId = Joi.object({
      _id: Joi.string().alphanum(),
  })

    const validatePut = Joi.object({
      firstName: Joi.string().alphanum().min(3).max(20),
      lastName: Joi.string().alphanum().min(3).max(20),
      userName: Joi.string().min(4).max(20),
      password: Joi.string().min(4).max(20),
      email: Joi.string().email(),
      adress: Joi.string().alphanum().min(2).max(20),
      phone: Joi.number().integer(),
    })

    const validateLogin = Joi.object({
      userName: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(4).max(20).required(),

    })


module.exports = {validatePost, validateGetName, validateGetId, validatePut, validateLogin};