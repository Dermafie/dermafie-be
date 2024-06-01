const e = require('express');
const { User } = require('../models');

exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({
            message: 'User found',
            data: user,
            error_code: 0
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await User.create({
            name,
            email,
            password,
        });

        return res.status(201).json({
            message: 'User created',
            data: newUser,
            error_code: 0
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};