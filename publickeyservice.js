const jwt = require('jsonwebtoken')
const fs =  require('fs')

const PublicKeyPath = "keys/PublicKey.pem";

function verifyToken(token) {
    try{
        const PublicKey = fs.readFileSync(PublicKeyPath);
        const decoded = jwt.verify(token, PublicKey, {algorithms: ['RS256']});
        return decoded;
    } catch(error){
        console.error("Tokben verification error", error.message)
        return null;
    }
}

module.exports = {
    verifyToken
};