export default {
	schema: "./src/lib/schema.ts",
	out: "./src/lib/migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DB_URL!,
	},
};
