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

# Taylor Petrillo Case Study
After SSHing into vagrant, use the following:
```
cd /vagrant
npm ci
npm run build
cd /build
node server.js
```

The server should still be accessible from localhost:1337
The available endpoints are as follows:

```
GET /phones
```
Returns all phones, or error message if none found

```
GET /phones/:id
```
Returns a phone with the given id, or error message if not found

```
DELETE /phones/:id
```
Deletes a phone with the given id
Returns a success message, or error message if not found/operation fails

```
PUT /phones/:id
```
Updates a phone with the given id
Returns a success message
or error message if the request is invalid/phone is not found/operation fails

Request is a JSON object matching the interface found in `/src/types/phone.ts`

Example:
```
{
    "model": "iPhone 11",
    "excess": 123
}
```

Validation matches the interface, for example a model of `iPhone 12` would fail validation.

## Known Issues
Validation for `monthlyPremium` fails unexpectedly for numbers ending in 00 `(ie. 2.00)`