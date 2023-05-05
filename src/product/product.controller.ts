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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import * as uuidValidate from 'uuid-validate';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productService.create(createProductDto);
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
      const product = this.productService.findAll(franchiseId);
      return product;
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/find/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  async update(@Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productService.update(updateProductDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return this.productService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/activate')
  async activateCustomer(@Param('id') id: string) {
    const closedAt = new Date();
    return await this.productService.activateClosedAt(id, closedAt);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch(':id/deactivate')
  async deactivateCustomer(@Param('id') id: string) {
    return await this.productService.deactivateClosedAt(id);
  }
}
