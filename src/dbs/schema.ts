import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  birthday: text("birthday"),
  lifePath: integer("life_path"),
  createdAt: timestamp("created_at").defaultNow(),
});