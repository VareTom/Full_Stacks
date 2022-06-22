import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  profile_picture_url: string;
}