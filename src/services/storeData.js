const { History } = require('../models');

const storeHistory = async (userId, diseaseId, imageURL, result) => {
    await History.create({
        userId,
        diseaseId,
        scanDate: new Date(),
        imageURL,
        result
    });
};

module.exports = storeHistory;
