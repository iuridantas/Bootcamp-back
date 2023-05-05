import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { AuthGuard } from '@nestjs/passport';
import { logged } from './decorators/logged.decorator';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body() user: CreateAuthDto) {
    try {
      return this.authService.validateUser(user);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async get(@logged() data: any) {
    return data;
  }
}
