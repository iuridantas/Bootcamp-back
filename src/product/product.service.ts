import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const id = randomUUID();
    return await this.productRepository.createProduct(createProductDto, id);
  }

  async findAll(franchiseId: string): Promise<Product[]> {
    return await this.productRepository.findAll(franchiseId);
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findProductById(id);
  }

  async update(updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productRepository.updateProduct(updateProductDto);
  }

  async remove(id: string): Promise<string> {
    await this.productRepository.deleteProduct(id);
    return 'Produto excluido com sucesso';
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Product> {
    return await this.productRepository.activateClosedAt(id, closedAt);
  }

  async deactivateClosedAt(id: string): Promise<Product> {
    return await this.productRepository.deactivateClosedAt(id);
  }
}
