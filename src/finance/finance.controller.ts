import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import * as uuidValidate from 'uuid-validate';

@ApiTags('finances')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/create')
  async create(@Body() createFinanceDto: CreateFinanceDto) {
    try {
      return this.financeService.create(createFinanceDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:franchiseId/all')
  async findAll(@Param('franchiseId') franchiseId: string) {
    if (!uuidValidate(franchiseId)) {
      throw new Error('Franquia inválida');
    }
    try {
      const finance = await this.financeService.findAll(franchiseId);
      return finance;
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/find/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.financeService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  async update(@Body() updateFinanceDto: UpdateFinanceDto) {
    try {
      return this.financeService.update(updateFinanceDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return this.financeService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/activate')
  async activateCustomer(@Param('id') id: string) {
    const closedAt = new Date();
    return await this.financeService.activateClosedAt(id, closedAt);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/deactivate')
  async deactivateCustomer(@Param('id') id: string) {
    return await this.financeService.deactivateClosedAt(id);
  }
}
