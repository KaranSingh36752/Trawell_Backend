
Create login API

Compare passwords and throw errors if email or password is invalid

install cookie-parser

just send a dummy cookie to user

create GET /profile APi and check if you get the cookie back

install jsonwebtoken

IN login API, after email and password validation, create e JWT token and send it to user in cookies

read the cookies inside your profile API and find the logged in user

userAuth Middleware

Add the userAuth middle ware in profile API and a new sendConnectionRequest API

Set the expiry of JWT token and cookies to 7 days

Create userSchema method to getJWT()

Create UserSchema method to comparepassword(passwordInputByUser)

Explore tinder APIs

Create a list all API you can think of in Dev Tinder

Group multiple routes under repective routers

Read documentation for express.Router

Create routes folder for managing auth,profile, request routers

create authRouter, profileRouter, requestRouter

Import these routers in app.js

Create POST /logout API

Create PATCH /profile/edit

Create PATCH /profile/password API => forgot password API

Make you validate all data in every POST, PATCH apis

Create Connnection Request Schema

Send Connection Request API

Proper validation of Data

Think about ALL corner cases

$or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/

schema.pre("save") function

Read more about indexes in MongoDB

Why do we need index in DB?

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
 


