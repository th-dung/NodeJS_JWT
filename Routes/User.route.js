const express = require('express');
const route = express.Router();
const User = require('../Models/User.model');
const createError = require('http-errors');
const {userValidate} = require('../helpers/validation');
const {signAccessToken, verifyAccessToken, signRefreshToken} = require('../helpers/jwt_service');

route.post('/register', async (req, res, next) => {
      try {
            // Nếu email hoặc password rỗng
            const {username, password} = req.body;
            // if(!email || !password) {
            //       throw createError.BadRequest();
            // }
            const { error } = userValidate(req.body);
            // console.log(`:::error validation:::`, error);
            if(error) {
                  throw createError(error.details[0].message);
            }

            // Nếu email đã tồn tại trong db
            const isExits = await User.findOne({
                  username: username
            });
            if(isExits) {
                  throw createError.Conflict(`${username} is ready been register`);
            }

            // Nếu email chưa tồn tại
            const user = new User({
                  username: username,
                  password
            });
            const saveUser = await user.save();

            return res.json({
                  status: 'Success',
                  element: saveUser
            });

      } catch (error) {
            next(error);
      }
});

route.post('/refresh-token', (req, res, next) => {
      res.send("function refresh-token");
});

route.post('/login', async (req, res, next) => {
      try {
            const {error} = userValidate(req.body);
            if(error) {
                  throw createError(error.details[0].message);
            }

            const {username, password} = req.body;
            
            const user = await User.findOne({username});
            if(!user) {
                  throw createError.NotFound("User not register");
            }

            const isValid = await user.isCheckPassword(password);
            if(!isValid) {
                  throw createError.Unauthorized();
            }
            const accessToken = await signAccessToken(user._id);            
            const refreshToken = await signRefreshToken(user._id);            

            res.json({
                  accessToken, 
                  refreshToken
            });

      } catch (error) {
            next(error);
      }
});

route.post('/logout', (req, res, next) => {
      res.send("function logout");
});

route.get('/getlists', verifyAccessToken, (req, res, next) => {
      console.log(req.headers);
      const listUser = [
            {
                  email: 'abc@gmail.com'
            },
            {
                  email: 'def@gmail.com'
            }
      ]
      res.json({
            listUser
      });
})

module.exports = route;