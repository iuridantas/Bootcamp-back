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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import * as uuidValidate from 'uuid-validate';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/create')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return this.customerService.create(createCustomerDto);
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
      const customer = this.customerService.findAll(franchiseId);
      return customer;
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/find/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.customerService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  async update(@Body() updateCustomerDto: UpdateCustomerDto) {
    try {
      return this.customerService.update(updateCustomerDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return this.customerService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/activate')
  async activateCustomer(@Param('id') id: string) {
    const closedAt = new Date();
    return await this.customerService.activateClosedAt(id, closedAt);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/deactivate')
  async deactivateCustomer(@Param('id') id: string) {
    return await this.customerService.deactivateClosedAt(id);
  }
}
