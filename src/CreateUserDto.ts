import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' }) // คำอธิบาย field
  name: string;

  @ApiProperty({
    example: 'example@mail.com',
  }) // ค่าตัวอย่าง
  email: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: any;
}
