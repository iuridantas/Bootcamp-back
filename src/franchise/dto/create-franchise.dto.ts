import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFranchiseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  cnpj: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @IsString()
  plan: string;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  zip_code: string;

  @ApiProperty()
  @IsString()
  field_of_activity: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  closed_at?: Date;
}
