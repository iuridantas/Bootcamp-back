import { Franchise } from 'src/franchise/entities/franchise.entity';
import { CreateFinanceDto } from '../dto/create-finance.dto';

export class Finance extends CreateFinanceDto {
  id: string;
  franchise?: Franchise;
}
