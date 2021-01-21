# TICKITZ BACKEND

## Overview

Tickitz Backend is an application that is intended to build the server side of the Tickitz application

## Installation & Local Run

1. `npm install`
2. `npx nodemon`

## Usage
### Environment Variables
Please refer to the `.env-example` file
```
NODE_ENV=

APP_PORT=
APP_URL=

DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

### API Call
```
GET http://localhost:PORT/movies
GET http://localhost:PORT/cinemas
GET http://localhost:PORT/genre
GET http://localhost:PORT/movies/:id
GET http://localhost:PORT/cinemas/:id
GET http://localhost:PORT/genre/:id
POST http://localhost:PORT/movies
POST http://localhost:PORT/cinemas
POST http://localhost:PORT/genre
PATCH http://localhost:PORT/movies/:id
PATCH http://localhost:PORT/cinemas/:id
PATCH http://localhost:PORT/genre/:id
```

### Response
```json
{
  "success" : true or false,
  "message" : "Success or failed",
  "results" : [{ "results" }]
}
``` 