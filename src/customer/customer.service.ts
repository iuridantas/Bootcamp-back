import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';
import { Customer } from './entities/customer.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const id = randomUUID();
    return await this.customerRepository.createCustomer(createCustomerDto, id);
  }

  async findAll(franchiseId: string): Promise<Customer[]> {
    return await this.customerRepository.findAll(franchiseId);
  }

  async findOne(id: string): Promise<Customer> {
    return await this.customerRepository.findCustomerById(id);
  }

  async update(updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return await this.customerRepository.updateCustomer(updateCustomerDto);
  }

  async remove(id: string): Promise<string> {
    await this.customerRepository.deleteCustomer(id);
    return 'Cliente excluido com sucesso';
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Customer> {
    return await this.customerRepository.activateClosedAt(id, closedAt);
  }

  async deactivateClosedAt(id: string): Promise<Customer> {
    return await this.customerRepository.deactivateClosedAt(id);
  }
}
