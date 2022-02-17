const Joi = require('joi');

    const validatePost = Joi.object({
        title: Joi.string().pattern(/^\s*\w+(?:[^\w,]+\w+)*$/).required(),
        author: Joi.string().min(3).max(30).required(),
        genre: Joi.string().required(),
        read: Joi.boolean().required()
    })

    const validateGetName = Joi.object({
        title: Joi.string().pattern(/^\s*\w+(?:[^\w,]+\w+)*$/).required(),
    })

    const validateGetAuthor = Joi.object({
        author: Joi.string().min(3).max(30).required(),
    })

    const validateGetId = Joi.object({
        _id: Joi.string().alphanum(),
    })

    const validatePut = Joi.object({
        title: Joi.string().pattern(/^\s*\w+(?:[^\w,]+\w+)*$/),
        author: Joi.string().min(3).max(30),
        genre: Joi.string(),
        read: Joi.boolean(),
    })


module.exports = {validatePost, validateGetName, validateGetAuthor, validateGetId, validatePut};