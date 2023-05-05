import { Injectable } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { CallRepository } from './call.repository';
import { Call } from './entities/call.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CallService {
  constructor(private readonly callRepository: CallRepository) {}

  async create(createCallDto: CreateCallDto): Promise<Call> {
    const id = randomUUID();
    return await this.callRepository.createCall(createCallDto, id);
  }

  async findAllCall(franchiseId: string): Promise<Call[]> {
    return await this.callRepository.findAllCall(franchiseId);
  }

  async findAll(): Promise<Call[]> {
    return await this.callRepository.findAll();
  }

  async findOne(id: string): Promise<Call> {
    return await this.callRepository.findCallById(id);
  }

  async update(updateCallDto: UpdateCallDto): Promise<Call> {
    return await this.callRepository.updateCall(updateCallDto);
  }

  async remove(id: string): Promise<string> {
    await this.callRepository.deleteCall(id);
    return 'Chamada excluida com sucesso';
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Call> {
    return await this.callRepository.activateClosedAt(id, closedAt);
  }

  async deactivateClosedAt(id: string): Promise<Call> {
    return await this.callRepository.deactivateClosedAt(id);
  }
}
