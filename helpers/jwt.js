const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email },
        process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

const verifyToken = async(token) => {
    const secret = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, secret);
    }catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};