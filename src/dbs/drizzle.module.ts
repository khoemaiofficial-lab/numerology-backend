import { Module, Global } from '@nestjs/common';
import { DrizzleProvider } from './drizzle.provider';

@Global() // Dòng này cực kỳ quan trọng: Nó giúp Database có sẵn ở mọi nơi mà không cần import lại nhiều lần
@Module({
  providers: [DrizzleProvider],
  exports: [DrizzleProvider], // Xuất ra để các phần khác có thể dùng
})
export class DrizzleModule {}