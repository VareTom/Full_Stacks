import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

// Enums
import { Providers } from 'src/enums/providers';

export class UserInputDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isNewUser: boolean;

  @ApiProperty()
  @IsEnum(Providers)
  @IsNotEmpty()
  provider: Providers;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  profile: Object;
}