import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  closed_at?: Date;

  @ApiProperty()
  @IsString()
  franchiseId: string;
}
