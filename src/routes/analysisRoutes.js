// src/routes/analysisRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const upload = require('../helpers/multer');
const predictDisease = require('../services/inferenceService');
const storeHistory = require('../services/storeData');
const bucket = require('../helpers/storage');
const { History, Disease } = require('../models');

router.post('/', authenticate, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            message: 'Please upload an image',
            error_code: 400
        });
    }

    try {
        const userId = req.user.id;
        const filename = `imageAnalysis/image_${Date.now()}_${userId}.jpg`;
        const blob = bucket.file(filename);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: 'image/jpeg'
            }
        });

        blobStream.on('error', (err) => {
            console.error('Error uploading image:', err);
            return res.status(500).json({ 
                message: 'Internal server error',
                error_code: 500
            });
        });

        blobStream.on('finish', async () => {
            try {
                const imageURL = `https://storage.googleapis.com/${bucket.name}/${filename}`;
                
                const { prediction, probability } = await predictDisease(req.file.buffer);

                const disease = await Disease.findOne({ 
                    where: { name: prediction },
                    attributes: ['id', 'name', 'description', 'effects', 'solution'] // Adjust attributes to include the desired fields
                });

                if (!disease) {
                    return res.status(404).json({
                        message: 'Disease not found',
                        error_code: 404
                    });
                }

                await storeHistory(userId, disease.id, imageURL, prediction);

                return res.status(200).json({
                    message: 'Analysis complete',
                    data: {
                        prediction,
                        probability,
                        imageURL,
                        disease: {
                            name: disease.name,
                            description: disease.description,
                            effects: disease.effects,
                            solution: disease.solution
                        }
                    },
                    error_code: 0
                });
            } catch (error) {
                console.error('Error saving analysis result:', error);
                return res.status(500).json({ 
                    message: 'Internal server error',
                    error_code: 500
                });
            }
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        console.error('Error analyzing image:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error_code: 500
        });
    }
});

router.get('/history', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        const histories = await History.findAll({
            where: { userId },
            include: {
                model: Disease,
                as: 'disease', // Specify the alias used in the association
                attributes: ['name', 'description', 'effects', 'solution']
            },
            attributes: ['id', 'scanDate', 'scanResult', 'imageURL', 'createdAt', 'updatedAt']
        });

        return res.status(200).json({
            message: 'Fetch history complete',
            data: histories,
            error_code: 0
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error_code: 500
        });
    }
});

module.exports = router;
