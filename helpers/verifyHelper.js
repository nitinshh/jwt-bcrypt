const jwt = require('jsonwebtoken');
const secretKey = "secretKey";

module.exports = {
    verifyToken : (req, res, next) => {
        const token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, secretKey, (err, authData) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }
                req.authData = authData;
                next();
            });
        } else {
            res.status(403).json({ message: 'Token is not provided' });
        }
    }
}
