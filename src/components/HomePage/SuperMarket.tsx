'use client';

import React from 'react';

// Define the component's props
interface SuperMarketProps {
    onStoreClick: (storeName: string) => void;
}

export default function SuperMarket({ onStoreClick }: SuperMarketProps) {
    const superMarketStores = [
        {
            title: "بقالة السعودية",
            rating: 4.5,
            reviews: 350,
            deliveryTime: "10 دقائق",
            image: "https://via.placeholder.com/400x200?text=Saudi+Grocery"
        },
        {
            title: "بقالة السعودية",
            rating: 4.5,
            reviews: 350,
            deliveryTime: "10 دقائق",
            image: "https://via.placeholder.com/400x200?text=Saudi+Grocery"
        },
        {
            title: "متاجر الفارس الاقتصادية",
            rating: 4.7,
            reviews: 500,
            deliveryTime: "60 دقيقة",
            image: "https://via.placeholder.com/400x200?text=Al+Faris+Stores"
        },
        {
            title: "بقالة السعودية",
            rating: 4.5,
            reviews: 350,
            deliveryTime: "10 دقائق",
            image: "https://via.placeholder.com/400x200?text=Saudi+Grocery"
        },
        {
            title: "ماركت الخير",
            rating: 4.2,
            reviews: 500,
            deliveryTime: "60 دقيقة",
            image: "https://via.placeholder.com/400x200?text=Al+Khair+Market"
        },
        {
            title: "متاجر التوفير",
            rating: 4.7,
            reviews: 500,
            deliveryTime: "60 دقيقة",
            image: "https://via.placeholder.com/400x200?text=Al+Tawfeer+Stores"
        },
        // يمكنك إضافة المزيد من المتاجر هنا
    ];

    return (
        <div className="p-4 md:p-8" dir="rtl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                سوبر ماركت
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {superMarketStores.map((store, index) => (
                    <button
                        key={index}
                        onClick={() => onStoreClick(store.title)}
                        className="flex flex-col rounded-lg bg-gray-100 shadow-sm overflow-hidden cursor-pointer"
                    >
                        <div className="relative h-48 bg-gray-200">
                            <img
                                src={store.image}
                                alt={store.title}
                                className="h-full w-full object-cover"
                            />
                            <span className="absolute top-2 right-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-800 shadow">
                                {store.deliveryTime}
                            </span>
                        </div>
                        <div className="p-4 text-right">
                            <h3 className="text-lg font-bold text-gray-800">
                                {store.title}
                            </h3>
                            <div className="flex items-center justify-end mt-1 text-sm text-gray-600">
                                <span className="mr-1">({store.reviews}+)</span>
                                <span>{store.rating}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1 text-yellow-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}