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

const validUpdateData = (req) => {
    const {firstName,lastName , gender , image ,age, about } = req.body;
    const user = req.body;
    const ALLOWED_UPDATES = ["firstName", "lastName","gender", "image","age","about"]
    const isEditAllowed = Object.keys(user).every((keys) => ALLOWED_UPDATES.includes(keys));
    
    if(!firstName || !lastName){
        throw new Error("Name is required!!");
    }else if(!gender){
        throw new Error("Gender is required!!");
    }else if(!["male" , "female" , "others"].includes(gender.toLowerCase())){
        throw new Error("Invalid Gender");
    }else if(age < 18 && age > 80){
        throw new Error("Age should be between 18 and 80");
    }
    
    return isEditAllowed;
}

module.exports = {
    validSignUpData , 
    validUpdateData
}