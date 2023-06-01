const jwt = require('jsonwebtoken');
const fs = require('fs');

const PublicKeyPath = 'keys/PublicKey.pem';

function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the request headers
    console.log("This is the split token from headers", token)
    const PublicKey = fs.readFileSync(PublicKeyPath);
    const decoded = jwt.verify(token, PublicKey, { algorithms: ['RS256'] });

    req.user = decoded; // Set the decoded user in the request object

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
