import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  LoginUserDto,
  RegisterUserDto,
} from '../../../auth/entities/user/user.dto';
import { AuthAggregateService } from '../../aggregates/auth-aggregate/auth-aggregate.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authAggregateService: AuthAggregateService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async registerUser(@Body() payload: RegisterUserDto) {
    return this.authAggregateService.registerUser(payload).toPromise();
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async loginUser(@Body() payload: LoginUserDto) {
    return this.authAggregateService.login(payload).toPromise();
  }

  @Post('logout')
  async UserLogout(@Req() req) {
    return await this.authAggregateService.logout(req).toPromise();
  }
}
