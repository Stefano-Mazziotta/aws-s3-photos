import fs from 'fs'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { AWS_BUCKET_REGION, AWS_BUCKET_NAME, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from './config.js'

const s3Client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

export async function uploadFileToS3(file){
    const stream = fs.createReadStream(file.tempFilePath)

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: 'first-image.jpg',
        Body: stream
    }

    const command = new PutObjectCommand(uploadParams)
    return await s3Client.send(command)
}