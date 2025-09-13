"use client";

import { useState, useEffect } from "react";

interface Product {
	id: string;
	name: string;
	image: string;
	price: string;
	originalPrice?: string;
	unit?: string;
}

interface ProductsPageProps {
	categoryName: string;
	storeName: string;
	onProductClick: (productId: number) => void;
}

export default function ProductsPage({
	categoryName,
	storeName,
	onProductClick,
}: ProductsPageProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/stores/${encodeURIComponent(storeName)}/products?category=${encodeURIComponent(categoryName)}`);
				if (response.ok) {
					const data = await response.json();
					setProducts(data.products || []);
				} else {
					console.error('فشل في جلب المنتجات');
				}
			} catch (error) {
				console.error('خطأ في جلب المنتجات:', error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categoryName && storeName) {
			fetchProducts();
		}
	}, [categoryName, storeName]);

	// عرض حالة التحميل
	if (isLoading) {
		return (
			<div className="p-4 md:p-8" dir="rtl">
				<div className="h-8 w-64 animate-pulse bg-gray-300 rounded mb-4"></div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
						<div key={item} className="flex flex-col overflow-hidden rounded-lg bg-gray-100 p-4 shadow-sm">
							<div className="h-32 w-full animate-pulse bg-gray-300 rounded mb-2"></div>
							<div className="h-4 w-3/4 animate-pulse bg-gray-300 rounded mb-1"></div>
							<div className="h-3 w-1/2 animate-pulse bg-gray-300 rounded mb-2"></div>
							<div className="h-5 w-16 animate-pulse bg-gray-300 rounded"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-8" dir="rtl">
			<h2 className="mb-4 text-xl font-bold text-gray-900">
				المنتجات في قسم {categoryName}
			</h2>
			{products.length === 0 ? (
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
						</svg>
						<p className="text-gray-500 text-lg">لا توجد منتجات في {categoryName}</p>
						<p className="text-gray-400 text-sm mt-2">جرب تصفح أقسام أخرى</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{products.map((product) => (
						<button
							key={product.id}
							onClick={() => onProductClick(parseInt(product.id))}
							className="flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="relative">
								<img
									src={product.image}
									alt={product.name}
									className="h-32 w-full object-contain"
								/>
								<button className="absolute right-2 bottom-2 rounded-full bg-green-500 p-2 text-white shadow-md hover:bg-green-600 transition-colors">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 4v16m8-8H4"
										/>
									</svg>
								</button>
							</div>
							<div className="mt-2 text-right">
								<h3 className="text-sm font-semibold text-gray-800">
									{product.name}
								</h3>
								{product.unit && (
									<p className="text-xs text-gray-500">{product.unit}</p>
								)}
								<div className="mt-2 flex items-center justify-end">
									{product.originalPrice && (
										<span className="ml-2 text-xs text-gray-400 line-through">
											{product.originalPrice}
										</span>
									)}
									<span className="text-md font-bold text-green-600">
										{product.price}
									</span>
								</div>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
