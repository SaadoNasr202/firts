import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const TB_user = pgTable("shellausers", {
	id: text("id").primaryKey(),
	fullName: text("full_name").notNull(),
	phoneNumber: text("phone_number").notNull(),
	birthDate: timestamp("birth_date", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	Adress: text("Adress").notNull(),
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
	birthDate: timestamp("birth_date", { withTimezone: true, mode: "date" }),
	nationality: text("nationality"),
	socialStatus: text("social_status"),
	familyMembersCount: integer("family_members_count"),
	idType: text("id_type"),
	personalIdNumber: text("personal_id_number"),
	idExpirationDate: timestamp("id_expiration_date", {
		withTimezone: true,
		mode: "date",
	}),
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
	locationwork: text("locationwork"),
	locationhouse: text("locationhouse"),
	workAddress: text("work_address"),
	Installments: text("Installments"),
	hasAdditionalIncome: text("hasAdditionalIncome"),
	additionalAmount: text("additionalAmount"),
	incomeSource: text("incomeSource"),
});

export const TB_Partner = pgTable("KaidhaStore", {
	id: text("id").primaryKey(),
	storeName: text("store_name").notNull(),
	storeClassification: text("store_classification"),
	whatYourStoreOffers: text("what_your_store_offers"),
	city: text("city"),
	branchCount: text("branch_count"),
	phoneNumber: text("phone_number"),
	personalIdNumber: text("personal_id_number"),
	location: text("location"),
	idImage: text("id_image"),
	Municipallicense: text("Municipallicense"),
	Storefrontimage: text("Storefrontimage"),
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
	idDriver: text("idDriver"),
	idVichle: text("idVichle"),
	Picture: text("Picture"),
	agreed: boolean("agreed").default(false).notNull(),
});

export const TB_Investore = pgTable("Investore", {
	// معلومات أساسية مطلوبة
	id: text("id").primaryKey(),
	national_id: text("national_id").notNull().unique(),
	first_name: text("first_name").notNull(),
	father_name: text("father_name").notNull(),
	family_name: text("family_name").notNull(),

	// حقول التوثيق عبر نفاذ
	nafath_request_id: text("nafath_request_id"),
	nafath_status: text("nafath_status").default("pending"), // 'pending', 'approved', 'failed'
	nafath_verified_at: timestamp("nafath_verified_at", {
		withTimezone: true,
		mode: "date",
	}),

	// الأسماء المتحقق منها من نفاذ
	first_name_ar: text("first_name_ar"),
	first_name_en: text("first_name_en"),
	middle_name_ar: text("middle_name_ar"),
	middle_name_en: text("middle_name_en"),
	third_name_ar: text("third_name_ar"),
	third_name_en: text("third_name_en"),
	last_name_ar: text("last_name_ar"),
	last_name_en: text("last_name_en"),

	// حقول العقد والتوقيع الإلكتروني
	contract_generated_at: timestamp("contract_generated_at", {
		withTimezone: true,
		mode: "date",
	}),
	contract_signed_at: timestamp("contract_signed_at", {
		withTimezone: true,
		mode: "date",
	}),
	signed_file_path: text("signed_file_path"),

	// حقول التوقيت
	created_at: timestamp("created_at", {
		withTimezone: true,
		mode: "date",
	})
		.notNull()
		.defaultNow(),
	updated_at: timestamp("updated_at", {
		withTimezone: true,
		mode: "date",
	})
		.notNull()
		.defaultNow(),
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
	Picture: text("Picture"),
	agreed: boolean("agreed").default(false).notNull(),
});

export const TB_shellausers = pgTable("shellausers", {
	id: text("id").primaryKey(),
	fullName: text("full_name").notNull(),
	phoneNumber: text("phone_number").notNull(),
	birthDate: timestamp("birth_date", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	Adress: text("Adress").notNull(),
});

// جدول الأقسام
export const TB_categories = pgTable("categories", {
	id: text("id").primaryKey(),
	name: text("name").notNull(), // اسم القسم: مطاعم، سوبرماركت، صيدلية، إلخ
	description: text("description"), // وصف اختياري
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const TB_store_categories = pgTable("store_categories", {
	id: text("id").primaryKey(),
	storeId: text("store_id")
		.notNull()
		.references(() => TB_stores.id), // كل قسم فرعي مرتبط بمتجر
	name: text("name").notNull(), // اسم القسم الفرعي
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const TB_stores = pgTable("stores", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	type: text("type").notNull(), // نوع المتجر: مطعم، بقال، إلخ
	rating: text("rating"), // تقييم المتجر
	image: text("image"), // صورة المتجر
	categoryId: text("category_id") // FK للقسم
		.notNull()
		.references(() => TB_categories.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const TB_products = pgTable("products", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	image: text("image").notNull(),
	price: text("price").notNull(),
	originalPrice: text("original_price"),
	unit: text("unit"),
	storeId: text("store_id")
		.references(() => TB_stores.id)
		.notNull(),
});
export const TB_store_products = pgTable("store_products", {
	id: text("id").primaryKey(),
	storeId: text("store_id")
		.notNull()
		.references(() => TB_stores.id),
	productId: text("product_id")
		.notNull()
		.references(() => TB_products.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const TB_favouriteusers = pgTable("favouriteusers", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => TB_shellausers.id),
	productId: text("product_id")
		.notNull()
		.references(() => TB_products.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const TB_favouriteStores = pgTable("favourite_stores", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => TB_shellausers.id),
	storeId: text("store_id")
		.notNull()
		.references(() => TB_stores.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const TB_cart = pgTable("cart", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => TB_shellausers.id),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const TB_cartItems = pgTable("cart_items", {
	id: text("id").primaryKey(),
	cartId: text("cart_id")
		.notNull()
		.references(() => TB_cart.id),
	productId: text("product_id")
		.notNull()
		.references(() => TB_products.id),
	storeId: text("store_id")
		.notNull()
		.references(() => TB_stores.id),
	quantity: integer("quantity").notNull().default(1),
	priceAtAdd: text("price_at_add"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
