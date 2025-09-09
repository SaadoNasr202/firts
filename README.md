# مشروع شلة - تطبيق التوصيل والخدمات

## نظرة عامة
مشروع شلة هو تطبيق شامل للتوصيل والخدمات يدعم اللغتين العربية والإنجليزية مع نظام ترجمة متكامل.

## الميزات الرئيسية

### 🌐 نظام الترجمة المتكامل
- دعم اللغتين العربية والإنجليزية
- تبديل سلس بين اللغات
- حفظ اختيار اللغة عبر الجلسات
- تحديث تلقائي لاتجاه النص (RTL/LTR)
- تحديث عنوان الصفحة ديناميكياً

### 📱 الصفحات المترجمة
1. **شريط التنقل (Navbar)**
2. **صفحة المستثمر (InvestorPage)**
3. **نموذج تسجيل المستثمر (InvestorRegister)**
4. **صفحة الشريك (PartnerPage)**
5. **نموذج تسجيل الشريك (PartnerRegister)**
6. **صفحة السائق (DriverPage)**
7. **نموذج تسجيل السائق (DriverRegister)**
8. **صفحة العامل (WorkerPage)**
9. **نموذج تسجيل العامل (WorkerRegister)**
10. **صفحة الهبوط الرئيسية (LandingPage)**
11. **الفوتر (Footer)**
12. **صفحة قيدها (KaidhaPage)**
13. **نموذج تسجيل قيدها (KaidhaRegister)**

## التقنيات المستخدمة

### Frontend
- **Next.js 14** - إطار عمل React
- **TypeScript** - لغة البرمجة
- **Tailwind CSS** - للتصميم
- **React Context API** - لإدارة الحالة
- **Lucide React** - للأيقونات

### المكتبات الخارجية
- **react-phone-input-2** - لإدخال أرقام الهواتف
- **@react-google-maps/api** - للخرائط
- **uploadthing** - لرفع الملفات

## هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx                 # التخطيط الرئيسي مع LanguageProvider
│   └── page.tsx                   # الصفحة الرئيسية
├── components/
│   ├── navbar.tsx                 # شريط التنقل مع اختيار اللغة
│   ├── shellafooter.tsx           # الفوتر المترجم
│   └── LandingPage/
│       ├── landingpage.tsx        # صفحة الهبوط الرئيسية
│       ├── investore.tsx          # صفحة المستثمر
│       ├── InvestoreRegister.tsx  # نموذج تسجيل المستثمر
│       ├── partmerPage.tsx        # صفحة الشريك
│       ├── partnerregister.tsx    # نموذج تسجيل الشريك
│       ├── driverPage.tsx         # صفحة السائق
│       ├── driverregister.tsx     # نموذج تسجيل السائق
│       ├── WorkerPage.tsx         # صفحة العامل
│       ├── WorkerRegister.tsx     # نموذج تسجيل العامل
│       ├── KaidhaPage.tsx         # صفحة قيدها
│       └── KaidhaRegister.tsx     # نموذج تسجيل قيدها
├── contexts/
│   └── LanguageContext.tsx        # سياق إدارة اللغة والترجمة
└── lib/
    └── utils.ts                   # أدوات مساعدة
```

## التطوير والتنفيذ

### الخطوة 1: إعداد نظام الترجمة
تم إنشاء نظام ترجمة شامل باستخدام React Context API:

#### إنشاء LanguageContext
```typescript
// src/contexts/LanguageContext.tsx
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [isLoaded, setIsLoaded] = useState(false);

  // تحميل اللغة من localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
      setIsLoaded(true);
    }
  }, []);

  // حفظ اللغة في localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language, isLoaded]);

  // تحديث HTML attributes ديناميكياً
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      document.title = language === 'ar' ? 'شلة' : 'Shellaksa';
    }
  }, [language, isLoaded]);
};
```

#### إعداد التخطيط الرئيسي
```typescript
// src/app/layout.tsx
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

### الخطوة 2: تطوير شريط التنقل
تم إنشاء شريط تنقل متقدم مع قائمة منسدلة لاختيار اللغة:

#### الميزات المضافة:
- **قائمة منسدلة** لاختيار اللغة
- **أيقونات العلم** (العلم السعودي للعربية، علم المملكة المتحدة للإنجليزية)
- **إغلاق تلقائي** عند النقر خارج القائمة
- **تحديث فوري** للواجهة عند تغيير اللغة

```typescript
// src/components/navbar.tsx
const { language, setLanguage } = useLanguage();
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

// إغلاق القائمة عند النقر خارجها
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### الخطوة 3: ترجمة الصفحات
تم ترجمة جميع الصفحات والمكونات بشكل منهجي:

#### 3.1 صفحة المستثمر
- **العنوان والوصف**: "انضم كمستثمر في شلة"
- **المزايا**: 4 مزايا رئيسية للمستثمرين
- **نموذج التسجيل**: جميع الحقول والرسائل

#### 3.2 صفحة الشريك
- **العنوان**: "انضم كشريك تجاري في شلة"
- **المزايا**: 4 مزايا للشراكة التجارية
- **نموذج التسجيل**: معلومات المتجر والموقع

#### 3.3 صفحة السائق
- **العنوان**: "انضم كسائق في شلة"
- **المزايا**: 2 مزايا رئيسية للسائقين
- **نموذج التسجيل**: معلومات السائق والمركبة

#### 3.4 صفحة العامل
- **العنوان**: "انضم كعامل في شلة"
- **المزايا**: 2 مزايا للعمال
- **نموذج التسجيل**: معلومات العامل والمهارات

#### 3.5 صفحة قيدها
- **الوصف**: خدمة التمويل الاستهلاكي "اشتر الآن، ادفع مع الراتب"
- **نموذج التسجيل**: نموذج شامل للمعلومات الشخصية والعمل

### الخطوة 4: تطوير النماذج
تم تطوير نماذج تسجيل متقدمة مع:

#### الميزات المشتركة:
- **التحقق من صحة البيانات** في الوقت الفعلي
- **رسائل خطأ مخصصة** لكل حقل
- **رفع الملفات** (الهوية، الصور)
- **الخرائط التفاعلية** لتحديد المواقع
- **أرقام الهواتف الدولية** مع react-phone-input-2

#### نموذج قيدها المتقدم:
```typescript
// معلومات شخصية شاملة
- الاسم الأول، اسم العائلة، اسم الأب، اسم الجد
- تاريخ الميلاد، الجنسية، الحالة الاجتماعية
- نوع الهوية، رقم الهوية، تاريخ الانتهاء
- رقم الجوال، رقم الواتساب، البريد الإلكتروني
- نوع المنزل، طبيعة المنزل، المدينة، الحي
- العنوان التفصيلي للمنزل

// معلومات العمل
- اسم الشركة، المسمى الوظيفي
- عدد سنين العمل، إجمالي الراتب
- العنوان التفصيلي للعمل

// الخرائط التفاعلية
- تحديد موقع السكن على الخريطة
- تحديد موقع العمل على الخريطة
- البحث عن المواقع
- تحديد الموقع الحالي

// مصادر الدخل الإضافية
- هل لديك أقساط؟
- مصادر دخل إضافية
- المبلغ وجهة الدخل
```

### الخطوة 5: إدارة الحالة والبيانات
تم تطوير نظام إدارة حالة متقدم:

#### استخدام React Context:
```typescript
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

#### دالة الترجمة:
```typescript
const t = (key: string): string => {
  if (!isLoaded) {
    return translations.ar[key as keyof typeof translations.ar] || key;
  }
  return translations[language][key as keyof typeof translations[typeof language]] || key;
};
```

### الخطوة 6: التصميم والواجهة
تم تطوير واجهة مستخدم حديثة ومتجاوبة:

#### استخدام Tailwind CSS:
- **تصميم متجاوب** لجميع أحجام الشاشات
- **ألوان متناسقة** مع هوية العلامة التجارية
- **تأثيرات تفاعلية** للأزرار والعناصر
- **تخطيط مرن** باستخدام CSS Grid و Flexbox

#### المكونات المخصصة:
```typescript
// مكون SelectField قابل لإعادة الاستخدام
const SelectField = ({ label, name, options, value, onChange, required = false }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-right font-semibold text-gray-700">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
      required={required}
    >
      <option value="">{t('kaidhaForm.placeholder.choose')}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
```

## الملفات المضافة والمعدلة

### ملفات جديدة:
1. **`src/contexts/LanguageContext.tsx`** - سياق إدارة اللغة
2. **`public/logous.svg`** - أيقونة العلم الإنجليزي

### ملفات معدلة:
1. **`src/app/layout.tsx`** - إضافة LanguageProvider
2. **`src/components/navbar.tsx`** - إضافة اختيار اللغة
3. **`src/components/shellafooter.tsx`** - ترجمة الفوتر
4. **`src/components/LandingPage/landingpage.tsx`** - ترجمة صفحة الهبوط
5. **`src/components/LandingPage/investore.tsx`** - ترجمة صفحة المستثمر
6. **`src/components/LandingPage/InvestoreRegister.tsx`** - ترجمة نموذج المستثمر
7. **`src/components/LandingPage/partmerPage.tsx`** - ترجمة صفحة الشريك
8. **`src/components/LandingPage/partnerregister.tsx`** - ترجمة نموذج الشريك
9. **`src/components/LandingPage/driverPage.tsx`** - ترجمة صفحة السائق
10. **`src/components/LandingPage/driverregister.tsx`** - ترجمة نموذج السائق
11. **`src/components/LandingPage/WorkerPage.tsx`** - ترجمة صفحة العامل
12. **`src/components/LandingPage/WorkerRegister.tsx`** - ترجمة نموذج العامل
13. **`src/components/LandingPage/KaidhaPage.tsx`** - ترجمة صفحة قيدها
14. **`src/components/LandingPage/KaidhaRegister.tsx`** - ترجمة نموذج قيدها

## التحديات والحلول

### التحدي 1: إدارة الحالة في Next.js SSR
**المشكلة**: تعارض بين Server-Side Rendering و localStorage
**الحل**: استخدام `isLoaded` state و `typeof window !== 'undefined'` checks

### التحدي 2: تحديث HTML Attributes ديناميكياً
**المشكلة**: الحاجة لتحديث `dir` و `lang` و `title` عند تغيير اللغة
**الحل**: استخدام `useEffect` لتحديث DOM مباشرة

### التحدي 3: ترجمة النماذج المعقدة
**المشكلة**: نماذج كبيرة مع العديد من الحقول والرسائل
**الحل**: تنظيم الترجمات في هيكل منطقي واستخدام مكونات قابلة لإعادة الاستخدام

### التحدي 4: دعم الخرائط التفاعلية
**المشكلة**: ترجمة رسائل الخرائط والأزرار
**الحل**: إضافة ترجمات مخصصة لجميع عناصر الخريطة

## الاختبار والجودة

### التحقق من الأخطاء:
- استخدام `read_lints` للتحقق من أخطاء TypeScript
- اختبار تبديل اللغات
- التحقق من استجابة التصميم
- اختبار النماذج والتحقق من صحة البيانات

### الأداء:
- تحميل سريع للترجمات
- تحديث فوري للواجهة
- حفظ فعال لاختيار اللغة

## التطوير المستقبلي

### ميزات مقترحة:
1. **دعم لغات إضافية** (الفرنسية، الألمانية)
2. **ترجمة ديناميكية** من API
3. **تحسين SEO** للغات متعددة
4. **اختبارات تلقائية** للترجمة
5. **إدارة محتوى** للترجمات

### تحسينات تقنية:
1. **Code Splitting** للترجمات
2. **Lazy Loading** للمكونات
3. **تحسين الأداء** للخرائط
4. **إدارة أفضل للحالة**

## كيفية التشغيل

### المتطلبات:
- Node.js 18+
- npm أو yarn

### التثبيت:
```bash
npm install
# أو
yarn install
```

### التشغيل:
```bash
npm run dev
# أو
yarn dev
```

### البناء:
```bash
npm run build
# أو
yarn build
```

## المساهمة

### إرشادات التطوير:
1. اتبع معايير TypeScript
2. استخدم Tailwind CSS للتصميم
3. أضف ترجمات جديدة في LanguageContext
4. اختبر التغييرات على كلا اللغتين
5. اتبع نمط التسمية المتفق عليه

### إضافة ترجمات جديدة:
1. أضف المفتاح في `translations.ar` و `translations.en`
2. استخدم `t('key')` في المكونات
3. اختبر الترجمة على كلا اللغتين

## الدعم والمساعدة

### المشاكل الشائعة:
1. **الترجمة لا تظهر**: تأكد من إضافة المفتاح في LanguageContext
2. **اتجاه النص خاطئ**: تحقق من `dir` attribute في HTML
3. **اللغة لا تُحفظ**: تأكد من `localStorage` permissions

### التواصل:
- للمشاكل التقنية: فتح issue في GitHub
- للاقتراحات: فتح discussion
- للأسئلة: التواصل عبر البريد الإلكتروني

---

**تم التطوير بواسطة**: فريق تطوير شلة  
**آخر تحديث**: ديسمبر 2024  
**الإصدار**: 1.0.0