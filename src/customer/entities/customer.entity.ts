import { Franchise } from 'src/franchise/entities/franchise.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';

export class Customer extends CreateCustomerDto {
  id: string;
  franchise?: Franchise;
}
