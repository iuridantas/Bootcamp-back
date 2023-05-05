import { Franchise } from 'src/franchise/entities/franchise.entity';
import { CreateProductDto } from '../dto/create-product.dto';

export class Product extends CreateProductDto {
  id: string;
  franchise?: Franchise;
}
