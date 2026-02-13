import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Carrega o .env
dotenv.config(); 

export default defineConfig({
  schema: "./drizzle/schema.ts", // (Mantenha o caminho que funcionou pra você)
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // AGORA SIM, usa a variável do .env
    url: process.env.DATABASE_URL!, 
  },
});