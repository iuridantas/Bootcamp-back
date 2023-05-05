import { Franchise } from 'src/franchise/entities/franchise.entity';
import { CreateCallDto } from '../dto/create-call.dto';

export class Call extends CreateCallDto {
  id: string;
  franchise?: Franchise;
}
