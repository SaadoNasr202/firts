// src/components/Condetion/ContractModal.tsx
"use client";

import { useEffect, useState } from "react";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
}

export default function ContractModal({
  isOpen,
  onClose,
  fileUrl,
}: ContractModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  // كشف نوع الجهاز بطريقة محسنة
  useEffect(() => {
    const checkDevice = () => {
      // طريقة 1: User Agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // طريقة 2: Screen width
      const isMobileScreen = window.innerWidth <= 768;
      
      // طريقة 3: Touch support
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // طريقة 4: Platform
      const isMobilePlatform = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.platform);
      
      // إذا كان أي من الطرق تشير للموبايل، نعتبره موبايل
      const isMobileDevice = isMobileUserAgent || isMobileScreen || (isTouchDevice && isMobilePlatform);
      
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // إغلاق النافذة عند الضغط على زر Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // منع التمرير عند فتح النافذة
      document.body.style.overflow = "hidden";
      // محاكاة التحميل
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
      // إعادة تعيين حالة iframe
      setIframeFailed(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // إعادة التمرير عند إغلاق النافذة
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // معالجة فشل iframe
  const handleIframeError = () => {
    setIframeFailed(true);
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-2 sm:p-4">
      <div className="relative flex h-full max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        {/* رأس النافذة */}
        <div className="flex flex-shrink-0 items-center justify-between border-b p-3 sm:p-4">
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            مسودة العقد
          </h2>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="إغلاق"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* محتوى النافذة */}
        <div className="flex-1 overflow-hidden p-2 sm:p-4">
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
                <p className="mt-2 text-sm text-gray-600">
                  جاري فتح العقد...
                </p>
              </div>
            </div>
          )}

          {/* عرض العقد */}
          {!isLoading && (
            <div className="h-full w-full">
              {/* محاولة عرض PDF باستخدام iframe - فقط إذا لم يفشل ولم يكن على موبايل */}
              {!iframeFailed && !isMobile && (
                <div className="h-full w-full">
                  <iframe
                    src={`${fileUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                    className="h-full w-full rounded"
                    title="مسودة العقد"
                    frameBorder="0"
                    onError={handleIframeError}
                    onLoad={() => setIframeFailed(false)}
                    style={{
                      minHeight: '400px',
                      height: 'calc(100vh - 200px)',
                      maxHeight: '80vh'
                    }}
                  />
                </div>
              )}

              {/* إذا فشل iframe أو على الموبايل، نعرض واجهة بديلة */}
              {(iframeFailed || isMobile) && (
                <div className="flex h-full w-full flex-col items-center justify-center text-center p-4">
                  {/* أيقونة PDF كبيرة */}
                  <div className="mb-6 text-red-500">
                    <svg className="mx-auto h-20 w-20 sm:h-24 sm:w-24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                  </div>
                  
                  <h3 className="mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
                    مسودة العقد جاهزة
                  </h3>
                  
                  <p className="mb-6 text-sm text-gray-600 max-w-sm">
                    {isMobile 
                      ? "على الموبايل، نوصي بفتح العقد في نافذة جديدة للحصول على أفضل تجربة عرض."
                      : "حدث خطأ في عرض العقد. يمكنك استخدام الخيارات التالية:"
                    }
                  </p>

                  {/* معلومات الملف */}
                  <div className="mb-6 w-full rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                      <span className="font-medium">عقد_المستثمر.pdf</span>
                    </div>
                    <p>نوع الملف: PDF</p>
                    <p>الحالة: جاهز للعرض</p>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex w-full flex-col gap-3">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      فتح العقد في نافذة جديدة
                    </a>
                    
                    <a
                      href={fileUrl}
                      download="عقد_المستثمر.pdf"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      تحميل العقد
                    </a>
                  </div>
                </div>
              )}

              {/* خيارات إضافية للكمبيوتر إذا لم يفشل iframe */}
              {!isMobile && !iframeFailed && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    إذا لم يظهر العقد أعلاه، يمكنك استخدام الخيارات التالية:
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row justify-center">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      فتح في نافذة جديدة
                    </a>
                    
                    <a
                      href={fileUrl}
                      download="عقد_المستثمر.pdf"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      تحميل العقد
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* أسفل النافذة */}
        <div className="flex flex-shrink-0 justify-between border-t p-3 sm:p-4">
          <div className="text-sm text-gray-500">
            {isMobile 
              ? "على الموبايل، استخدم الأزرار أعلاه لعرض العقد"
              : "العقد معروض أعلاه. إذا لم يظهر، استخدم الخيارات في الأعلى."
            }
          </div>
          <div className="flex gap-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
            >
              فتح في نافذة جديدة
            </a>
            <a
              href={fileUrl}
              download="عقد_المستثمر.pdf"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
            >
              تحميل العقد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}