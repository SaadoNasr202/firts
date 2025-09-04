import { pgTable, text, timestamp, boolean, integer, date, numeric } from "drizzle-orm/pg-core";

export const TB_user = pgTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
	createdTime: timestamp("created_time", {
		withTimezone: true,
		mode: "date",
	})
		.notNull()
		.defaultNow(),
	lastUpdateTime: timestamp("last_update_time", {
		withTimezone: true,
		mode: "date",
	})
		.notNull()
		.defaultNow(),
});

export const TB_session = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => TB_user.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const TB_KaidhaUsers = pgTable("KaidhaUser", {
	id: text("id").primaryKey(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	fatherName: text("father_name"),
	grandFatherName: text("grand_father_name"),
    birthDate: timestamp("birth_date",{withTimezone: true, mode: "date"}), 
	nationality: text("nationality"),
	socialStatus: text("social_status"),
	familyMembersCount: integer("family_members_count"),
	idType: text("id_type"),
	personalIdNumber: text("personal_id_number"),
	idExpirationDate: timestamp("id_expiration_date",{withTimezone: true, mode: "date"}),
	phoneNumber: text("phone_number"),
	whatsappNumber: text("whatsapp_number"),
	email: text("email"),
	homeType: text("home_type"),
	homeNature: text("home_nature"),
	city: text("city"),
	neighborhood: text("neighborhood"),
	addressDetails: text("address_details"),
	agreed: boolean("agreed").default(false),
	companyName: text("company_name"),
	jobTitle: text("job_title"),
	yearsOfExperience: integer("years_of_experience"),
	grossSalary: text("gross_salary"),
	workAddress: text("work_address"),
});
export const TB_Partner = pgTable("KaidhaStore", {
    id: text("id").primaryKey(),
    storeName: text("store_name").notNull(),
    storeClassification: text("store_classification"),
    whatYourStoreOffers: text("what_your_store_offers"),
    city: text("city"),
    branchCount: text("branch_count"),
    phoneNumber: text("phone_number"),
    englishStoreName: text("english_store_name"),
    personalIdNumber: text("personal_id_number"),
    detailedAddress: text("detailed_address"),
    idImage: text("id_image"),  
    Municipallicense:text("Municipallicense"),
    Storefrontimage:text("Storefrontimage"),
    agreed: boolean("agreed").default(false),
});


export const TB_DeliveryDrivers = pgTable("DeliveryDriver", {
    id: text("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    deliveryType: text("delivery_type").notNull(),
    vehicleType: text("vehicle_type").notNull(),
    idType: text("id_type").notNull(),
    personalIdNumber: text("personal_id_number").notNull(),
    email: text("email"),
    region: text("region").notNull(),
    idImage: text("id_image"), 
    idDriver:text("idDriver"),
    idVichle:text("idVichle"),
    Picture:text("Picture"),
    agreed: boolean("agreed").default(false).notNull(),
});


export const TB_Investore = pgTable("Investore", {
    id: text("id").primaryKey(),
    first_name: text("first_name").notNull(),
    father_name: text("father_name").notNull(),
    family_name: text("family_name").notNull(),
    grandfather_name: text("grandfather_name").notNull(),
    birth_date: date("birth_date"),
    national_id: text("national_id").notNull().unique(),
    email: text("email"),
    phone: text("phone").notNull(),
    national_address_email: text("national_address_email"),
    region: text("region").notNull(),
    iban: text("iban").notNull(),
    bank_name: text("bank_name").notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }),
    agreed: boolean("agreed").default(false).notNull(),
    
});

export const TB_Worker = pgTable("Worker", {
    id: text("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    deliveryType: text("delivery_type").notNull(),
    vehicleType: text("vehicle_type").notNull(),
    idType: text("id_type").notNull(),
    personalIdNumber: text("personal_id_number").notNull(),
    email: text("email"),
    region: text("region").notNull(),
    idImage: text("id_image"), 
    idDriver:text("idDriver"),
    idVichle:text("idVichle"),
    Picture:text("Picture"),    
    agreed: boolean("agreed").default(false).notNull(),
    
});