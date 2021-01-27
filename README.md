# TICKITZ BACKEND

## Overview

Tickitz Backend is an application that is intended to build the server side of the Tickitz application

## Installation & Local Run

1. `npm install`
2. `npx nodemon`

## Usage
### Environment Variables
Please refer to the `.env.example` file
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

`POST http://localhost:PORT/auth/register` Route for register user
`POST http://localhost:PORT/auth/login` Route for login user
`POST http://localhost:PORT/auth/forgotPassword` Route for forgot password user
`PATCH http://localhost:PORT/auth/resetPassword` Route for reset password user
`GET http://localhost:PORT/users/:id` Route for user details
`PATCH http://localhost:PORT/users/updateProfile/:id` Route for update user profile
`GET http://localhost:PORT/movies` Route for get all movies
`GET http://localhost:PORT/movies/:id` Route for get movie details
`POST http://localhost:PORT/movies` Route for add new movie
`PATCH http://localhost:PORT/movies/:id` Route for update movie
`DELETE http://localhost:PORT/movies/:id` Route for delete movie
`GET http://localhost:PORT/cinemas` Route for get all cinemas
`GET http://localhost:PORT/cinemas/:id` Route for get cinema details
`POST http://localhost:PORT/cinemas` Route for add new cinema
`PATCH http://localhost:PORT/cinemas/:id` Route for update cinema
`DELETE http://localhost:PORT/cinemas/:id` Route for delete cinema
`GET http://localhost:PORT/genre` Route for get all genres
`GET http://localhost:PORT/genre/:id` Route for get genre details
`POST http://localhost:PORT/genre Route` for add new genre
`PATCH http://localhost:PORT/genre/:id` Route for update genre
`DELETE http://localhost:PORT/genre/:id` Route for delete genre
`POST http://localhost:PORT/showtimes` Route for add new showtime
`PATCH http://localhost:PORT/showtimes/:id` Route for update showtime
`DELETE http://localhost:PORT/showtimes/:id` Route for delete showtime
`POST http://localhost:PORT/showtimes/searchLocation` Route for search location cinema
`GET http://localhost:PORT/seats/:id` Route for get seatSold by idShowtime


### Response
```json
{
  "status"  : "200, 400, 401, 404"
  "success" : true or false,
  "message" : "Success or failed",
  "results" : [{ "results" }]
}
``` 