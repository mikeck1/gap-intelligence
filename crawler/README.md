# Crawler

Node, Express & Postgres.
## Dependencies

We use **express** to serve the API, **body-parser** to parse responses, **postgres** for the database, **knex** as the query engine, **dotenv** to protect environment variables, **helmut** to add proper headers, **cors** to prevent/allow XSS, **morgan** as our logger, and **nodemon** as a dev dependency to watch for changes.

All dependencies are included in the cloned project.

## Instructions

Start Postgres

```
brew services start postgresql
createdb gap-intelligence
```


**Create a database table**

Open pSequel and run the following command. Change the table name to whatever you would like to name the table.

```
CREATE TABLE testtable2 (
 id serial PRIMARY KEY,
 title VARCHAR(300) UNIQUE NOT NULL,
 newsorg VARCHAR(4),
 pubtime BIGINT,
 body VARCHAR(1000),
 link VARCHAR(200),
 DATE VARCHAR(35),
 added TIMESTAMP NOT NULL
);
```
