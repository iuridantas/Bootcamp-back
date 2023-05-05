import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateFinanceDto {
  @ApiProperty()
  @IsString()
  tier: string;

  @ApiProperty()
  @IsNumber()
  score_performed: number;

  @ApiProperty()
  @IsNumber()
  MRR: number;

  @ApiProperty()
  @IsNumber()
  MDR: number;

  @ApiProperty()
  @IsNumber()
  commission: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  closed_at?: Date;

  @ApiProperty()
  @IsString()
  franchiseId: string;
}
