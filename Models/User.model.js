const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {testConnection} = require('../helpers/connections_multi_mongDB');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
      username: {
            type: String,
            lowercase: true,
            unique: true,
            require: true
      },
      password: {
            type: String,
            require: true
      }
});

// mã hóa password
UserSchema.pre('save', async function(next) {
      try {
            // console.log(`called before save::: ${this.username} ${this.password}`);
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(this.password, salt);
            this.password = hashPassword;
            next();
      } catch (error) {
            next(error);
      }
});

// So sánh mật khẩu
UserSchema.methods.isCheckPassword = async function(password) {
      try {
            return await bcrypt.compare(password, this.password);
      } catch (error) {
            
      }
};

module.exports = testConnection.model('user', UserSchema);