const crypto = require('crypto');
const hash = crypto.createHash('sha1');
const hpassword = hash.write('password');
hash.end();

function sha1Encode(data) {
    // To be implemented!
    let hash = crypto.createHash('sha1');
     let response = hash.write(data);
     hash.end();
     return response;
}

module.exports.digestAuth = (request, response, next) => {
    // To be implemented!
    
    const authorization = request.headers.authorization;
    const encoded = authorization.replace('Basic ', '');
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');

    const [login, password] = decoded.split(':');
    let pwd = sha1Encode(password);
    if (login === 'node' && pwd === hpassword) {
        return next();
    }else {
        response.sendStatus(401);
    }
}