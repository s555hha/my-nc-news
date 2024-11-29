<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">My-nc-news</h3>
  <p align="center">
    https://my-nc-news-2dfw.onrender.com
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This is my first attempt at a Backend project and its purpose is to access  data programmatically and return that to the front end.

Database chosen is PostgreSQL.

If you check endpoints.json for information regarding the endpoints for this API, there are examples of what each endpoint responds with.


<!-- GETTING STARTED -->
## Getting Started

First you will need to clone the repo, click code and copy the HTTPS URL.
 Then in your terminal you can clone the repo by running the command
git clone "URL"

### Prerequisites

In the root file, create two files 
1: .env.test file containing PGDATABASE=nc_news_test
2: .env.development containing PGDATABASE=nc_news.
* npm
  ```sh
  npm install
  ```

### Installation

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



<!-- USAGE EXAMPLES -->
## Setup database and seed

Once the dependencies are installed you can add the the databases and seen them data.

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

All testing was done with jest, to check that API is function correctly you can run
```bash
npm test app

```

