import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { FinanceRepository } from './finance.repository';
import { Finance } from './entities/finance.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class FinanceService {
  constructor(private readonly financeRepository: FinanceRepository) {}

  async create(createFinanceDto: CreateFinanceDto): Promise<Finance> {
    const id = randomUUID();
    return await this.financeRepository.createFinance(createFinanceDto, id);
  }

  async findAll(franchiseId: string): Promise<Finance[]> {
    return await this.financeRepository.findAllFinance(franchiseId);
  }

  async findOne(id: string): Promise<Finance> {
    return await this.financeRepository.findFinanceById(id);
  }

  async update(updateFinanceDto: UpdateFinanceDto): Promise<Finance> {
    return await this.financeRepository.updateFinance(updateFinanceDto);
  }

  async remove(id: string): Promise<string> {
    await this.financeRepository.deleteFinance(id);
    return 'Financeiro excluido com sucesso';
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Finance> {
    return await this.financeRepository.activateClosedAt(id, closedAt);
  }

  async deactivateClosedAt(id: string): Promise<Finance> {
    return await this.financeRepository.deactivateClosedAt(id);
  }
}
