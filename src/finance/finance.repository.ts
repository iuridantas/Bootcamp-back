import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { Finance } from './entities/finance.entity';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Injectable()
export class FinanceRepository {
  private data = {
    franchise: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createFinance(
    {
      tier,
      score_performed,
      MRR,
      MDR,
      commission,
      created_at,
      franchiseId,
    }: CreateFinanceDto,
    id: string,
  ): Promise<Finance> {
    try {
      return await this.prisma.finance.create({
        data: {
          id: id,
          tier: tier,
          score_performed: score_performed,
          MRR: MRR,
          MDR: MDR,
          commission: commission,
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

  async updateFinance(updateFinance: UpdateFinanceDto): Promise<Finance> {
    try {
      return await this.prisma.finance.update({
        where: { id: updateFinance.id },
        data: updateFinance,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteFinance(id: string): Promise<Finance> {
    try {
      return await this.prisma.finance.delete({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Financeiro não encontrada',
      );
    }
  }

  async findFinanceById(id: string): Promise<Finance> {
    try {
      return await this.prisma.finance.findUnique({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAllFinance(franchiseId: string): Promise<Finance[]> {
    try {
      return await this.prisma.finance.findMany({
        where: { franchiseId },
        include: this.data,
      });
    } catch (err) {
      throw new Error('Database error');
    }
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Finance> {
    try {
      return await this.prisma.finance.update({
        where: { id: id },
        data: { closed_at: closedAt },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
  
  async deactivateClosedAt(id: string): Promise<Finance> {
    try {
      return await this.prisma.finance.update({
        where: { id: id },
        data: { closed_at: null },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
