import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

// Starter table; replace with the real HR schema.
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
