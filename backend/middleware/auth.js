var jwt = require("jsonwebtoken");
var accessKey = "merakiProject";

modul.exports.verifyToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send('Request no autorizado');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null')
        return res.status(401).send('Request no autorizado');
    let payload = jwt.verify(token,accessKey);
    if(!payload)
        return res.status(401).send('Request no autorizado');
    req.user = payload.user
    next()
}

module.exports.sign = (username)=>{
    let payload = {user: cliente[0]};
    return jwt.sign(payload, accessKey);
}