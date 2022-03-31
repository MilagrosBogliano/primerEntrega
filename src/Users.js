const mongoose = require('mongoose');

const collection = 'users';
const Schema = new mongoose.Schema({

})

const userService = mongoose.model(collection, Schema);

module.exports = userService;