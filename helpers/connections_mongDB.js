const mongoose = require('mongoose');
const connect = mongoose.createConnection('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
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

process.on('SIGINT', async () => {
      await connect.close();
      process.exit(0);
});

module.exports = connect;