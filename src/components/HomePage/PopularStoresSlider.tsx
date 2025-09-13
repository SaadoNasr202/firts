"use client";

import { useEffect, useState } from "react";

// تحديد نوع البيانات
interface Store {
	id: string;
	name: string;
	image?: string;
	type?: string;
	rating?: string;
}

interface PopularStoresSliderProps {
	onStoreClick: (storeName: string) => void;
}

export default function PopularStoresSlider({
	onStoreClick,
}: PopularStoresSliderProps) {
	const [stores, setStores] = useState<Store[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStores = async () => {
			try {
				const response = await fetch("/api/stores/nearby");
				if (response.ok) {
					const data = await response.json();
					setStores(data.stores || []);
				} else {
					console.error("فشل في جلب المتاجر");
				}
			} catch (error) {
				console.error("خطأ في جلب المتاجر:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStores();
	}, []);

	const handleScrollRight = () => {
		document
			.getElementById("popular-stores-scroll-container")
			?.scrollBy({ left: 300, behavior: "smooth" });
	};

	const handleScrollLeft = () => {
		document
			.getElementById("popular-stores-scroll-container")
			?.scrollBy({ left: -300, behavior: "smooth" });
	};

	// إذا كان يتم تحميل البيانات
	if (isLoading) {
		return (
			<div className="relative flex items-center">
				<div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2">
					{/* عرض skeleton أثناء التحميل */}
					{[1, 2, 3, 4].map((item) => (
						<div key={item} className="flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-96">
							<div className="h-48 animate-pulse bg-gray-300"></div>
							<div className="p-4">
								<div className="h-5 w-32 animate-pulse rounded bg-gray-300 mb-2"></div>
								<div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
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
			<div className="flex items-center justify-center py-8">
				<p className="text-gray-500">لا توجد متاجر شهيرة متاحة حالياً</p>
			</div>
		);
	}

	return (
		<div className="relative flex items-center">
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

			{/* حاوية المحلات */}
			<div
				id="popular-stores-scroll-container"
				className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
			>
				{stores.map((store) => (
					<button
						key={store.id}
						onClick={() => onStoreClick(store.name)}
						className="flex w-80 flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-96 hover:shadow-md transition-shadow"
					>
						<div className="relative h-48 bg-gray-200">
							{store.image ? (
								<img
									src={store.image}
									alt={store.name}
									className="h-full w-full object-cover"
									onError={(e) => {
										// في حالة فشل تحميل الصورة، عرض خلفية افتراضية
										const target = e.target as HTMLImageElement;
										target.style.display = 'none';
										const parent = target.parentElement;
										if (parent) {
											parent.innerHTML = `
												<div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
													<svg class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
													</svg>
												</div>
											`;
										}
									}}
								/>
							) : (
								// خلفية افتراضية إذا لم توجد صورة
								<div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
									<svg
										className="h-16 w-16 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
										/>
									</svg>
								</div>
							)}
							{/* شارة الشهرة */}
							<span className="absolute top-2 right-2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow">
								⭐ شهير
							</span>
							{store.rating && (
								<span className="absolute top-2 left-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white shadow">
									{store.rating}
								</span>
							)}
						</div>
						<div className="p-4 text-right">
							<h3 className="text-lg font-bold text-gray-800">{store.name}</h3>
							<p className="mt-1 text-sm text-gray-600">
								{store.type || "متجر شهير"}
							</p>
						</div>
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
