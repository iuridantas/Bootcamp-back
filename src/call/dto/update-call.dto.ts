import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCallDto } from './create-call.dto';

export class UpdateCallDto extends PartialType(CreateCallDto) {
  @ApiProperty()
  id: string;
}
