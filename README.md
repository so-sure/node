# Node Docker Server
SO-SURE Node JS Task Repo

## Setup

1. Clone the repository
2. Execute the following commands:
```
cd ./node
docker-compose build
docker-compose up -d
```

The above commands will create docker images and run the following servers:
```
Web
http://localhost:1234/
```
```
Mongo
localhost:27017
Database: so-sure
no auth required for localhost
```
```
MySQL
localhost:3306 
Database: so-sure
User: root
Password: password
```


