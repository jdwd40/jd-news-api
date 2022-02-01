Here’s the .md file
12:06
If you create a new file for it and then put the filename into your .gitignore file, it won’t get pushed to github
12:06

# BE Northcoders NC News Portfolio Check List

## Readme - Remove the one that was provided and write your own

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [x] Functions and variables have descriptive names

## Creating tables

- [x] Use `NOT NULL` on required fields
- [ ] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
  - Missing one for create table comments

## Inserting data

- [x] Drop tables and create tables in seed function in correct order
- [x] Make use of pg-format to insert data in the correct order

## Tests

- [x] Seeding before each test
- [x] Descriptive `it`/`test` block descriptions
  - Some tests aren’t needed e.g. 200: returns array length
- [x] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [x] Evidence of building up complex query endpoints using TDD
- [ ] Ensure all tests are passing
- [ ] Cover all endpoints and errors
- `GET /api/topics`
  - [x] Status 200, array of topic objects
- `GET /api/articles/:article_id`
  - [x] Status 200, single article object (including `comment_count`)
  - [x] Status 400, invalid ID, e.g. string of “not-an-id”
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
    - Id is valid but doesn’t exist -> 404 not 400
- `PATCH /api/articles/:article_id`
  - [x] Status 200, updated single article object
    - Be sure to send back only the article as an object, not an array containing the object
  - [x] Status 400, invalid ID, e.g. string of “not-an-id”
  - [ ] Status 400, invalid inc_votes type, e.g. property is not a number
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, missing `inc_votes` key. No effect to article.
- `GET /api/articles`
  - [ ] Status 200, array of article objects (including `comment_count`, excluding `body`)
  - [x] Status 200, default sort & order: `created_at`, `desc`
  - [ ] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [ ] Status 200, accepts `order` query, e.g. `?order=desc`
  - [ ] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [x] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [ ] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [ ] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
  - [ ] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`
- `GET /api/articles/:article_id/comments`
  - [ ] Status 200, array of comment objects for the specified article
    - Responding with an array, not an array of objects. Change this test
  - [ ] Status 400, invalid ID, e.g. string of “not-an-id”
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, valid ID, but has no comments responds with an empty array of comments
- `POST /api/articles/:article_id/comments`
  - [ ] Status 201, created comment object
    - Needs finishing
  - [ ] Status 400, invalid ID, e.g. string of “not-an-id”
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [x] Status 400, missing required field(s), e.g. no username or body properties
  - [ ] Status 404, username does not exist
  - [ ] Status 201, ignores unnecessary properties
- `DELETE /api/comments/:comment_id`
  - [x] Status 204, deletes comment from database
  - [ ] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g “not-an-id”
- `GET /api`
  - [ ] Status 200, JSON describing all the available endpoints

## Routing

- [ ] Split into api, topics, users, comments and articles routers
- [ ] Use `.route` for endpoints that share the same path

## Controllers

- [x] Name functions and variables well
- [x] Add catch blocks to all model invocations (and don’t mix use of`.catch(next);` and `.catch(err => next(err))`)
- Can refactor destructuring into 1 line

## Models

- Protected from SQL injection
- [x] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
- [ ] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format’s `%s`
  - Needs to be moved from controller into model. Model handles all data manipulation, not the controllers responsibility
- [x] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] Use `LEFT JOIN` for comment counts

## Errors

- [x] Use error handling middleware functions in app and extracted to separate directory/file
- [ ] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `GET /api/users`
  - [ ] Status 200, responds with array of user objects
- `GET /api/users/:username`
  - [ ] Status 200, responds with single user object
  - [ ] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g “not-an-id”
- `PATCH /api/comments/:comment_id`
  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of “not-an-id”
  - [ ] Status 400, invalid inc_votes type, e.g. property is not a number
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, missing `inc_votes` key. No effect to comment.
