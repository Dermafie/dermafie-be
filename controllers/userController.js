const e = require('express');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');

// exports.getUserById = async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const user = await User.findByPk(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         return res.status(200).json({
//             message: 'User found',
//             data: user,
//             error_code: 0
//         });
//     } catch (error) {
//         console.error('Error fetching user by ID:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

exports.createUser = async (req, res) => {
    
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({
        where: {
          email
        }
    })

    if(checkUser){
        return res.status(400).json({ 
            message: 'Email already exist' ,
            error_code: 400
        });
    }


    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.status(400).json({
              message: 'Failed to create user',
              error_code: 400
            })
        }

        return res.status(201).json({
            message: 'Successfully created user',
            error_code: 0
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error_code: 500
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ 
                message: 'User not found',
                error_code: 404
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ 
                message: 'Invalid password',
                error_code: 401
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: 'Successfully logged in',
            data: {
                user: user.id,
                name: user.name,
                token: token
            },
            error_code: 0
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            error_code: 500
        });
    }
};