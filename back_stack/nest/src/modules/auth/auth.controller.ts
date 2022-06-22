import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';

// Swagger
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// DTOs
import { UserOutputDto } from 'src/dtos/user/userOutputDto';
import { UserInputDto } from 'src/dtos/user/userInputDto';


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
}
