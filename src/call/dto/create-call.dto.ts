import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateCallDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  closed_at?: Date;

  @ApiProperty()
  @IsString()
  franchiseId: string;
}
