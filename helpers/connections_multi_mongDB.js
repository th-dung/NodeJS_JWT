const mongoose = require('mongoose');
require('dotenv').config();

function newConnection(uri){
      const connect = mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      });
      // connected
      connect.on('connected', function(){
            console.log(`MongoDB::: connected::: ${this.name}`);
      });
      // disconnect
      connect.on('disconnected', function(){
            console.log(`MongoDB::: disconnected ${this.name}`);
      });
      // error
      connect.on('error', function(){
            console.log(`MongoDB::: error ${this.name} ${JSON.stringify(error)}`);
      });
      return connect;
}

// make connection to db
const testConnection = newConnection(process.env.URI_MONGODB_TEST);
const userConnection = newConnection(process.env.URI_MONGODB_USERS);

module.exports = {
      testConnection,
      userConnection
}