import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerRepository {
  private data = {
    franchise: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(
    { name, created_at, franchiseId }: CreateCustomerDto,
    id: string,
  ): Promise<Customer> {
    try {
      return await this.prisma.customer.create({
        data: {
          id: id,
          name: name,
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

  async updateCustomer(updateCustomer: UpdateCustomerDto): Promise<Customer> {
    try {
      return await this.prisma.customer.update({
        where: { id: updateCustomer.id },
        data: updateCustomer,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteCustomer(id: string): Promise<Customer> {
    try {
      return await this.prisma.customer.delete({
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

  async findCustomerById(id: string): Promise<Customer> {
    try {
      return await this.prisma.customer.findUnique({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Customer> {
    try {
      return await this.prisma.customer.update({
        where: { id: id },
        data: { closed_at: closedAt },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
  
  async deactivateClosedAt(id: string): Promise<Customer> {
    try {
      return await this.prisma.customer.update({
        where: { id: id },
        data: { closed_at: null },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAll(franchiseId: string): Promise<Customer[]> {
    try {
      return await this.prisma.customer.findMany({
        where: { franchiseId },
        include: this.data,
      });
    } catch (err) {
      throw new Error('Database error');
    }
  }
}
