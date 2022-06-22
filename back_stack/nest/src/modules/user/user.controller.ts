import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param, Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { UserService } from 'src/modules/user/user.service';

// Guards
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

// DTOs
import { UserInfoOutputDto } from 'src/dtos/user/userInfoOutputDto';
import { UserUpdateInputDto } from 'src/dtos/user/userUpdateInputDto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(private readonly userService: UserService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserInfoOutputDto
  })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<UserInfoOutputDto> {
    return await this.userService.getOne(uuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserInfoOutputDto
  })
  @Put(':uuid')
  async update(@Param('uuid') uuid: string,
    @Body() user: UserUpdateInputDto): Promise<UserInfoOutputDto> {
    return await this.userService.update(user,uuid);
  }
}
