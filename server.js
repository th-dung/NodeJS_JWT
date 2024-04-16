const express = require('express');
const app = express();
const createError = require('http-errors');
// Khai báo file cấu hình
require('dotenv').config();
// Khai báo route
const UserRoute = require('./Routes/User.route');
// Khai báo redis
require('./helpers/connections_redis');

app.get('/', (req, res, next) => {
      console.log("a:::", a)
      res.send("Home page");
});

// khai báo json nhận req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', UserRoute);

app.use((req, res, next) => {
      // const error = new Error("Not Found");
      // error.status = 500;
      // next(error);
      next(createError.NotFound("this route does not exit."))
});

app.use((err, req, res, next) => {
      res.json({
            status: err.status || 500,
            message: err.message
      })
});

// port
const PORT = process.env.PORT || 3001;

// listen app
app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
});