const crypto = require('crypto');
require('dotenv').config();


const decrypt = (encryption) => {
    // console.log("IV: ",encryption.iv);
    const iv = Buffer.from(encryption.iv, 'hex');
    const decipher = crypto.createDecipheriv(process.env.ALGORITHM, Buffer.from(process.env.SECRET_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryption.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};


const decryptMiddleware = (req, res, next) => {

    if (req.headers.env !== "at_dev") {
        if (req.body && Object.keys(req.body).length > 0) {
            const data = decrypt(req.body);
            req.body = data;
        }
    }
    next();
};


module.exports = {
    decrypt,
    decryptMiddleware
}