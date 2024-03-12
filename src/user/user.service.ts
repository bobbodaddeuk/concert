import _ from 'lodash';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from './types/userRole.type';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  // 회원가입
  async register(
    email: string,
    password: string,
    age: number,
    name: string,
    role: Role,
  ) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('해당 이메일로 가입된 사용자가 있습니다.');
    }
    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      age,
      name,
      role,
      point: 1000000,
    });
  }

  // 로그인
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  // 프로필 조회
  async findUserById(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) {
      throw new NotFoundException('해당하는 유저가 존재하지 않습니다.');
    }
    return foundUser;
  }
}
