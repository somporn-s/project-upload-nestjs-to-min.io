import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';

@Injectable()
export class AppService {
  private minioClient: Minio.Client;
  private bucketName: string = 'test-upload';

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: 'localhost', // URL ของ MinIO server
      port: 9000, // Port ของ MinIO
      useSSL: false, // ใช้ SSL หรือไม่
      accessKey: 'i7hnoUi6SSUZjlbYuVRR', // Access key ของ MinIO
      secretKey: 'XjxF4fRxWgjiyanM3EL52pFFULnHVUC7MsPh9DFp', // Secret key ของ MinIO
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const objectName = file.originalname;

    try {
      // อัปโหลดไฟล์ไปยัง MinIO
      const fileBuffer = fs.readFileSync(file.path);

      const info = await this.minioClient.putObject(
        this.bucketName,
        objectName,
        fileBuffer,
      );
      console.log('info', info);

      return `File uploaded successfully: ${objectName}`;
    } catch (err) {
      throw new Error(`File upload failed: ${err.message}`);
    }
  }
}
