const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.refreshToken = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ 
            message: 'No token provided',
            error_code: 401
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err && err.name === 'TokenExpiredError') {
            try {
                const user = await User.findByPk(decoded.id);
                if (!user) return res.status(404).send({ message: 'User not found', error_code: 404 });

                const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ token: newToken });
            } catch (error) {
                return res.status(500).send({ message: 'Failed to refresh token', error_code: 500 });
            }
        } else {
            return res.status(401).send({ message: 'Failed to authenticate token', error_code: 401 });
        }
    });
};
