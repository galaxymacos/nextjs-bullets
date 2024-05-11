import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

const prismaClientSingleton = () => {
  neonConfig.webSocketConstructor = ws;
  const connectionString =
    "postgres://default:SaGgHuLqi4Y5@ep-fragrant-pine-a1jd05tu-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15";
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
