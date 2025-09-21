'use client';

import React, { useState, useEffect } from 'react';
import { useStoreFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/ui/FavoriteButton";
import { useClientCache, cacheKeys } from "@/hooks/useClientCache";

// Define the component's props
interface StorePageProps {
  storeName: string;
  onCategoryClick: (categoryName: string) => void;
}

interface StoreDetails {
  id: string;
  name: string;
  type: string;
  rating: string;
  image: string;
}

export default function StorePage({ storeName, onCategoryClick }: StorePageProps) {
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
  
  const { isFavorite, isLoading: favoriteLoading, toggleFavorite } = useStoreFavorites(
    storeDetails?.id || ""
  );

  // استخدام التخزين المؤقت على مستوى العميل
  const { data: storeData, isLoading, error } = useClientCache(
    cacheKeys.storeCategories(storeName),
    async () => {
      const response = await fetch(`/api/store-categories?storeName=${encodeURIComponent(storeName)}`);
      if (!response.ok) {
        throw new Error('فشل في جلب بيانات المتجر');
      }
      return response.json();
    },
    600 // 10 دقائق
  );

  // تحديث البيانات عند تغيير storeData
  useEffect(() => {
    if (storeData) {
      setProductCategories(storeData.categories || []);
      if (storeData.store) {
        setStoreDetails(storeData.store);
      }
    }
  }, [storeData]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Store Header Section */}
      <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden bg-gray-200">
        {isLoading ? (
          <div className="w-full h-full animate-pulse bg-gray-300"></div>
        ) : storeDetails?.image ? (
          <img
            src={storeDetails.image}
            alt={storeDetails.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <svg className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        
        {/* زر المفضلة في الزاوية اليسرى العليا من الصورة */}
        {storeDetails?.id && !isLoading && (
          <FavoriteButton
            isFavorite={isFavorite}
            isLoading={favoriteLoading}
            onToggle={toggleFavorite}
            size="md"
            className="absolute top-4 left-4"
          />
        )}
      </div>

      <div className="bg-white p-4 md:p-8 rounded-t-2xl -mt-8 relative z-10 shadow-lg">
        <div className="flex justify-between items-start">
          <div className="text-right relative">
            {isLoading ? (
              <>
                <div className="h-8 w-48 animate-pulse bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-32 animate-pulse bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-40 animate-pulse bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-24 animate-pulse bg-gray-300 rounded"></div>
              </>
            ) : storeDetails ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900">{storeDetails.name}</h1>
                <p className="text-gray-600 mt-1">{storeDetails.type}</p>
                <div className="flex items-center justify-end text-sm text-gray-500 mt-2">
                  <span className="mr-2">متاح للتوصيل</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {storeDetails.rating && (
                  <div className="flex items-center justify-end text-sm text-gray-600 mt-1">
                    <span className="mr-1">{storeDetails.rating}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500">
                <p>خطأ في تحميل تفاصيل المتجر</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center p-2 rounded-lg bg-gray-200">
            {/* Shopping cart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.625.707 1.625H18.5a1 1 0 00.95-1.285L17.154 5H6.264" />
            </svg>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />
      
      {/* Product Categories Section */}
      <div className="p-4 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">أقسام المتجر</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {isLoading ? (
            // عرض skeleton أثناء التحميل بنفس التصميم
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center text-center p-2 rounded-lg bg-white shadow-sm">
                <div className="h-16 w-16 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="mt-2 h-3 w-12 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))
          ) : (
            productCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => onCategoryClick(category)}
              className="flex flex-col items-center text-center p-2 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition-colors relative"
            >
              <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                {/* Placeholder for icon/image */}
                <span className="text-xs text-gray-500">
                  {category.slice(0, 3)}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">{category}</p>
            </button>
          ))
          )}
        </div>
      </div>
    </div>
  );
}