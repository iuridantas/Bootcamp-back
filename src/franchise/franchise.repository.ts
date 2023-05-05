import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Franchise } from './entities/franchise.entity';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';

@Injectable()
export class FranchiseRepository {
  private data = {
    customers: true,
    calls: true,
    finances: true,
    products: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createFranchise(franchise: Franchise): Promise<Franchise> {
    try {
      return await this.prisma.franchise.create({
        data: franchise,
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async updateFranchise(franchise: UpdateFranchiseDto): Promise<Franchise> {
    try {
      return await this.prisma.franchise.update({
        where: { id: franchise.id },
        data: franchise,
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteFranchise(id: string): Promise<Franchise> {
    try {
      return await this.prisma.franchise.delete({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'franquia não encontrado',
      );
    }
  }

  async findFranchiseById(id: string): Promise<Franchise> {
    try {
      return await this.prisma.franchise.findUnique({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAllFranchise(): Promise<Franchise[]> {
    try {
      return await this.prisma.franchise.findMany({
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAllFranchiseeByUser(userId: string): Promise<Franchise[]> {
    try {
      return await this.prisma.franchise.findMany({
        where: { userId: userId },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Franchise> {
    try {
      return await this.prisma.franchise.update({
        where: { id: id },
        data: { closed_at: closedAt },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
  
  async deactivateClosedAt(id: string): Promise<Franchise> {
    try {
      return await this.prisma.franchise.update({
        where: { id: id },
        data: { closed_at: null },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
