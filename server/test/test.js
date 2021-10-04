var assert = require('assert');
const Client = require('../models/Client')

describe('CSV', function() {
  describe('#Data in flat file matches the data in Patients collection', function() {
    it('should return value count of csv and patient count in db', function() {
    //   assert.equal([1, 2, 3].indexOf(4), -1);

        let  i;
        let csvLineCount = 0;
        const clientscsvfile = __dirname + '/../public/files/clients.csv';

        require('fs').createReadStream(clientscsvfile)
        .on('data', function(chunk) {
            for (i=0; i < chunk.length; ++i)
            if (chunk[i] == 10) csvLineCount++;
        })
        .on('end', function() {
            console.log(` The number of records and csv match to: ${csvLineCount}`);
        });

        Client.count({}, function (err, count) {
            if (err) throw err;
            assert.equal(count, csvLineCount)
        })
    });
  });
});


describe('Client', function() {
    describe('#Patient IDs where the first name is missing', function() {
      it('should return all patients with missing first name', function() {
          //This is where the test logic should go.
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });


describe('ClientConsent', function() {
    describe('#Patient IDs where the email address is missing, but consent is Y', function() {
      it('should return missing patient with consent value of Y and no email', function() {
           //This is where the test logic should go.
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });


describe('EmailConsent', function() {
    describe('#Emails were created in Emails Collection for patients who have CONSENT as Y', function() {
      it('should return boolean that emails were created for all persons with consent value Y', function() {
           //This is where the test logic should go.
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });


describe('EmailScheduled', function() {
    describe('#Emails for each patient are scheduled correctly', function() {
      it('should return verify that all emails are scheduled properly', function() {
           //This is where the test logic should go.
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });