import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Entities
import { User } from 'src/core/entities/user.entity';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { UserInfoOutputDto } from 'src/dtos/user/userInfoOutputDto';
import { UserUpdateInputDto } from 'src/dtos/user/userUpdateInputDto';


@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User
  ) {}

  async getOne(uuid: string): Promise<UserInfoOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: uuid
      }
    });
    
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return new UserInfoOutputDto(user);
  }
  
  async update(userInput: UserUpdateInputDto, uuid: string): Promise<UserInfoOutputDto> {
    const user = await this.userRepository.findByPk(uuid);
    if (!user) throw new HttpException('No user with this identifier', HttpStatus.BAD_REQUEST);
    
    return this.userRepository.update(userInput,{
      where: { uuid: user.uuid }
    })
      .then(async () => {
        const updatedUser = await this.userRepository.findByPk(user.uuid);
        return new UserInfoOutputDto(updatedUser);
    })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') throw new HttpException(`Email already registered`, HttpStatus.BAD_REQUEST);
        throw new HttpException(`User not updated`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
