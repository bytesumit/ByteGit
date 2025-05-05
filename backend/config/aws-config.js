require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");

// ✅ Create S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const S3_BUCKET = process.env.S3_BUCKET;
module.exports = { s3, S3_BUCKET };