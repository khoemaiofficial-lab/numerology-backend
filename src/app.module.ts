import { Module } from '@nestjs/common';
import { DrizzleModule } from './dbs/drizzle.module';
import { UsersModule } from './users/users.module'; // Import cái này

@Module({
  imports: [DrizzleModule, UsersModule], // Chỉ import Module
  controllers: [], // TRỐNG (vì Controller đã nằm trong UsersModule rồi)
  providers: [],
})
export class AppModule {}