const joi = require('joi');

const userValidate = data => {
      const userSchema = joi.object({
            username: joi.string().pattern(new RegExp('gmail.com$')).email().lowercase().required(),
            password: joi.string().min(4).max(32).required()
      });
      return userSchema.validate(data);
}

module.exports = {
      userValidate
}