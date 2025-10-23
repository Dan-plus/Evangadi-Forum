const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.secret; // secret key for JWT verification (same as in usercontroller.js)

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; // get Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // no token or wrong format
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1]; // extract token

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // verify token
        req.user = { userid: decoded.userid, username: decoded.username }; // attach user info to request
        next(); // proceed to next middleware or route
    } catch (error) {
        // invalid or expired token
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware; 
