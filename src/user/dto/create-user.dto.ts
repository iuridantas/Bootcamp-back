import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  user_type: string;

  @ApiProperty()
  franchiseId?: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  closed_at?: Date;
}
