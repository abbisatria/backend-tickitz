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

1. `POST http://localhost:PORT/auth/register` Route for register user
2. `POST http://localhost:PORT/auth/login` Route for login user
3. `POST http://localhost:PORT/auth/forgotPassword` Route for forgot password user
4. `PATCH http://localhost:PORT/auth/resetPassword` Route for reset password user
5. `GET http://localhost:PORT/users/:id` Route for user details
6. `PATCH http://localhost:PORT/users/updateProfile/:id` Route for update user profile
7. `GET http://localhost:PORT/movies` Route for get all movies
8. `GET http://localhost:PORT/movies/:id` Route for get movie details
9. `POST http://localhost:PORT/movies` Route for add new movie
10. `PATCH http://localhost:PORT/movies/:id` Route for update movie
11. `DELETE http://localhost:PORT/movies/:id` Route for delete movie
12. `GET http://localhost:PORT/cinemas` Route for get all cinemas
13. `GET http://localhost:PORT/cinemas/:id` Route for get cinema details
14. `POST http://localhost:PORT/cinemas` Route for add new cinema
15. `PATCH http://localhost:PORT/cinemas/:id` Route for update cinema
16. `DELETE http://localhost:PORT/cinemas/:id` Route for delete cinema
17. `GET http://localhost:PORT/genre` Route for get all genres
18. `GET http://localhost:PORT/genre/:id` Route for get genre details
19. `POST http://localhost:PORT/genre Route` for add new genre
20. `PATCH http://localhost:PORT/genre/:id` Route for update genre
21. `DELETE http://localhost:PORT/genre/:id` Route for delete genre
22. `POST http://localhost:PORT/showtimes` Route for add new showtime
23. `PATCH http://localhost:PORT/showtimes/:id` Route for update showtime
24. `DELETE http://localhost:PORT/showtimes/:id` Route for delete showtime
25. `POST http://localhost:PORT/showtimes/searchLocation` Route for search location cinema
26. `GET http://localhost:PORT/seats/:id` Route for get seatSold by idShowtime


### Response
```json
{
  "status"  : "200, 400, 401, 404"
  "success" : true or false,
  "message" : "Success or failed",
  "results" : [{ "results" }]
}
``` 

### Documentation Postman
* [Tickitz Backend](https://documenter.getpostman.com/view/12252506/TW6wJTr7)