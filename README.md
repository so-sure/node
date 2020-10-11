# Node Vagrant Server
Base node.js app repository

## Setup

Clone the repository

```
vagrant up
vagrant ssh
cd /vagrant
node app.js
```

The server should then be accessible from localhost:1337 on them host machine

If you want to use a database:
Mysql and Mongo are both installed on the vagrant machine
To access the from a db manager, use a SSH tunnel:

```
localhost:2222
user: vagrant
pwd:  vagrant
```
Then use the usual basic connections ( Feel free to create your own users etc...):

Mongo:
```
127.0.0.1:27017
user: root
pwd:  root
```

Mysql:
```
127.0.0.1:3306
user: root
pwd:  root
```


# Notes

 - Vagrant downloaded a whole VM image. On my connection took 20mins to download.
 - Had to install VirtualBox.

There was an error with the database initialised, while a user was created, a database was not
It could provide an error like this:
```
mongodb://root:root@127.0.0.1:27017/so-sure-node
(node:18806) UnhandledPromiseRejectionWarning: MongoError: Authentication failed.
> Caused by db not existing.. added `use so-sure-node` to mongo-users.sh
```

There is an error with Vegrant/VirtualBox which makes installing npm packages difficult
```
vagrant@dev:/vagrant$ rm -rf node_modules/
vagrant@dev:/vagrant$ npm i
npm WARN vagrant No repository field.
npm WARN vagrant No license field.

npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /vagrant/node_modules/send/node_modules/ms/package.json.730447652
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, open '/vagrant/node_modules/send/node_modules/ms/package.json.730447652'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/vagrant/.npm/_logs/2020-10-08T13_00_50_854Z-debug.log
vagrant@dev:/vagrant$ 
```
This is worked around in my instance by running `npm i` on the host machine before starting up the application.
However this is not a viable solution for production where we potentially would not have access to the host machine
This also does not take into account the potential for issues between mac/linux/windows using a node_modules from a 
machine that is not designed to run on. Your milage may vary dramatically but was not an issue in my instance

 - Kept work to a single table for the most part, generally Manufacturer would be abstracted out to form a relationship so queries could be performed based on say "Apple" products
 - As to be expected I used mongodb as the core database, as I generally lean on it in a prototype scenario as its easier to manipulate drastic changes until the structure is nailed
 - Connection to db is assumed to be working, there is no actual validation of the connection and will throw exceptions if isn't actually connected when an api call is made, for production this should be updated.
 - Javascript floating point is known to have what we could call rounding errors. Which we don't want in any circumstance, so tricks were performed to ensure the number is stored accurately
 - There is no validation on any INSERT or UDPATE endpoints, I would normally use something like validate.js and casl to handle validation and permissions so in the same way as params, is handled before the handler is invoked
 - There is no logging, this would be unacceptable in production as we need performance metrics to decipher what is going on under the hood
 - GET returns the whole DB object, this is not practical in a production envrionment as it reveals how entities are kept inside the DB which is useful for reverse engineering/injection/hacking
 - Typo in own documentation: localhost:1338 should have been 1337
 - Bug: StartDate and EndDate do not work correctly
 - CORS was added out of likelyhood something like this would be used in a web application
 - There should be no additional installation steps, the database is automatically seeded if there are 0 entries. So clean your installation if you run into issues
 