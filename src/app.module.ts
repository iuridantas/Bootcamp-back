import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FinanceModule } from './finance/finance.module';
import { ProductModule } from './product/product.module';
import { CallModule } from './call/call.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './prisma/database.module';
import { CustomerModule } from './customer/customer.module';
import { FranchiseModule } from './franchise/franchise.module';


@Module({
  imports: [DatabaseModule, AuthModule, UserModule, FinanceModule, ProductModule, CallModule, AuthModule, CustomerModule, FranchiseModule],
})
export class AppModule {}
