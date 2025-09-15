# 🛒 مشروع شلة - منصة التوصيل والخدمات الشاملة

## 📋 نظرة عامة

**مشروع شلة** هو تطبيق ويب شامل مبني بتقنية Next.js 14 يوفر منصة متعددة الخدمات للتوصيل والشراكات التجارية. يدعم المشروع اللغتين العربية والإنجليزية مع نظام توثيق متقدم عبر **نفاذ** ونظام إدارة متكامل للمتاجر والمنتجات.

### 🎯 الهدف الرئيسي
إنشاء منصة رقمية متكاملة تربط بين:
- **المستثمرين** والفرص الاستثمارية
- **الشركاء التجاريين** والمتاجر
- **السائقين** وخدمات التوصيل
- **العمال** وفرص العمل
- **العملاء** وخدمة التمويل "قيدها"
- **المتاجر** ونظام إدارة المنتجات
- **المستخدمين** ونظام التسوق الإلكتروني

---

## 🛠 التقنيات المستخدمة

### Frontend Technologies
- **Next.js 14.2.32** - React Framework مع App Router
- **TypeScript** - للكتابة الآمنة والموثوقة
- **Tailwind CSS 4** - للتصميم المتجاوب والحديث
- **React 18.3.1** - مكتبة واجهة المستخدم
- **Framer Motion 12.23.12** - للرسوم المتحركة والتفاعلات

### UI Components & Libraries
- **@radix-ui/react-*** - مكونات UI متاحة ومتقدمة
- **Lucide React** - مكتبة الأيقونات الحديثة
- **React Hook Form** - إدارة النماذج والتحقق
- **React Phone Input 2** - إدخال أرقام الهواتف الدولية

### Backend & Database
- **Drizzle ORM** - للتعامل مع قاعدة البيانات
- **PostgreSQL** - قاعدة البيانات الرئيسية
- **Lucia Auth** - نظام المصادقة والجلسات
- **UploadThing** - خدمة رفع الملفات

### Maps & Location
- **@react-google-maps/api** - خرائط جوجل التفاعلية
- **Geolocation API** - تحديد الموقع الجغرافي

### PDF & Documents
- **React PDF** - عرض وإنشاء ملفات PDF
- **@react-pdf-viewer/** - عارض PDF متقدم

---

## 🏗 هيكل المشروع

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # التخطيط الرئيسي مع Providers
│   ├── page.tsx                 # الصفحة الرئيسية
│   ├── globals.css              # الأنماط العامة
│   │
│   ├── api/                     # API Routes
│   │   ├── proxy/              # Proxy APIs للخدمات الخارجية
│   │   │   ├── nafath/         # نظام نفاذ للتوثيق
│   │   │   │   ├── initiate/   # بدء عملية التوثيق
│   │   │   │   └── checkStatus/ # التحقق من حالة التوثيق
│   │   │   └── contract-pdf/    # إنشاء عقود PDF
│   │   ├── uploadthing/        # خدمة رفع الملفات
│   │   ├── categories/         # إدارة الأقسام
│   │   ├── products/           # إدارة المنتجات
│   │   ├── stores/             # إدارة المتاجر
│   │   ├── cart/               # إدارة سلة التسوق
│   │   ├── favorites/          # المفضلة
│   │   ├── discounts/          # الخصومات
│   │   ├── address/            # العناوين
│   │   ├── user/               # إدارة المستخدمين
│   │   ├── auth/               # المصادقة
│   │   └── hyper-shella-categories/ # أقسام هايبر شلة
│   │
│   └── [pages]/                # صفحات التطبيق
│       ├── HomePage/           # الصفحة الرئيسية للتسوق
│       ├── invstore/           # صفحة المستثمرين
│       ├── partner/            # صفحة الشركاء
│       ├── driver/             # صفحة السائقين
│       ├── worker/             # صفحة العمال
│       ├── Kaidha/             # صفحة قيدها
│       ├── cart/               # سلة التسوق
│       ├── profile/            # الملف الشخصي
│       ├── login/              # تسجيل الدخول
│       ├── register/           # التسجيل
│       └── [other-pages]/      # باقي الصفحات
│
├── components/                  # React Components
│   ├── LandingPage/            # مكونات صفحة الهبوط
│   │   ├── landingpage.tsx     # الصفحة الرئيسية
│   │   ├── InvestoreRegister.tsx # نموذج المستثمر (مع نفاذ)
│   │   ├── partnerregister.tsx  # نموذج الشريك
│   │   ├── driverregister.tsx   # نموذج السائق
│   │   ├── WorkerRegister.tsx   # نموذج العامل
│   │   └── KaidhaRegister.tsx   # نموذج قيدها
│   │
│   ├── HomePage/               # مكونات الصفحة الرئيسية للتسوق
│   │   ├── HomePage.tsx        # الصفحة الرئيسية مع URL routing
│   │   ├── HyperShellaPage.tsx # صفحة هايبر شلة
│   │   ├── CategoriesSlider.tsx # سلايدر الأقسام
│   │   ├── ProductsPage.tsx    # صفحة المنتجات
│   │   ├── ProductDetailsPage.tsx # تفاصيل المنتج
│   │   ├── StorePage.tsx       # صفحة المتجر
│   │   ├── CartPage.tsx        # صفحة سلة التسوق
│   │   ├── Favorites.tsx       # المفضلة
│   │   ├── Breadcrumb.tsx      # مسار التنقل
│   │   └── [other-components]/ # باقي المكونات
│   │
│   ├── Profile/                # مكونات الملف الشخصي
│   │   ├── ProfileDashboard.tsx # لوحة التحكم
│   │   ├── ProfileDetails.tsx  # تفاصيل الملف
│   │   ├── MyWallet.tsx        # المحفظة
│   │   ├── MyPoints.tsx        # النقاط
│   │   ├── MyVouchers.tsx      # القسائم
│   │   ├── SavedAddress.tsx    # العناوين المحفوظة
│   │   └── [other-profile-components]/
│   │
│   ├── Condetion/             # صفحات الشروط والأحكام
│   ├── ui/                    # مكونات UI أساسية
│   ├── navbar.tsx             # شريط التنقل
│   └── shellafooter.tsx       # التذييل
│
├── contexts/                   # React Contexts
│   └── LanguageContext.tsx    # إدارة اللغة والترجمة
│
├── lib/                       # المكتبات والأدوات
│   ├── auth.ts               # نظام المصادقة
│   ├── db.ts                 # اتصال قاعدة البيانات
│   ├── schema.ts             # مخطط قاعدة البيانات
│   ├── utils.ts              # أدوات مساعدة
│   └── types/                # أنواع TypeScript
│
└── hooks/                     # Custom React Hooks
    └── useCart.ts            # hook إدارة سلة التسوق
```

---

## 🛒 نظام إدارة المتاجر والمنتجات

### قاعدة البيانات

#### الجداول الرئيسية
```sql
-- جدول الأقسام الرئيسية
categories (id, name, description, created_at)

-- جدول المتاجر
stores (id, name, type, rating, image, category_id, created_at)

-- جدول أقسام المتاجر
store_categories (id, store_id, name, created_at)

-- جدول المنتجات
products (id, name, image, price, original_price, unit, store_id)

-- جدول أقسام هايبر شلة
hyper_shella_categories (id, name, image, created_at)

-- جدول سلة التسوق
cart (id, user_id, created_at)
cart_items (id, cart_id, product_id, store_id, quantity, price_at_add, created_at)

-- جدول المفضلة
favourite_stores (id, user_id, store_id, created_at)
favouriteusers (id, user_id, product_id, created_at)
```

### APIs المتاحة

#### إدارة الأقسام
- **GET** `/api/categories` - جلب جميع الأقسام
- **GET** `/api/hyper-shella-categories` - جلب أقسام هايبر شلة

#### إدارة المتاجر
- **GET** `/api/stores/nearby` - المتاجر القريبة
- **GET** `/api/stores/by-category` - المتاجر حسب القسم
- **GET** `/api/stores/[storeName]/products` - منتجات متجر محدد

#### إدارة المنتجات
- **GET** `/api/products` - جميع المنتجات
- **GET** `/api/products/[productId]` - تفاصيل منتج محدد

#### إدارة سلة التسوق
- **GET** `/api/cart` - جلب سلة التسوق
- **POST** `/api/cart/add` - إضافة منتج للسلة
- **PUT** `/api/cart/update` - تحديث كمية المنتج
- **DELETE** `/api/cart/remove` - حذف منتج من السلة
- **DELETE** `/api/cart/clear` - مسح السلة

#### إدارة المفضلة
- **GET** `/api/favorites` - جلب المفضلة
- **POST** `/api/favorites` - إضافة للمفضلة
- **DELETE** `/api/favorites` - حذف من المفضلة

---

## 🏪 صفحة هايبر شلة

### الميزات الرئيسية

#### 1. قسم الأقسام
- عرض أقسام هايبر شلة من قاعدة البيانات
- تصميم شبكي متجاوب
- رسالة "لا توجد أقسام متاحة" عند عدم وجود بيانات

#### 2. قسم "موصى بها لك"
- **فلتر "الكل"**: منتجات موصى بها
- **فلتر "بقالة"**: متاجر السوبرماركت
- **فلتر "عروض طازجة"**: منتجات مخفضة
- عرض أفقي قابل للتمرير
- بطاقات منتجات مع أسعار وزر إضافة للسلة

#### 3. قسم "الاختيارات الأكثر شهرة"
- **فلتر "الكل"**: المنتجات الأكثر شهرة
- **فلتر "العطور"**: منتجات العطور
- **فلتر "الخضار والفواكه"**: منتجات الخضار والفواكه
- نفس تصميم قسم "موصى بها لك"

### التصميم
- تصميم متجاوب لجميع الأجهزة
- ألوان خضراء متناسقة مع هوية العلامة التجارية
- تأثيرات hover وتفاعلات سلسة
- Skeleton loading أثناء التحميل

---

## 🔄 نظام URL Routing المتقدم

### الميزات
- **حفظ حالة الصفحة** عند refresh
- **مشاركة الروابط** مع الحالة
- **زر الرجوع** في المتصفح يعمل بشكل صحيح
- **SEO friendly** URLs

### المعاملات المدعومة
```
/HomePage?page=hyper-shella&breadcrumb=["الرئيسية","هايبر شلة"]
/HomePage?page=store&store=متجر%20الخضار&category=خضروات
/HomePage?page=product-details&productId=123&store=متجر%20الخضار
```

### التطبيق التقني
```typescript
// استخدام useSearchParams و useRouter
const searchParams = useSearchParams();
const router = useRouter();

// تحميل الحالة من URL
useEffect(() => {
  const page = searchParams.get('page');
  const store = searchParams.get('store');
  const category = searchParams.get('category');
  // ... باقي المعاملات
}, [searchParams]);

// تحديث URL عند التنقل
const updateURL = (params) => {
  const url = new URL(window.location.href);
  // تحديث المعاملات
  router.replace(url.pathname + url.search);
};
```

---

## 🔐 نظام التوثيق عبر نفاذ

### نظرة عامة
تم تطوير نظام توثيق متقدم باستخدام خدمة **نفاذ** السعودية للتحقق من الهوية الرقمية.

### تدفق العمل
1. **بدء التوثيق**: المستخدم يضغط "التوثيق عبر نفاذ"
2. **فحص الحالة**: التحقق من وجود توثيق مسبق
3. **عرض الرقم العشوائي**: للمستخدم للضغط عليه في تطبيق نفاذ
4. **الفحص التلقائي**: كل 3 ثوان للتحقق من حالة التوثيق
5. **عرض النتيجة**: موافقة أو رفض أو انتظار

### APIs
- **POST** `/api/proxy/nafath/initiate` - بدء عملية التوثيق
- **POST** `/api/proxy/nafath/checkStatus` - التحقق من حالة التوثيق
- **POST** `/api/proxy/contract-pdf` - إنشاء عقد PDF

---

## 🌐 نظام الترجمة المتعدد اللغات

### الميزات
- **دعم اللغتين**: العربية والإنجليزية
- **تبديل فوري**: تحديث الواجهة بدون إعادة تحميل
- **حفظ الاختيار**: في localStorage للجلسات القادمة
- **تحديث HTML**: dir, lang, title تلقائياً
- **واجهة مستخدم**: قائمة منسدلة مع أعلام الدول

### التطبيق
```typescript
// LanguageContext
const { language, setLanguage, t, isLoaded } = useLanguage();

// استخدام الترجمة
<h1>{t('nav.home')}</h1>
<button>{t('form.submit')}</button>
```

---

## 📱 الصفحات والمكونات

### صفحات التسجيل
1. **المستثمر** (`/invstore`) - مع توثيق نفاذ
2. **الشريك** (`/partner`) - تسجيل المتاجر
3. **السائق** (`/driver`) - تسجيل السائقين
4. **العامل** (`/worker`) - تسجيل العمال
5. **قيدها** (`/Kaidha`) - خدمة التمويل

### صفحات التسوق
1. **الصفحة الرئيسية** (`/HomePage`) - مع URL routing
2. **هايبر شلة** - قسم خاص للمتاجر الكبيرة
3. **سلة التسوق** (`/cart`) - إدارة المشتريات
4. **الملف الشخصي** (`/profile`) - إدارة الحساب

### صفحات إضافية
1. **تسجيل الدخول** (`/login`)
2. **التسجيل** (`/register`)
3. **الشروط والأحكام** (`/CondtionAterms`)
4. **سياسة الخصوصية** (`/PrivacyPolicy`)

---

## 🎨 التصميم والواجهة

### نظام الألوان
```css
:root {
  --primary-green: #31A342;
  --primary-green-hover: #288435;
  --success-green: #10B981;
  --error-red: #EF4444;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-300: #D1D5DB;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
}
```

### المكونات الأساسية
- **بطاقات المنتجات**: تصميم موحد مع صورة وسعر وزر إضافة
- **فلاتر**: أزرار خضراء للفلاتر النشطة
- **سلايدرز**: عرض أفقي قابل للتمرير
- **نماذج**: تصميم متجاوب مع التحقق من صحة البيانات

---

## 🚀 التطوير والنشر

### متطلبات التطوير
```json
{
  "node": ">=18.0.0",
  "npm": ">=8.0.0",
  "typescript": "^5.0.0"
}
```

### أوامر التطوير
```bash
# تثبيت المتطلبات
npm install

# تشغيل الخادم المحلي
npm run dev

# بناء المشروع
npm run build

# تشغيل الإنتاج
npm start

# فحص الكود
npm run lint
```

### متغيرات البيئة
```env
# قاعدة البيانات
DATABASE_URL="postgresql://..."

# خدمة رفع الملفات
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."

# خرائط جوجل
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."

# نفاذ
NAFATH_API_URL="https://shellafood.com/api/v1"
```

---

## 🔧 إدارة قاعدة البيانات

### إنشاء الجداول
```sql
-- إنشاء جدول أقسام هايبر شلة
CREATE TABLE hyper_shella_categories (
    id text PRIMARY KEY NOT NULL,
    name text NOT NULL,
    image text,
    created_at timestamp DEFAULT now() NOT NULL
);

-- إدراج بيانات افتراضية
INSERT INTO hyper_shella_categories (id, name) VALUES
('vegetables', 'خضروات'),
('fruits', 'فواكه'),
('meat', 'لحوم'),
('dairy', 'منتجات الألبان'),
('bakery', 'مخبوزات'),
('beverages', 'مشروبات'),
('snacks', 'وجبات خفيفة'),
('frozen', 'أطعمة مجمدة');
```

### استخدام Drizzle ORM
```typescript
// جلب الأقسام
const categories = await db
  .select()
  .from(TB_hyper_shella_categories)
  .orderBy(TB_hyper_shella_categories.createdAt);

// جلب المنتجات
const products = await db
  .select()
  .from(TB_products)
  .where(eq(TB_products.storeId, storeId));
```

---

## 🧪 الاختبار والجودة

### اختبار الميزات
- **نظام نفاذ**: اختبار سيناريوهات التوثيق
- **الترجمة**: اختبار تبديل اللغات
- **URL Routing**: اختبار حفظ الحالة
- **سلة التسوق**: اختبار إضافة وحذف المنتجات
- **المفضلة**: اختبار حفظ وإزالة المفضلة

### معايير الجودة
- **TypeScript**: فحص الأنواع
- **ESLint**: فحص جودة الكود
- **Prettier**: تنسيق الكود
- **Responsive Design**: اختبار على أجهزة مختلفة

---

## 🛠 استكشاف الأخطاء وإصلاحها

### مشاكل شائعة

#### 1. مشاكل URL Routing
```typescript
// مشكلة: useSearchParams() يحتاج Suspense
// الحل: إضافة Suspense wrapper
<Suspense fallback={<Loading />}>
  <HomePage />
</Suspense>
```

#### 2. مشاكل قاعدة البيانات
```typescript
// مشكلة: جدول غير موجود
// الحل: إنشاء migration
npx drizzle-kit generate
npx drizzle-kit migrate
```

#### 3. مشاكل الترجمة
```typescript
// مشكلة: الترجمة لا تظهر
// الحل: التحقق من تحميل البيانات
if (!isLoaded) {
  return <div>Loading...</div>;
}
```

---

## 📈 الأداء والتحسين

### تحسينات Next.js
- **Server-Side Rendering (SSR)** للصفحات الرئيسية
- **Static Generation** للمحتوى الثابت
- **Image Optimization** تلقائياً
- **Code Splitting** للمكونات الكبيرة

### تحسينات قاعدة البيانات
- **فهرسة الجداول** للاستعلامات السريعة
- **Connection Pooling** لإدارة الاتصالات
- **Caching** للبيانات المتكررة

### تحسينات الواجهة
- **Lazy Loading** للمكونات الثقيلة
- **Debouncing** لعمليات البحث
- **Memoization** للحسابات المعقدة

---

## 🤝 المساهمة والتطوير

### إرشادات المساهمة
1. **Fork** المشروع
2. **إنشاء branch** للميزة الجديدة
3. **اتباع معايير الكود** المحددة
4. **إضافة اختبارات** للميزات الجديدة
5. **تحديث الوثائق** عند الحاجة
6. **إنشاء Pull Request** مع وصف مفصل

### معايير الكود
```typescript
// تسمية المتغيرات
const userName = 'john_doe';          // camelCase
const USER_ROLE = 'admin';            // UPPER_CASE للثوابت

// تسمية الدوال
const handleSubmit = () => {};        // handle + Action
const validateForm = () => {};        // verb + Noun

// تسمية المكونات
const UserProfile = () => {};         // PascalCase
```

---

## 📞 الدعم والتواصل

### للمطورين
- **GitHub Issues**: لتقارير الأخطاء والاقتراحات
- **GitHub Discussions**: للنقاشات والأسئلة
- **Pull Requests**: للمساهمات

### للمستخدمين
- **دليل المستخدم**: في الموقع الإلكتروني
- **الأسئلة الشائعة**: صفحة FAQ
- **الدعم الفني**: عبر البريد الإلكتروني

---

## 📊 إحصائيات المشروع

### الملفات والمكونات
- **32 صفحة** في التطبيق
- **50+ مكون** React
- **25+ API endpoint**
- **15 جدول** في قاعدة البيانات

### التقنيات المستخدمة
- **Next.js 14** مع App Router
- **TypeScript** للكتابة الآمنة
- **Tailwind CSS 4** للتصميم
- **Drizzle ORM** لقاعدة البيانات
- **PostgreSQL** قاعدة البيانات
- **نفاذ** للتوثيق الرقمي

### الميزات الرئيسية
- ✅ **نظام ترجمة** عربي/إنجليزي
- ✅ **توثيق نفاذ** للمستثمرين
- ✅ **إدارة متاجر** ومنتجات
- ✅ **سلة تسوق** متكاملة
- ✅ **نظام مفضلة** للمستخدمين
- ✅ **URL routing** متقدم
- ✅ **تصميم متجاوب** لجميع الأجهزة
- ✅ **نظام مصادقة** آمن

---

## 🎯 الخطط المستقبلية

### ميزات مقترحة
1. **نظام تقييمات** للمنتجات والمتاجر
2. **نظام نقاط** وولاء العملاء
3. **تطبيق جوال** React Native
4. **نظام إشعارات** push notifications
5. **تحليلات متقدمة** للمبيعات
6. **نظام دفع** متكامل
7. **دعم لغات إضافية** (فرنسية، ألمانية)

### تحسينات تقنية
1. **PWA** (Progressive Web App)
2. **Service Workers** للتخزين المؤقت
3. **WebSocket** للتحديثات المباشرة
4. **Redis** للتخزين المؤقت
5. **Docker** للنشر
6. **CI/CD** pipeline

---

**تم التطوير بواسطة**: فريق تطوير شلة  
**آخر تحديث**: ديسمبر 2024  
**الإصدار**: 2.0.0  
**الرخصة**: خاصة

---

*هذا الدليل يغطي جميع جوانب مشروع شلة التقنية والوظيفية. للمزيد من المعلومات أو الاستفسارات، يرجى التواصل مع فريق التطوير.*