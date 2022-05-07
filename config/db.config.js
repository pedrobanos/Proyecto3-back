const mongoose = require('mongoose')


const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info(`Successfully connected to the database ${URI}`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to de database ${URI}`, error);
    process.exit(0);
  });

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
 
