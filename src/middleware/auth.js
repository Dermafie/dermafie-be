const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ 
            message: 'Access denied',
            error_code: 401
        });
    }

    try {
        const result = await verifyToken(token);
        const user = await User.findByPk(result.id);

        if (!user) {
            return res.status(404).json({ 
                message: 'Authentication failed',
                error_code: 404
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired',
                error_code: 401,
                expiredAt: error.expiredAt
            });
        }
        console.error('Error authenticating user:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error_code: 500 
        });
    }
}
