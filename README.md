 for express.Router
 - Create routes folder for managing auth,profile, request routers
 - create authRouter, profileRouter, requestRouter
 - Import these routers in app.js
 - Create POST 





NOTES: 

 /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

 /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

 /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

 /feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)

skip = (page-1)*limit;

 





