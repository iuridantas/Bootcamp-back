import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FranchiseService } from './franchise.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

@ApiTags('franchise')
@Controller('franchise')
export class FranchiseController {
  constructor(private readonly franchiseService: FranchiseService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/create')
  async create(@Body() createFranchiseDto: CreateFranchiseDto) {
    try {
      return this.franchiseService.create(createFranchiseDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/all')
  async findAll() {
    try {
      return await this.franchiseService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/user')
  async findAllFranchiseeByUser(@Req() req: CustomRequest) {
    try {
      const userId = req.user.id;
      return await this.franchiseService.findAllFranchiseeByUser(userId);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/find/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.franchiseService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  async update(@Body() updateFranchiseDto: UpdateFranchiseDto) {
    try {
      return this.franchiseService.update(updateFranchiseDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return this.franchiseService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/activate')
  async activateCustomer(@Param('id') id: string) {
    const closedAt = new Date();
    return await this.franchiseService.activateClosedAt(id, closedAt);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/deactivate')
  async deactivateCustomer(@Param('id') id: string) {
    return await this.franchiseService.deactivateClosedAt(id);
  }
}