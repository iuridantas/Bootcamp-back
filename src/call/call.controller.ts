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
import { CallService } from './call.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import * as uuidValidate from 'uuid-validate';

@ApiTags('calls')
@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/create')
  async create(@Body() createCallDto: CreateCallDto) {
    try {
      return this.callService.create(createCallDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/all')
  findAll() {
    try {
      return this.callService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:franchiseId/all')
  async findAllCall(@Param('franchiseId') franchiseId: string) {
    if (!uuidValidate(franchiseId)) {
      throw new Error('Franquia inválida');
    }
    try {
      const call = await this.callService.findAllCall(franchiseId);
      return call;
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/find/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.callService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  async update(@Body() updateCallDto: UpdateCallDto) {
    try {
      return this.callService.update(updateCallDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return this.callService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/activate')
  async activateCustomer(@Param('id') id: string) {
    const closedAt = new Date();
    return await this.callService.activateClosedAt(id, closedAt);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/deactivate')
  async deactivateCustomer(@Param('id') id: string) {
    return await this.callService.deactivateClosedAt(id);
  }
}
