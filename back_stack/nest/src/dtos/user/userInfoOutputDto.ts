import { Providers } from './../../enums/providers';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoOutputDto {

  @ApiProperty()
  @IsUUID(4)
  uuid: string;

  @ApiProperty()
  @IsString()
  identifier: string;

  @ApiProperty()
  @IsEnum(Providers)
  provider: Providers;

  @ApiProperty()
  @IsString()
  profilePictureUrl: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  constructor(json: any) {
    console.log(json);
    this.uuid = json.uuid;
    this.identifier = json.identifier;
    this.profilePictureUrl = json.profile_picture_url;
    if (Object.values(Providers).includes(json.provider)) this.provider = json.provider;

    this.createdAt = json.created_at;
    this.updatedAt = json.updated_at;
    this.deletedAt = json.deleted_at ?? null;
  }
}
