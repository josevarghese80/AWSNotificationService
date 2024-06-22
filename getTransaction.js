const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const { transactionId } = event;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `transactions/${transactionId}.json`
    };

    try {
        const data = await s3.getObject(params).promise();
        const transactionDetails = JSON.parse(data.Body.toString('utf-8'));
        console.log('Transaction details retrieved:', transactionDetails);
        return transactionDetails;
    } catch (error) {
        console.error('Error retrieving transaction details:', error);
        throw error;
    }
};
