

What is the advantages and disadvantage of creating?

Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/

ALWAYS THINK ABOUT CORNER CASES

Write code with proper validations for POST /request/review/:status/:requestId

Thought process - POST vs GET

Read about ref and populate https://mongoosejs.com/docs/populate.html

Create GET /user/requests/received with all the checks

Create GET GET /user/connections

Logic for GET /feed API

Explore the $nin , $and, $ne and other query operatorators

Pagination

NOTES:

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

/feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)

skip = (page-1)*limit;
 


