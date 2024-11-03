7.5 ggjj﻿# Trawell_Backend
 -
 - Order
 - How express JS basically handles requests behind the scenes
 - Difference app.use and app.all
 - Write a dum
 - Make your signup API dynamic to recive data from the end user
 - User.findOne with duplucate email ids, which object returned
 - API- Get user by email
 - API - Feed API - GET /feed - get all the users from the database
 - API - Get user by ID
 - Create a delete user API
 - Difference between PATCH and PUT
 - API - Update a user
 - Explore the Mongoose Documention for Model methods
 - What are options in a Model.findOneAndUpdate method, explore more about it
 - API - Update the user with email ID

 - Explore schematype options from the documention
 - add required, unique, lowercase, min, minLength, trim
 - Add default
 - Create a custom validate function for gender
 - Improve the DB schema - PUT all appropiate validations on each field in Schema
 - Add timestamps to the userSchema
 - Add API level validation on Patch request & Signup post api
 - DATA Sanitizing - Add API validation for each field
 - Install validator
 - Explore validator library funcation and Use vlidator funcs for password, email, photoURL
 - NEVER TRUST req.body

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

 





