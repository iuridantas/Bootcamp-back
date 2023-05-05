import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: CreateAuthDto) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new Exception(
        Exceptions.UnauthorizedException,
        'Email não cadastrado',
      );
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new Exception(Exceptions.UnauthorizedException, 'Senha invalida');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        name: user.name,
        user_type: user.user_type,
      }),
      user,
    };
  }

  async getUserEmail(email: string): Promise<User> {
    return await this.userService.findUserByEmail(email);
  }
}
