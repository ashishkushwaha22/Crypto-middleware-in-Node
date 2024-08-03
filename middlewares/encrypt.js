const crypto = require('crypto');
require('dotenv').config();


const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // Generate a random IV (initialising vector) for each encryption
    const cipher = crypto.createCipheriv(process.env.ALGORITHM, Buffer.from(process.env.SECRET_KEY, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        "iv": iv.toString('hex'),
        "data": encrypted
    };
};


const encryptMiddleware = (req, res, next) => {

    if (req.headers.env !== "at_dev") {
        const originalSend = res.send;
        res.send = function(data){
            const encryptedData = encrypt(JSON.stringify(data));
            res.send = originalSend;
            originalSend.call(this, encryptedData);
        };
    }
    next();
};


module.exports = {
    encrypt,
    encryptMiddleware
}



