const validator = require("validator")
const validSignUpData = (req) => {
    const {firstName, age , emailId , password} = req.body;

    if(!firstName){
        throw new Error("Name is required!!");
    }
    else if(age<18 || age>80){
        throw new Error("Age should be between 18 and 80");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password should be strong");
    }
}

module.exports = {
    validSignUpData
}