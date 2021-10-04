# Mongo CSV Scheduler

** Download repository and bring up docker**
run docker-compose up --build

** Import CSV **

After building and running the docker containers 
The application should be accessible on localhost3050.
Upon navigating to the url page, please press import. 
Upon importing the patients data should be ingested into the database.
Additionally a mailing schedule will be created per record with consent.
Then Press fetch to see the data imported. 

** Background worker **
A background worker would be running in the background running to see when the 
Day for that email has arrived and will execute in this case .
One scheduler was left for testing purpose and another one for daily.

** Testing **
When trying to run test you chould sh into the container and run npm run test
Or building the dockerfile.test as well.


