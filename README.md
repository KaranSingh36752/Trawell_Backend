7.5 ggjj﻿# Trawell_Backend
 -
 - Order
 - How express JS basically handles requests behind the scenes
 - Difference app.use and app.all
 - Wr

 - Validate data in Signup API
 - Install bcrypt package
 - Create PasswordHash using bcrypt.hash & save the user is excrupted password
 - Create login API
 - Compare passwords and throw errors if email or password is invalid

 - install cookie-parser
 - just send a dummy cookie to user
 - create GET /profile APi and check if you get the cookie back
 - install jsonwebtoken 
 - IN login API, after email and password validation, create e JWT token and send it to user in cookies
 - read the cookies inside your profile API and find the logged in user
 - userAuth Middleware
 - Add the userAuth middle ware in profile API and a new sendConnectionRequest API
 - Set the expiry of JWT token and cookies to 7 days
 - Create userSchema method to getJWT() 
 - Create UserSchema method to comparepassword(passwordInputByUser)

 - Explore tinder APIs
 - Create a list all API you can think of in Dev Tinder
 - Group multiple routes under repective routers
 - Read documentation for express.Router
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

 





