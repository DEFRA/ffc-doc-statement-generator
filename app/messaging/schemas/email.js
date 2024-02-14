const Joi = require('joi')

module.exports = Joi.string().optional().allow('', null)
