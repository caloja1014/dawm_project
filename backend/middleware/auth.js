var jwt = require("jsonwebtoken");
var accessKey = "merakiProject";

module.exports.verifyToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send('Request no autorizado');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null')
        return res.status(401).send('Request no autorizado');
    let payload = jwt.verify(token,accessKey);
    if(!payload)
        return res.status(401).send('Request no autorizado');
    req.userId = payload.userId
    next()
}

module.exports.verifyAdmin = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send('Request no autorizado');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null')
        return res.status(401).send('Request no autorizado');
    let payload = jwt.verify(token,"adminKey");
    if(!payload)
        return res.status(401).send('Request no autorizado');
    req.adminId = payload.adminId
    next()
}

module.exports.sign = (payload)=>{
    return jwt.sign(payload, accessKey);
}