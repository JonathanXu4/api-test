# Using Node + Express + MongoDB + CLion
This repository contains code that shows how to create an application in CLion using the
 NodeJS and Express plugin.

The application will do the following:
- Add a person to the database
- Retrieve all people
- Retrieve people by name
- Delete people by name

## Steps
The steps that I have followed to create this application are:
1. Create GitHub repository, set .gitignore to Node
1. Clone repository
1. Create a CLion NodeJS Express Project on the repository directory: create from existing
 sources
1. Update vulnerability
1. Modified package.json to include `mongoose`
1. Modified package.json to enable deployment on Heroku
    ```
        "engines": {
           "node": "12.x"
         },
         "main": "./bin/www",
         "scripts": {
           "start": "node ./bin/www",
           "test": "echo \"Error: no test available\" && exit 1"
         },
         "keywords": [
           "nodejs",
           "heroku",
           "mongodb"
         ],
    ```
1. Copied bootstrap files to `./public/stylesheets` and `./public/javascript`.
2. Start modifications on `./routes/index.js`, changed the title to Friends. The purpose of the application will be to work with friends (CRUD).
3. Deleted `./routes/users.js` and added `./routes/friends.js`.
4. Updated `app.js` to use the routes file `friends.js`, changed the route to `/api/friends`
1. Modified `./views/index.pug` and `./views/layout` to show the main page with navigation bar. Found out that for the navbar to work JQuery needs to be included. Should we get that code downloaded, or should we just access the one online? Seems it is best to use the online versions, it loads faster, however there might be instances when we want to have our own copy: [https://stackoverflow.com/questions/3832446/benefits-vs-pitfalls-of-hosting-jquery-locally](Check Local vs Cloud on Stack Overflow)
2. Add code for a form to add friend, and then added the corresponding routes to hangle that. Right now it has placeholder code, need to check how to create the core of data handling. That should be the next step. Should we start with the /api/friends in class and check using Postman? And then build the Front End?
2.
1. Added routes:
   1. `router.post` on the People router to add a person
   1. `router.get` on the People router to get all people
   1. `router.get('/add_person')` on the index router
1. All people routes are preceded by /api.
1. Used `pug` instead of plain HTML
1. Deploy in Heroku:
   1. `heroku create arias-test-000 --buildpack https://github.com/heroku/heroku-buildpack
   -nodejs.git`
   1. `git push heroku master`
   1. Spin up server: `heroku ps:scale web=1`
   1. Set up production database (warning will work until nov/2020): `heroku addons:create
    mongolab` (Why does it have :sandbox?)
   1. **DOES NOT WORK WITHOUT CREDIT CARD**
   1. Checking mLab to connect directly
   1. Changed the URI of the mongo: `process.env.MONGODB_URI || mongodb://localhost/people`
   1. For the above to work, added `dotenv` to package.json
   1. Added first line of `app.js`: `require('dotenv').config();`
   1. About to test according to: [Guide to Connect MongoDB Atlas](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database)
   1. I tried the connection string but it did not work, so I moved to try to connect with
    the CLI client. It had a security issue, went to the network access of the admin panel
     on cloud.mongodb.com and added an IP address 0.0.0.0/0 basically any IP
   1. Found out that the user/pass of the site is different than the user pass of the
    database. The database is set on Security/Database Access on the dashboard
   1. Working using MongoDB Atlas as of 10/11
   1. Need to try to deploy to Heroku, and tried it and it works beautifully!




## Learned
- In `pug` formatting, indentation is fundamental
- Just need to connect to the database at the beginning of the program
- Mongoose Schemas help substantially

## To Do
Still need to figure out the following:
- Use bootstrap to improve appearance
- Create the Procfile (done)
- How to deploy in Heroku
- How to retrieve by name (certainly the ORM will take care of it, but I haven't implemented
 this as of 9/25)
- How to delete by name  (certainly the ORM will take care of it, but I haven't implemented
 this as of 9/25)
- All REST API for CRUD operations is done using GET, POST, PATCH and DELETE
- 
