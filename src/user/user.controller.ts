import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.register(
      registerDto.email,
      registerDto.password,
      registerDto.age,
      registerDto.name,
      registerDto.role,
    );
  }

  // 로그인
  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    return await this.userService.login(LoginDto.email, LoginDto.password);
  }

  // 프로필 조회
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findUserById(+id);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
