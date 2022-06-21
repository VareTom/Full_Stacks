import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';

// Swagger
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// DTOs
import { UserCreateOutputDto } from 'src/dtos/user/userCreateOutputDto';
import { UserCreateInputDto } from 'src/dtos/user/userCreateInputDto';


@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({
    status: 200,
    type: UserCreateOutputDto
  })
  @Post()
  async connect(@Body() user: UserCreateInputDto): Promise<UserCreateOutputDto> {
    return await this.authService.connect(user);
  }
}
