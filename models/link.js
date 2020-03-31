const mongoose = require('mongoose');

 const linkSchema = new mongoose.Schema ({
     orignalURL: {
         type: String
     },
     shortURL: {
         type: String
     }
 });

 const Link = mongoose.model('Link', linkSchema);

 module.exports = Link;