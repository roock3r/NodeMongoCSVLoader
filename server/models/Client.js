var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clientSchema = new Schema({

  program_identifier: { type: String },
  data_source: { type: String },
  card_name: { type: String },
  member_id: { type: String},
  first_name: { type: String },
  last_name: { type: String },
  date_of_birth: { type: String },
  address_1: { type: String },
  address_2 : { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  telephone: { type: String },
  email: { type: String },
  consent: { type: String },
  mobile_phone: { type: String }

});

module.exports = mongoose.model('Clients', clientSchema);