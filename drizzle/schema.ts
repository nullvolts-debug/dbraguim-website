import { pgTable, text, serial, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";

// Define o Enum do Postgres (opcional, mas bom ter)
export const roleEnum = pgEnum('role', ['user', 'admin']);

/**
 * Tabela de Usuários (Adaptada para Postgres)
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // serial = autoincrement do Postgres
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum('role').default("user").notNull(), // Usando o Enum criado acima
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(), // Postgres não tem onUpdateNow nativo simples, mas ok
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de Newsletter (Adaptada para Postgres)
 */
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  source: varchar("source", { length: 50 }).notNull().default("whatsapp"),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;