import { IsInstance, IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTOs
import { UserInfoOutputDto } from 'src/dtos/user/userInfoOutputDto';

export class UserOutputDto {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  token: string;
  
  @ApiProperty({
    type: UserOutputDto
  })
  @IsInstance(UserOutputDto)
  @IsNotEmpty()
  user: UserInfoOutputDto;
}