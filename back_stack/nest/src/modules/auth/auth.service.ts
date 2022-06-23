import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// Services
import { JwtService } from '@nestjs/jwt';

// Entities
import { User } from 'src/core/entities/user.entity';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { UserInfoOutputDto } from 'src/dtos/user/userInfoOutputDto';
import { UserOutputDto } from 'src/dtos/user/userOutputDto';
import { UserInputDto } from 'src/dtos/user/userInputDto';

// Enums
import { Providers } from 'src/enums/providers';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY)
              private userRepository: typeof User,
              private readonly jwt: JwtService) {}
  
  async validateUser(uuid: string): Promise<UserInfoOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: uuid
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return new UserInfoOutputDto(user);
  }
  
  async connect(userInput: UserInputDto): Promise<UserOutputDto> {
    let user;
    console.log(userInput);
    if (userInput.isNewUser) {
      let userInfos;
      if (userInput.provider === Providers.TWITTER) {
        console.log(userInput);

        userInfos = {
          identifier: userInput.username,
          provider: Providers.TWITTER,
          profile_picture_url: userInput.profile['profile_image_url_https']
        }
      } else if (userInput.provider === Providers.GOOGLE) {
        userInfos = {
          identifier: userInput.profile['email'],
          provider: Providers.GOOGLE,
          profile_picture_url: userInput.profile['picture']
        }
      } else {
        throw new HttpException('Unknown provider!', HttpStatus.BAD_REQUEST);
      }

      user = await this.userRepository.create(userInfos);
    } else {
      if (userInput.provider === Providers.TWITTER) {
        user = await this.userRepository.findOne({ where: { identifier: userInput.username } });
      } else if (userInput.provider === Providers.GOOGLE) {
        user = await this.userRepository.findOne({ where: { identifier: userInput.profile['email'] } });
      }
    }

    if (!user) throw new HttpException('An error occured when retrieving user infos!', HttpStatus.INTERNAL_SERVER_ERROR);

    const formattedUser = new UserInfoOutputDto(user);
    const jwt = this.jwt.sign({ userUuid: formattedUser.uuid });
    if (!jwt) throw new HttpException('Token creation failed!', HttpStatus.INTERNAL_SERVER_ERROR);

    return {
      token: jwt,
      user: formattedUser
    };
  }

  async getOne(uuid: string): Promise<UserInfoOutputDto> {
    const user = await this.userRepository.findOne({
      where: { uuid: uuid }
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return new UserInfoOutputDto(user);
  }
}
