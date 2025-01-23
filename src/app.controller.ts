import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './CreateUserDto';
import { diskStorage } from 'multer';

@ApiTags('Main') // หมวดหมู่ API
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' }) // คำอธิบาย API
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // กำหนดโฟลเดอร์ที่จัดเก็บไฟล์
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          console.log('file.fieldname', file.fieldname);

          cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateUserDto,
  ) {
    // console.log('fileBuffer',fileBuffer);
    // return {
    //   message: 'File uploaded successfully!',
    // };

    try {
      await this.appService.uploadFile(file);

      return {
        message: 'File uploaded successfully!',
        filename: file.filename,
      };
    } catch (error) {
      console.log(error);

      return {
        message: 'File uploaded Error!',
        filename: null,
      };
    }
  }
}
