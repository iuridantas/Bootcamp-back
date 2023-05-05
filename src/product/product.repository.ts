import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  private data = {
    franchise: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    { name, description, price, created_at, franchiseId }: CreateProductDto,
    id: string,
  ): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: {
          id: id,
          name: name,
          description: description,
          price: price,
          created_at: created_at,
          franchise: {
            connect: { id: franchiseId },
          },
        },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async updateProduct(updateProduct: UpdateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id: updateProduct.id },
        data: updateProduct,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Chamada não encontrada',
      );
    }
  }

  async findProductById(id: string): Promise<Product> {
    try {
      return await this.prisma.product.findUnique({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAll(franchiseId: string): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({
        where: { franchiseId },
        include: this.data,
      });
    } catch (err) {
      throw new Error('Database error');
    }
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id: id },
        data: { closed_at: closedAt },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
  
  async deactivateClosedAt(id: string): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id: id },
        data: { closed_at: null },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
