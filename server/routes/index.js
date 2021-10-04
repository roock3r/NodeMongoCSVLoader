const express = require('express');
const csv = require('fast-csv');
const router = express.Router();
const fs = require('fs');

const mongoose = require('mongoose');

const Client  = mongoose.model('Clients');
const Mail = mongoose.model('Mails');


const clientscsvfile = __dirname + '/../public/files/clients.csv';
const clientstream = fs.createReadStream(clientscsvfile);


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Import CSV using NodeJS into MongoDB' });

});

router.get('/import', function(req, res, next) {

    let days = 4
    let csvStream = csv({ headers: true, delimiter: '|' })
        .on('data', function(data){
         let record = new Client({
            program_identifier: data['Program Identifier'],
            data_source: data['Data Source'],
            card_name: data['Card Number'],
            member_id: data['Member ID'],
            first_name:data['First Name'],
            last_name: data['Last Name'],
            date_of_birth: data['Date of Birth'],
            address_1: data['Address 1'],
            address_2 : data['Address 2'],
            city:  data['City'],
            state: data['State'],
            zip: data['Zip code'],
            telephone: data['Telephone number'],
            email: data['Email Address'],
            consent: data['CONSENT'],
            mobile_phone: data['Mobile Phone']
         });
         
         record.save(function(error, record){
              if(error){
                   throw error;
              }
              if(record.consent == 'Y'){
                for (let i = 1; i < days+1; i++)
                {
                    let mail = new Mail({
                        id: record._id,
                        name:  `Day ${i}`,
                        scheduled_date: new Date(new Date().getTime() + (i*24*60*60*1000)),
                    })
                    mail.save();
                }
              }
          }); 

    }).on('end', function(){

    });
  
    clientstream.pipe(csvStream);
    res.json({success : 'Data imported successfully.', status : 200});
     
  })
  
  
router.get('/fetchdata', function(req, res, next) {
    
    Client.find({}, function(err, docs) {
        if (!err){ 
            res.json({success : 'Updated Successfully', status : 200, data: docs});
        } else { 
            throw err;
        }
    });
  
});


module.exports = router;
