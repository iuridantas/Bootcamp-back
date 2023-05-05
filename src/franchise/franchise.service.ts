import { Injectable } from '@nestjs/common';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import { FranchiseRepository } from './franchise.repository';
import { Franchise } from './entities/franchise.entity';
import { randomUUID } from 'node:crypto';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';

function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  const isAllSame = /^(\d)\1{13}$/.test(cnpj);
  if (isAllSame) {
    return false;
  }

  let sum = 0;
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let position = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  let mod = sum % 11;
  const firstDigit = mod < 2 ? 0 : 11 - mod;

  sum = 0;
  position = size - 6;
  numbers = cnpj.substring(0, size) + firstDigit;
  for (let i = size + 1; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size + 1 - i)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  mod = sum % 11;
  const secondDigit = mod < 2 ? 0 : 11 - mod;

  return (
    parseInt(cnpj.charAt(size)) === firstDigit &&
    parseInt(cnpj.charAt(size + 1)) === secondDigit
  );
}

@Injectable()
export class FranchiseService {
  constructor(private readonly franchiseRepository: FranchiseRepository) {}

  async create(createFranchiseDto: CreateFranchiseDto): Promise<Franchise> {
    const franchiseEntity = { ...createFranchiseDto, id: randomUUID() };

    if (!isValidCNPJ(createFranchiseDto.cnpj)) {
      throw new Exception(
        Exceptions.InvalidData,
        'O CNPJ fornecido é inválido',
      );
    }

    const createdFranchise = await this.franchiseRepository.createFranchise(
      franchiseEntity,
    );
    return createdFranchise;
  }

  async findAll(): Promise<Franchise[]> {
    return await this.franchiseRepository.findAllFranchise();
  }

  async findAllFranchiseeByUser(userId: string): Promise<Franchise[]> {
    return await this.franchiseRepository.findAllFranchiseeByUser(userId);
  }

  async findOne(id: string): Promise<Franchise> {
    return await this.franchiseRepository.findFranchiseById(id);
  }

  async update(updateFranchiseDto: UpdateFranchiseDto): Promise<Franchise> {
    return await this.franchiseRepository.updateFranchise(updateFranchiseDto);
  }

  async remove(id: string): Promise<string> {
    await this.franchiseRepository.deleteFranchise(id);
    return 'Franquia excluida com sucesso';
  }

  async activateClosedAt(id: string, closedAt: Date): Promise<Franchise> {
    return await this.franchiseRepository.activateClosedAt(id, closedAt);
  }

  async deactivateClosedAt(id: string): Promise<Franchise> {
    return await this.franchiseRepository.deactivateClosedAt(id);
  }
}
