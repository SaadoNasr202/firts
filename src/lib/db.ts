import * as schema from "@/lib/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

const connectionString = process.env.DB_URL!;
const client = postgres(connectionString, {
	prepare: false,
	max: 20, // زيادة عدد الاتصالات المتزامنة
	idle_timeout: 20, // تقليل وقت الانتظار
	max_lifetime: 60 * 30, // 30 دقيقة
	connect_timeout: 10, // 10 ثواني للاتصال
	transform: {
		undefined: null, // تحويل undefined إلى null
	},
});

const db = drizzle(client, {
	schema: schema,
});

export { db };
