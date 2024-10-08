import { Client, ClientOptions } from "minio";
import { AppError } from './errors/error';
import { promisify } from 'util';
import fs from 'fs';
import stream from 'stream';

export const minioClient = new Client({
    endPoint: process.env.MINIO_END_POINT as string,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string
});

export const uploadToMinio = async (bucketName: string, objectName: string, filePath: string) => {
    try {
        await minioClient.fPutObject(bucketName, objectName, filePath, {
            'Content-Type': 'image/jpeg',
        });
        return `File uploaded successfully.`;
    } catch (error) {
        throw new AppError(`Error uploading file: ${error}`);
    }
};