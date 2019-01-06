const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/nodejs-api';
mongoose.connect(mongoDB, { useNewUrlParser: true});
mongoose.Promise = global.Promise;
module.exports = mongoose;