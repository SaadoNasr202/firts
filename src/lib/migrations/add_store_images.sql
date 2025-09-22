-- إضافة حقول الصور الجديدة لجدول أقسام المتاجر
-- يجب تشغيل هذا الملف على قاعدة البيانات

-- إضافة حقل storecover (صورة غطاء المتجر)
ALTER TABLE store_categories 
ADD COLUMN IF NOT EXISTS storecover TEXT;

-- إضافة حقل storelogo (شعار المتجر)
ALTER TABLE store_categories 
ADD COLUMN IF NOT EXISTS storelogo TEXT;

-- إضافة تعليقات للحقول الجديدة
COMMENT ON COLUMN store_categories.storecover IS 'صورة غطاء المتجر - أبعاد مختلفة عن صورة المتجر الأساسية';
COMMENT ON COLUMN store_categories.storelogo IS 'شعار المتجر - أبعاد مختلفة عن صورة المتجر الأساسية';

-- إنشاء فهارس للحقول الجديدة (اختياري)
CREATE INDEX IF NOT EXISTS idx_store_categories_storecover ON store_categories(storecover) WHERE storecover IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_store_categories_storelogo ON store_categories(storelogo) WHERE storelogo IS NOT NULL;
