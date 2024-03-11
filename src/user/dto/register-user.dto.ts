import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsEnum,
} from 'class-validator';
import { Role } from '../types/userRole.type';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsInt()
  @Min(0, { message: '나이는 0 이상이어야 합니다.' })
  age: number;

  @IsEnum(Role, { message: '유효한 역할을 입력해주세요.' })
  role: Role;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  name: string;
}
