import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { Call } from './entities/call.entity';

@Injectable()
export class CallRepository {
  private data = {
    franchise: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createCall(
    { description, created_at, status, franchiseId }: CreateCallDto,
    id: string,
  ): Promise<Call> {
    try {
      return await this.prisma.call.create({
        data: {
          id: id,
          description: description,
          created_at: created_at,
          status: status,
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

  async updateCall(updateCall: UpdateCallDto): Promise<Call> {
    try {
      return await this.prisma.call.update({
        where: { id: updateCall.id },
        data: updateCall,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteCall(id: string): Promise<Call> {
    try {
      return await this.prisma.call.delete({
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

  async findCallById(id: string): Promise<Call> {
    try {
      return await this.prisma.call.findUnique({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAll(): Promise<Call[]> {
    try {
      return await this.prisma.call.findMany();
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAllCall(franchiseId: string): Promise<Call[]> {
    try {
      return await this.prisma.call.findMany({
        where: { franchiseId },
        include: this.data,
      });
    } catch (err) {
      throw new Error('Database error');
    }
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Call> {
    try {
      return await this.prisma.call.update({
        where: { id: id },
        data: { closed_at: closedAt },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
  
  async deactivateClosedAt(id: string): Promise<Call> {
    try {
      return await this.prisma.call.update({
        where: { id: id },
        data: { closed_at: null },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
