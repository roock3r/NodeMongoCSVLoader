const Agenda = require('agenda');
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require('mongodb').ObjectID


const dbURL = 'mongodb://mongo:27017/docker-healthcaresystem';

const agenda = new Agenda({
    db: {address: dbURL, collection: 'Agenda'},
    processEvery: '20 seconds',
    useUnifiedTopology: true
});


agenda.define('log hello healthcaresystem', async job => {
    const { name } = job.attrs;

    console.log(`Hello ${name} 👋`);
});

agenda.define('send mail', async (job,done) => {
    const now = new Date();
    // let client = new MongoClient(dbURL)

    const client =  await MongoClient.connect(dbURL, { useNewUrlParser: true })
    .catch(err => { console.log(err); });

    if (!client) {
      return;
  }

  try {

      const db = client.db('docker-healthcaresystem');

      let collection_mails = db.collection('mails');

      //const start = new Date(2021,9,5);  This was done to scheduler test of seeing if scheduler would work
      const start = new Date();
      start.setHours(0,0,0,0);

      //const end = new Date(2021,9,5); This was done to scheduler test of seeing if scheduler would work
      const end = new Date();
      end.setHours(23,59,59,999);

      let query_mail = { scheduled_date: {$gte: start, $lt: end} }

      let results_mail = await collection_mails.find(query_mail);

      mails = []

      await results_mail.forEach(function(mailObject) {
        mails.push(mailObject)
      })

      let collections_clients = db.collection('clients')

      for(const mail of mails){
        let query_client= { _id : new ObjectID(mail.id) }
        let client = await collections_clients.findOne(query_client)
        if(client.email.length > 0){
          console.log(`Sending email for ${mail.name} at address :${client.email} with client_id: ${mail.id}` )
        }else{
          console.log( `Unable to send email for ${mail.name} because of no email address available for client_id: ${mail.id}`)
        }
      }
  } catch (err) {

      console.log(err);
  } finally {

      client.close();
  }

  done();
});

(async function() {
    await agenda.start(); // Start Agenda instance

    await agenda.schedule('in 1 minutes', 'send mail'); // Run the dummy job every 1 minute.

    await agenda.schedule('in 1 days', 'send mail'); // Run the test job every 1 day.

    await agenda.schedule('in 5 minutes', 'log hello healthcaresystem', {name: 'healthcaresystem'}); // Run the dummy job in 5 minutes and passing data.
})();
