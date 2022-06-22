import { IsInstance, IsNotEmpty, IsNumber } from 'class-validator';

// DTOs
import { UserInfoOutputDto } from 'src/dtos/user/userInfoOutputDto';

export class TokenPayloadInterface {
  @IsNotEmpty()
  @IsInstance(UserInfoOutputDto)
  user: UserInfoOutputDto;
  
  @IsNumber()
  @IsNotEmpty()
  iat: number;
  
  @IsNumber()
  @IsNotEmpty()
  exp: number
}
