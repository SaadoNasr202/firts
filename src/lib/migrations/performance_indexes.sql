-- فهارس لتحسين أداء قاعدة البيانات
-- يجب تشغيل هذه الاستعلامات على قاعدة البيانات

-- فهارس للمتاجر
CREATE INDEX IF NOT EXISTS idx_stores_name ON shellastores(name);
CREATE INDEX IF NOT EXISTS idx_stores_type ON shellastores(type);
CREATE INDEX IF NOT EXISTS idx_stores_rating ON shellastores(rating);
CREATE INDEX IF NOT EXISTS idx_stores_created_at ON shellastores(created_at);

-- فهارس للمنتجات
CREATE INDEX IF NOT EXISTS idx_products_name ON shellaproducts(name);
CREATE INDEX IF NOT EXISTS idx_products_store_id ON shellaproducts(store_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON shellaproducts(price);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON shellaproducts(created_at);

-- فهارس للأقسام
CREATE INDEX IF NOT EXISTS idx_categories_name ON shellacategories(name);
CREATE INDEX IF NOT EXISTS idx_categories_created_at ON shellacategories(created_at);

-- فهارس للمستخدمين
CREATE INDEX IF NOT EXISTS idx_users_email ON shellausers(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON shellausers(phone_number);

-- فهارس للجلسات
CREATE INDEX IF NOT EXISTS idx_session_user_id ON session(user_id);
CREATE INDEX IF NOT EXISTS idx_session_expires_at ON session(expires_at);

-- فهارس مركبة للبحث السريع
CREATE INDEX IF NOT EXISTS idx_stores_search ON shellastores(name, type);
CREATE INDEX IF NOT EXISTS idx_products_search ON shellaproducts(name, store_id);

-- تحليل الجداول لتحسين الأداء
ANALYZE shellastores;
ANALYZE shellaproducts;
ANALYZE shellacategories;
ANALYZE shellausers;
ANALYZE session;
