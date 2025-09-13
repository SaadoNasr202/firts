'use client';

import React, { useState, useEffect } from 'react';

interface Store {
	id: string;
	name: string;
	type: string;
	rating?: string;
	image?: string;
}

interface CategoryStoresPageProps {
	categoryName: string;
	onStoreClick: (storeName: string) => void;
}

export default function CategoryStoresPage({ categoryName, onStoreClick }: CategoryStoresPageProps) {
	const [stores, setStores] = useState<Store[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCategoryStores = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/stores/by-category?category=${encodeURIComponent(categoryName)}`);
				if (response.ok) {
					const data = await response.json();
					setStores(data.stores || []);
				} else {
					console.error('فشل في جلب متاجر القسم');
				}
			} catch (error) {
				console.error('خطأ في جلب متاجر القسم:', error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categoryName) {
			fetchCategoryStores();
		}
	}, [categoryName]);

	// عرض حالة التحميل
	if (isLoading) {
		return (
			<div className="p-4 md:p-8" dir="rtl">
				<div className="h-8 w-48 animate-pulse bg-gray-300 rounded mb-6"></div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="h-48 animate-pulse bg-gray-300"></div>
							<div className="p-4">
								<div className="h-6 w-3/4 animate-pulse bg-gray-300 rounded mb-2"></div>
								<div className="h-4 w-1/2 animate-pulse bg-gray-300 rounded mb-2"></div>
								<div className="h-4 w-1/3 animate-pulse bg-gray-300 rounded"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// إذا لم توجد متاجر
	if (stores.length === 0) {
		return (
			<div className="p-4 md:p-8" dir="rtl">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">{categoryName}</h2>
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
						<p className="text-gray-500 text-lg">لا توجد متاجر متاحة في {categoryName}</p>
						<p className="text-gray-400 text-sm mt-2">جرب تصفح أقسام أخرى</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-8" dir="rtl">
			<h2 className="text-2xl font-bold text-gray-900 mb-6">{categoryName}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{stores.map((store) => (
					<div
						key={store.id}
						onClick={() => onStoreClick(store.name)}
						className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
					>
						<div className="relative h-48 bg-gray-200">
							{store.image ? (
								<img
									src={store.image}
									alt={store.name}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
									<svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
									</svg>
								</div>
							)}
						</div>
						<div className="p-4 text-right">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">{store.name}</h3>
							<p className="text-gray-600 mb-2">{store.type}</p>
							{store.rating && (
								<div className="flex items-center justify-end">
									<span className="text-sm text-gray-500 mr-1">{store.rating}</span>
									<svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
									</svg>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
