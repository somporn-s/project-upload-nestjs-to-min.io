import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: './uploads', // กำหนดโฟลเดอร์ที่จัดเก็บไฟล์
    //     filename: (req, file, cb) => {
    //       const uniqueSuffix =
    //         Date.now() + '-' + Math.round(Math.random() * 1e9);
    //         console.log('file.fieldname',file.fieldname);
            
    //       cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    //     },
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
