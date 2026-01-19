import 'reflect-metadata'; 
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Tạo ứng dụng từ AppModule
  const app = await NestFactory.create(AppModule);
  
  // Cho phép Frontend (sau này) có thể gọi tới Backend này
  app.enableCors();

  // Chạy server tại cổng 3000
  await app.listen(3000);
  console.log('🚀 Backend NestJS đã sẵn sàng tại: http://localhost:3000');
}

bootstrap();