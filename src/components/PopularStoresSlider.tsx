'use client';

import React from 'react';

interface PopularStoresSliderProps {
    onStoreClick: (storeName: string) => void;
}

export default function PopularStoresSlider({ onStoreClick }: PopularStoresSliderProps) {
  const popularStores = [
    {
      title: "بيت الشاورما",
      description: "شاورما، وجبات سريعة",
      time: "20 دقيقة",
      image: "https://via.placeholder.com/400x200?text=Shawarma+House",
    },
 
    {
      title: "بوابة السعودية",
      description: "مقهى، مطعم",
      time: "20 دقيقة",
      image: "https://via.placeholder.com/400x200?text=Saudi+Gate",
    },
    {
      title: "فطايري",
      description: "فطائر ومعجنات",
      time: "25 دقيقة",
      image: "https://via.placeholder.com/400x200?text=Fatairi",
    },
    {
      title: "كريب هاوس",
      description: "حلويات وكريب",
      time: "30 دقيقة",
      image: "https://via.placeholder.com/400x200?text=Crepe+House",
    },
  ];

  const handleScrollRight = () => {
    document.getElementById('popular-stores-scroll-container')?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleScrollLeft = () => {
    document.getElementById('popular-stores-scroll-container')?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  return (
    <div className="relative flex items-center">
      {/* سهم التنقل الأيسر */}
      <button 
        className="absolute -left-4 z-10 hidden rounded-full bg-white p-2 shadow-md md:block" 
        onClick={handleScrollLeft}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* حاوية المحلات */}
      <div id="popular-stores-scroll-container" className="flex overflow-x-auto scrollbar-hide gap-4 pb-2 px-4">
        {popularStores.map((store, index) => (
          <button 
            key={index} 
            onClick={() => onStoreClick(store.title)}
            className="flex-shrink-0 w-80 md:w-96 flex flex-col bg-gray-100 rounded-lg overflow-hidden shadow-sm cursor-pointer"
          >
            <div className="relative h-48 bg-gray-200">
              <img src={store.image} alt={store.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-800 shadow">
                {store.time}
              </span>
            </div>
            <div className="p-4 text-right">
              <h3 className="text-lg font-bold text-gray-800">{store.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{store.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* سهم التنقل الأيمن */}
      <button 
        className="absolute -right-4 z-10 hidden rounded-full bg-white p-2 shadow-md md:block" 
        onClick={handleScrollRight}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}