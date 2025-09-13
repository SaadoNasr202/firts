// NearbyStoresPage.tsx
"use client";

import { useState, useEffect } from "react";

interface Store {
	id: string;
	name: string;
	image: string;
	type?: string;
	rating?: string;
}

interface NearbyStoresPageProps {
	onStoreClick: (storeName: string) => void;
}

export default function NearbyStoresPage({
	onStoreClick,
}: NearbyStoresPageProps) {
	const [stores, setStores] = useState<Store[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchNearbyStores = async () => {
			try {
				const response = await fetch('/api/stores/nearby');
				if (response.ok) {
					const data = await response.json();
					setStores(data.stores || []);
				} else {
					console.error('فشل في جلب المتاجر القريبة');
				}
			} catch (error) {
				console.error('خطأ في جلب المتاجر القريبة:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNearbyStores();
	}, []);
	const handleScrollRight = () => {
		document
			.getElementById("nearby-stores-scroll-container")
			?.scrollBy({ left: 200, behavior: "smooth" });
	};

	const handleScrollLeft = () => {
		document
			.getElementById("nearby-stores-scroll-container")
			?.scrollBy({ left: -200, behavior: "smooth" });
	};

	// عرض حالة التحميل
	if (isLoading) {
		return (
			<div className="relative flex items-center p-4 md:p-8" dir="rtl">
				<div className="scrollbar-hide flex gap-5 space-x-reverse overflow-x-auto px-4 pb-2">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div key={item} className="flex w-[109px] flex-shrink-0 flex-col items-center text-center">
							<div className="h-[85px] w-[85px] animate-pulse rounded-lg bg-gray-300"></div>
							<div className="mt-2 h-3 w-16 animate-pulse bg-gray-300 rounded"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// إذا لم توجد متاجر
	if (stores.length === 0) {
		return (
			<div className="flex items-center justify-center py-8">
				<p className="text-gray-500">لا توجد متاجر قريبة متاحة حالياً</p>
			</div>
		);
	}

	return (
		<div className="relative flex items-center p-4 md:p-8" dir="rtl">
			{/* سهم التنقل الأيسر */}
			<button
				className="absolute -left-4 z-10 hidden rounded-full bg-white p-2 shadow-md md:block"
				onClick={handleScrollLeft}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-gray-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			{/* حاوية المتاجر */}
			<div
				id="nearby-stores-scroll-container"
				className="scrollbar-hide flex gap-5 space-x-reverse overflow-x-auto px-4 pb-2"
			>
				{stores.map((store, index) => (
					<button
						key={index}
						onClick={() => onStoreClick(store.name)}
						className="flex w-[109px] flex-shrink-0 cursor-pointer flex-col items-center text-center"
					>
						<div className="flex h-[85px] w-[85px] items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-md">
							<img
								src={store.image}
								alt={store.name}
								className="h-full w-full object-cover"
							/>
						</div>
						<p className="mt-2 text-xs text-gray-700">{store.name}</p>
					</button>
				))}
			</div>

			{/* سهم التنقل الأيمن */}
			<button
				className="absolute -right-4 z-10 hidden rounded-full bg-white p-2 shadow-md md:block"
				onClick={handleScrollRight}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-gray-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>
	);
}
