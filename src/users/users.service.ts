import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_TOKEN } from '../dbs/drizzle.provider';
import { users } from '../dbs/schema';
import { eq } from 'drizzle-orm';
import { NumerologyMeanings } from './meanings';

@Injectable()
export class UsersService {
  // Kết nối với "Máy bơm" Database thông qua DRIZZLE_TOKEN
  constructor(@Inject(DRIZZLE_TOKEN) private db: any) {}

  // 1. Công thức tính Con số chủ đạo (Life Path)
  calculateLifePath(birthday: string): number {
    // Xóa tất cả ký tự không phải số (ví dụ 1990-01-01 -> 19900101)
    const digits = birthday.replace(/\D/g, '');
    let sum = digits.split('').reduce((a, b) => a + parseInt(b), 0);

    // Rút gọn về 1 chữ số, giữ lại các số Master: 11, 22, 33
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return sum;
  }

  // 2. Hàm lưu dữ liệu vào Database
  async createOrUpdateUser(name: string, email: string, birthday: string) {
  const lifePath = this.calculateLifePath(birthday);
  const meaning = NumerologyMeanings[lifePath] || { title: "Linh hồn tự do", description: "Bạn mang năng lượng đặc biệt..." };
  
  const [user] = await this.db.insert(users)
    .values({ name, email, birthday, lifePath })
    .onConflictDoUpdate({ target: users.email, set: { name, birthday, lifePath } })
    .returning();

  return { ...user, ...meaning }; // Trả về cả data user và ý nghĩa
}

  // 3. Hàm lấy danh sách lịch sử
  async findAll() {
    return await this.db.select().from(users);
  }
}