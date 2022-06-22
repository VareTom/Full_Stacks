import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// Interfaces
import { TokenPayloadInterface } from 'src/core/interfaces/tokenPayload.interface';

// DTOs
import { UserInfoOutputDto } from 'src/dtos/user/userInfoOutputDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }
  
  async validate(payload: TokenPayloadInterface): Promise<UserInfoOutputDto> {
    return this.authService.validateUser(payload.user.uuid);
  }
}
