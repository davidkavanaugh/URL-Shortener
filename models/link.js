const mongoose = require('mongoose');

 const linkSchema = new mongoose.Schema ({
     originalURL: String,
     shortURL: String
 });

module.exports = mongoose.model('Link', linkSchema);