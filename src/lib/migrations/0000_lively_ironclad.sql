CREATE TABLE "DeliveryDriver" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"delivery_type" text NOT NULL,
	"vehicle_type" text NOT NULL,
	"id_type" text NOT NULL,
	"personal_id_number" text NOT NULL,
	"email" text,
	"region" text NOT NULL,
	"id_image" text,
	"idDriver" text,
	"idVichle" text,
	"Picture" text,
	"agreed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Investore" (
	"id" text PRIMARY KEY NOT NULL,
	"national_id" text NOT NULL,
	"first_name" text NOT NULL,
	"father_name" text NOT NULL,
	"family_name" text NOT NULL,
	"nafath_request_id" text,
	"nafath_status" text DEFAULT 'pending',
	"nafath_verified_at" timestamp with time zone,
	"first_name_ar" text,
	"first_name_en" text,
	"middle_name_ar" text,
	"middle_name_en" text,
	"third_name_ar" text,
	"third_name_en" text,
	"last_name_ar" text,
	"last_name_en" text,
	"contract_generated_at" timestamp with time zone,
	"contract_signed_at" timestamp with time zone,
	"signed_file_path" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Investore_national_id_unique" UNIQUE("national_id")
);
--> statement-breakpoint
CREATE TABLE "KaidhaUser" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"father_name" text,
	"grand_father_name" text,
	"birth_date" timestamp with time zone,
	"nationality" text,
	"social_status" text,
	"family_members_count" integer,
	"id_type" text,
	"personal_id_number" text,
	"id_expiration_date" timestamp with time zone,
	"phone_number" text,
	"whatsapp_number" text,
	"email" text,
	"home_type" text,
	"home_nature" text,
	"city" text,
	"neighborhood" text,
	"address_details" text,
	"agreed" boolean DEFAULT false,
	"company_name" text,
	"job_title" text,
	"years_of_experience" integer,
	"gross_salary" text,
	"locationwork" text,
	"locationhouse" text,
	"work_address" text,
	"Installments" text,
	"hasAdditionalIncome" text,
	"additionalAmount" text,
	"incomeSource" text
);
--> statement-breakpoint
CREATE TABLE "KaidhaStore" (
	"id" text PRIMARY KEY NOT NULL,
	"store_name" text NOT NULL,
	"store_classification" text,
	"what_your_store_offers" text,
	"city" text,
	"branch_count" text,
	"phone_number" text,
	"personal_id_number" text,
	"location" text,
	"id_image" text,
	"Municipallicense" text,
	"Storefrontimage" text,
	"agreed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "Worker" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"delivery_type" text NOT NULL,
	"vehicle_type" text NOT NULL,
	"id_type" text NOT NULL,
	"personal_id_number" text NOT NULL,
	"email" text,
	"region" text NOT NULL,
	"id_image" text,
	"Picture" text,
	"agreed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" text PRIMARY KEY NOT NULL,
	"cart_id" text NOT NULL,
	"product_id" text NOT NULL,
	"store_id" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"price_at_add" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favourite_stores" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"store_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favouriteusers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"product_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" text NOT NULL,
	"original_price" text,
	"unit" text,
	"store_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shellausers" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"phone_number" text NOT NULL,
	"birth_date" timestamp with time zone NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"Adress" text NOT NULL,
	CONSTRAINT "shellausers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "stores" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"rating" text,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_shellausers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shellausers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favourite_stores" ADD CONSTRAINT "favourite_stores_user_id_shellausers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shellausers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favourite_stores" ADD CONSTRAINT "favourite_stores_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favouriteusers" ADD CONSTRAINT "favouriteusers_user_id_shellausers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shellausers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favouriteusers" ADD CONSTRAINT "favouriteusers_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_shellausers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shellausers"("id") ON DELETE cascade ON UPDATE no action;