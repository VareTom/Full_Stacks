import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenPayloadInterface {
  @IsNotEmpty()
  @IsString()
  userUuid: string;
  
  @IsNumber()
  @IsNotEmpty()
  iat: number;
  
  @IsNumber()
  @IsNotEmpty()
  exp: number
}
