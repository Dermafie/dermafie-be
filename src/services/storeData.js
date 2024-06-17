// src/services/storeData.js
const { History } = require('../models');

const storeHistory = async (userId, diseaseId, imageURL, result) => {
    try {
        await History.create({
            userId,
            diseaseId,
            scanDate: new Date(),
            imageURL,
            scanResult: result
        });
    } catch (error) {
        console.error('Error storing history:', error);
        throw error;
    }
};

module.exports = storeHistory;
