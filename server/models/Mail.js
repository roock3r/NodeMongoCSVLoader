var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mailSchema = new Schema({

  id: { type: String, Required:  'Mail id cannot be left blank.' },  

  name: { type: String, Required:  'Mail name cannot be left blank.' },

  scheduled_date: { type: Date },

});

module.exports = mongoose.model('Mails', mailSchema);