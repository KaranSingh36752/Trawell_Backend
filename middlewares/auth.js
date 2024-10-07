const isAdminAuth = (req,res,next)=>{
    const token = "xhgnjfhcgyz";
    const isAuthorized = token == "xyz";
    if(!isAuthorized){
        res.status(401).send("Not authorized token")
    }
    else next();
}

const isUserAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthorized = token == "xyz";
    if(!isAuthorized){
        res.status(401).send("Not authorized token")
    }
    else next();
}
module.exports = {
    isAdminAuth,
    isUserAuth
}