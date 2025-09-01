// src/components/Condetion/ContractModal.tsx
"use client";

import { useEffect } from "react";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
}

export default function ContractModal({ isOpen, onClose, fileUrl }: ContractModalProps) {
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
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // إعادة التمرير عند إغلاق النافذة
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* رأس النافذة */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">مسودة العقد</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="إغلاق"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* محتوى النافذة */}
        <div className="flex-1 overflow-auto p-4">
          <iframe 
            src={fileUrl} 
            className="w-full h-[80vh] min-h-[400px] md:h-[600px]"
            title="مسودة العقد"
          />
        </div>
        
        {/* أسفل النافذة */}
        <div className="flex justify-end p-4 border-t">
          <a
            href={fileUrl}
            download="عقد_المستثمر.pdf"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            تحميل العقد
          </a>
        </div>
      </div>
    </div>
  );
}
