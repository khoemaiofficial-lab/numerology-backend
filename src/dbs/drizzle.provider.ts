import { drizzle } from 'drizzle-orm/neon-http'; // ĐỔI TỪ neon-serverless SANG neon-http
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

export const DRIZZLE_TOKEN = 'DRIZZLE_CONNECTION';

export const DrizzleProvider = {
  provide: DRIZZLE_TOKEN,
  useFactory: () => {
    // Hàm neon() tạo ra một "Query Function" (HTTP-based)
    const sql = neon(process.env.DATABASE_URL!);
    
    // Bây giờ drizzle() từ 'neon-http' sẽ chấp nhận biến 'sql' này
    return drizzle(sql, { schema });
  },
};