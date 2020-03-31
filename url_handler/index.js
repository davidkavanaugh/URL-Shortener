const models = require('../models')

const createAndSaveLink = (url, id) => {
    new models.Link({
      originalURL: url,
      shortURL: id
    })
    .save((err, data) => {
        if (err) return console.error(err);
        return data
    });
  };

module.exports = createAndSaveLink;