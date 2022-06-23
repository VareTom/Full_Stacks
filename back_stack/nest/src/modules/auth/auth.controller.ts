import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';

// Swagger
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// DTOs
import { UserOutputDto } from 'src/dtos/user/userOutputDto';
import { UserInputDto } from 'src/dtos/user/userInputDto';
import { UserInfoOutputDto } from 'src/dtos/user/userInfoOutputDto';

// Guards
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';


@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({
    status: 200,
    type: UserOutputDto
  })
  @Post()
  async connect(@Body() user: UserInputDto): Promise<UserOutputDto> {
    return await this.authService.connect(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    type: UserOutputDto
  })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<UserInfoOutputDto> {
    return await this.authService.getOne(uuid);
  }
}
