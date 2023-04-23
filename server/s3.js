import fs from 'fs'
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { AWS_BUCKET_REGION, AWS_BUCKET_NAME, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from './config.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

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
        Key: file.name,
        Body: stream
    }

    const command = new PutObjectCommand(uploadParams)
    return await s3Client.send(command)
}

export async function getFilesFromS3(){
    const getFilesParams = {
        Bucket: AWS_BUCKET_NAME,
    }

    const command = new ListObjectsCommand(getFilesParams)
    return await s3Client.send(command)
}

export async function getFileFromS3(fileName){
    const getFileParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName
    }

    const command = new GetObjectCommand(getFileParams)
    return await s3Client.send(command)
}

export async function getFileUrl(fileName){
    const getFileParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName
    }

    const command = new GetObjectCommand(getFileParams)
    return await getSignedUrl(s3Client, command, { expiresIn: 10 })
}