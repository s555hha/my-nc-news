<a id="readme-top"></a>

<br />
<div align="center">
<h1 align="center">My-nc-news</h1>
  <p align="center">
    https://my-nc-news-2dfw.onrender.com
  </p>
</div>

## About The Project

This is my first attempt at a Backend project and its purpose is to access  data programmatically and return that to the front end.

Database chosen is PostgreSQL.

If you check endpoints.json for information regarding the endpoints for this API, there are examples of what each endpoint responds with.

## Getting Started

First you will need to clone the repo, click code and copy the HTTPS URL.
 Then in your terminal you can clone the repo by running the command
git clone https/url

## Prerequisites

In the root file, create two files 
1: .env.test file containing PGDATABASE=nc_news_test
2: .env.development containing PGDATABASE=nc_news.

## Installation

You will now need to install the dependecies shown below

* npm
  ```sh
  npm install
  ```

  ## Dependencies

* PostgreSQL
  ```sh
  npm install pg
  ```
* express
  ```sh
  npm install express
  ```
* pg-format
  ```sh
  npm install pg-format
  ```
  * dotenv
  ```sh
  npm install -D dotenv
  ```
  * jest
  ```sh
  npm install -D jest
  ```
    * jest-sorted
  ```sh
  npm install -D jest-sorted
  ```
    * nodemon
  ```sh
  npm install -D nodemon
  ```
    * supertest
  ```sh
  npm install -D supertest
  ```

## Setup database and seed

Once the dependencies are installed you can add the the databases and seed them data with the commands below.

* Create a new database
     ```bash
     npm run setup-dbs
     ```
* Seed the database:
   ```bash
   npm run seed
   ```
* Start the server:
   ```bash
   npm start
   ```


## Testing

All testing was done with jest, to check that API is functioning correctly you can run
```bash
npm test app
```
