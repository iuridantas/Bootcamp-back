import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { randomUUID } from 'node:crypto';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { hash } from 'bcrypt';


function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return false;

  const isAllSame = /^(\d)\1{10}$/.test(cpf);
  if (isAllSame) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let mod = sum % 11;
  const firstDigit = mod < 2 ? 0 : 11 - mod;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  mod = sum % 11;
  const secondDigit = mod < 2 ? 0 : 11 - mod;

  return (
    parseInt(cpf.charAt(9)) === firstDigit &&
    parseInt(cpf.charAt(10)) === secondDigit
  );
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEntity = { ...createUserDto, id: randomUUID() };
    if (createUserDto.password.length <= 7) {
      throw new Exception(
        Exceptions.InvalidData,
        'Sua senha deve conter 8 digitos ou mais',
      );
    }
    const emailDomain = createUserDto.email.match(/[^@]+$/)?.[0];

    const allowedEmailDomains = ['gmail.com', 'hotmail.com'];
    if (!allowedEmailDomains.includes(emailDomain)) {
      throw new Exception(
        Exceptions.InvalidData,
        'O email fornecido não é um email de serviço de e-mail válido',
      );
    }

    if (!isValidCPF(createUserDto.cpf)) {
      throw new Exception(Exceptions.InvalidData, 'O CPF fornecido é inválido');
    }

    const hashed = await hash(createUserDto.password, 10);
    userEntity.password = hashed;

    const createdUser = await this.userRepository.createUser(userEntity);
    delete createdUser.password;
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userRepository.findUserById(id);
    delete foundUser.password;
    return foundUser;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const hashedPassword = await hash(updateUserDto.password, 10);
      const userToUpdate = { ...updateUserDto, password: hashedPassword };
      const updatedUser = await this.userRepository.updateUser(userToUpdate);
      return updatedUser;
    }
    const updateUser = await this.userRepository.updateUser(updateUserDto);
    delete updateUser.password;
    return updateUser;
  }

  async remove(id: string): Promise<string> {
    await this.userRepository.deleteUser(id);
    return 'Usuário excluido com sucesso';
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<User> {
    return await this.userRepository.activateClosedAt(id, closedAt);
  }

  async deactivateClosedAt(id: string): Promise<User> {
    return await this.userRepository.deactivateClosedAt(id);
  }
}
