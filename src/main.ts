import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('API Documentation') // ชื่อเอกสาร
  .setDescription('API documentation for your application') // คำอธิบาย
  .setVersion('1.0') // เวอร์ชันของเอกสาร
  .addBearerAuth() // เพิ่ม Authentication (ถ้าจำเป็น)
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // กำหนด endpoint สำหรับ Swagger

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
