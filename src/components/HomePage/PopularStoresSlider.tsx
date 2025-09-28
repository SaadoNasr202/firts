"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { useClientCache, cacheKeys } from "@/hooks/useClientCache";

// تحديد نوع البيانات
interface Store {
	id: string;
	name: string;
	image?: string;
	type?: string;
	rating?: string;
	location?: string;
	distance?: number;
	logo?: string | null;
	hasProducts?: boolean;
}

interface PopularStoresSliderProps {
	onStoreClick?: (storeName: string) => void;
	selectedLocation?: any;
	isFullPage?: boolean; // جديد: لتحديد ما إذا كانت صفحة كاملة أم شريط تمرير
}

export default function PopularStoresSlider({
	onStoreClick,
	selectedLocation,
	isFullPage = false,
}: PopularStoresSliderProps) {
	const [stores, setStores] = useState<Store[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
	
	// state للصفحة الكاملة
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("الكل");
	const [sortBy, setSortBy] = useState("rating");
	const [showOnlyPopular, setShowOnlyPopular] = useState(false);

	// استخدام التخزين المؤقت على مستوى العميل للصفحة الكاملة
	const {
		data: storesData,
		isLoading: cacheLoading,
		error: cacheError,
	} = useClientCache(
		cacheKeys.stores(),
		async () => {
			const response = await fetch('/api/stores/nearby');
			if (!response.ok) {
				throw new Error('فشل في جلب المتاجر');
			}
			return response.json();
		},
		600 // 10 دقائق
	);

	useEffect(() => {
		if (isFullPage) return; // لا نحتاج هذا للصفحة الكاملة
		
		// استخدام الموقع المختار أولاً، ثم الموقع الحالي للمستخدم
		if (selectedLocation && selectedLocation.address) {
			// تحليل الإحداثيات من العنوان المختار
			const coords = selectedLocation.address.split(',').map((coord: string) => parseFloat(coord.trim()));
			if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
				setUserLocation({ lat: coords[0], lng: coords[1] });
				return;
			}
		}

		// إذا لم يكن هناك موقع مختار، الحصول على موقع المستخدم
		const getUserLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						setUserLocation({ lat: latitude, lng: longitude });
					},
					(error) => {
						console.warn('فشل في الحصول على الموقع:', error);
						// استخدام موقع افتراضي (الرياض) إذا فشل الحصول على الموقع
						setUserLocation({ lat: 24.7136, lng: 46.6753 });
					}
				);
			} else {
				// استخدام موقع افتراضي إذا لم يكن المتصفح يدعم الموقع
				setUserLocation({ lat: 24.7136, lng: 46.6753 });
			}
		};

		getUserLocation();
	}, [selectedLocation, isFullPage]);

	useEffect(() => {
		if (isFullPage) return; // لا نحتاج هذا للصفحة الكاملة
		
		const fetchStores = async () => {
			if (!userLocation) return;

			try {
				const response = await fetch(
					`/api/stores/popular-location?lat=${userLocation.lat}&lng=${userLocation.lng}&limit=8&maxDistance=15&minRating=3.6`
				);
				if (response.ok) {
					const data = await response.json();
					setStores(data.stores || []);
				} else {
					console.error("فشل في جلب المتاجر الشهيرة");
				}
			} catch (error) {
				console.error("خطأ في جلب المتاجر الشهيرة:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStores();
	}, [userLocation, isFullPage]);

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

	// دالة التعامل مع النقر على المتجر للصفحة الكاملة
	const handleStoreClick = (storeName: string) => {
		if (isFullPage) {
			window.location.href = `/store?store=${encodeURIComponent(storeName)}&source=popular`;
		} else if (onStoreClick) {
			onStoreClick(storeName);
		}
	};

	// دالة التعامل مع النقر على Breadcrumb
	const handleBreadcrumbClick = (index: number) => {
		if (index === 0) {
			window.location.href = "/HomePage";
		}
	};

	// دالة لتوليد معلومات إضافية للمتاجر
	const getStoreInfo = (store: Store) => {
		// توليد مسافة عشوائية (في التطبيق الحقيقي ستكون من GPS)
		const distances = ["0.3 كم", "0.5 كم", "0.8 كم", "1.2 كم", "1.5 كم", "2.0 كم"];
		const deliveryTimes = ["10-20 دقيقة", "15-25 دقيقة", "20-30 دقيقة", "25-35 دقيقة", "30-40 دقيقة", "35-45 دقيقة"];
		const deliveryFees = ["2 ريال", "3 ريال", "4 ريال", "5 ريال", "6 ريال", "8 ريال"];
		const minimumOrders = ["20 ريال", "25 ريال", "30 ريال", "35 ريال", "40 ريال", "45 ريال", "50 ريال"];
		
		const randomDistance = distances[Math.floor(Math.random() * distances.length)];
		const randomDeliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
		const randomDeliveryFee = deliveryFees[Math.floor(Math.random() * deliveryFees.length)];
		const randomMinimumOrder = minimumOrders[Math.floor(Math.random() * minimumOrders.length)];
		
		// توليد عدد التقييمات عشوائياً
		const reviewCount = Math.floor(Math.random() * 1000) + 100;
		
		return {
			distance: randomDistance,
			deliveryTime: randomDeliveryTime,
			deliveryFee: randomDeliveryFee,
			minimumOrder: randomMinimumOrder,
			reviewCount,
			description: `${store.name} - ${store.type || "متجر"} عالي الجودة`,
			isOpen: Math.random() > 0.1, // 90% من المتاجر مفتوحة
			isPopular: Math.random() > 0.3 // 70% من المتاجر مشهورة
		};
	};

	// تحديد البيانات المستخدمة
	const currentStores = isFullPage ? (storesData?.stores || []) : stores;
	const currentIsLoading = isFullPage ? cacheLoading : isLoading;
	const currentError = isFullPage ? cacheError : null;

	// فلترة وترتيب المتاجر للصفحة الكاملة
	const filteredStores = isFullPage 
		? currentStores.filter((store: Store) => {
			const storeInfo = getStoreInfo(store);
			const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				storeInfo.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = selectedCategory === "الكل" || store.type === selectedCategory;
			const matchesPopular = !showOnlyPopular || storeInfo.isPopular;
			return matchesSearch && matchesCategory && matchesPopular;
		})
		: currentStores;

	const sortedStores = isFullPage 
		? [...filteredStores].sort((a: Store, b: Store) => {
			const aInfo = getStoreInfo(a);
			const bInfo = getStoreInfo(b);
			
			switch (sortBy) {
				case "rating":
					return (parseFloat(b.rating || "0")) - (parseFloat(a.rating || "0"));
				case "reviewCount":
					return bInfo.reviewCount - aInfo.reviewCount;
				case "distance":
					return parseFloat(aInfo.distance) - parseFloat(bInfo.distance);
				case "deliveryTime":
					return parseInt(aInfo.deliveryTime) - parseInt(bInfo.deliveryTime);
				default:
					return 0;
			}
		})
		: filteredStores;

	// الحصول على الأقسام الفريدة للصفحة الكاملة
	const categories = isFullPage 
		? ["الكل", ...new Set(currentStores.map((store: Store) => store.type).filter(Boolean))] as string[]
		: [];

	// إذا كان يتم تحميل البيانات
	if (currentIsLoading) {
		if (isFullPage) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb 
							path={["الرئيسية", "أشهر المحلات في منطقتك"]} 
							onBreadcrumbClick={handleBreadcrumbClick} 
						/>
					</div>
					<div className="text-center py-12">
						<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1] mx-auto mb-4"></div>
						<p className="text-gray-600">جاري تحميل المحلات...</p>
					</div>
				</>
			);
		} else {
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
	}

	// عرض رسالة الخطأ
	if (currentError) {
		if (isFullPage) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb 
							path={["الرئيسية", "أشهر المحلات في منطقتك"]} 
							onBreadcrumbClick={handleBreadcrumbClick} 
						/>
					</div>
					<div className="text-center py-12">
						<div className="text-6xl mb-4">❌</div>
						<h3 className="text-xl font-semibold text-gray-700 mb-2">حدث خطأ</h3>
						<p className="text-gray-500">{currentError}</p>
					</div>
				</>
			);
		} else {
			return (
				<div className="flex items-center justify-center py-8">
					<div className="text-center">
						<div className="text-6xl mb-4">❌</div>
						<h3 className="text-xl font-semibold text-gray-700 mb-2">حدث خطأ</h3>
						<p className="text-gray-500">{currentError}</p>
					</div>
				</div>
			);
		}
	}

	// إذا لم توجد متاجر
	if (currentStores.length === 0) {
		if (isFullPage) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb 
							path={["الرئيسية", "أشهر المحلات في منطقتك"]} 
							onBreadcrumbClick={handleBreadcrumbClick} 
						/>
					</div>
					<div className="text-center py-12">
						<div className="text-6xl mb-4">🏆</div>
						<h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد محلات</h3>
						<p className="text-gray-500">لا توجد محلات شهيرة متاحة حالياً</p>
					</div>
				</>
			);
		} else {
			return (
				<div className="flex items-center justify-center py-8">
					<p className="text-gray-500">لا توجد متاجر شهيرة متاحة حالياً</p>
				</div>
			);
		}
	}

	// عرض الصفحة الكاملة
	if (isFullPage) {
		return (
			<>
				<div className="mb-6">
					<Breadcrumb 
						path={["الرئيسية", "أشهر المحلات في منطقتك"]} 
						onBreadcrumbClick={handleBreadcrumbClick} 
					/>
				</div>

				{/* العنوان والوصف */}
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">أشهر المحلات في منطقتك</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						اكتشف أشهر وأفضل المحلات والمطاعم في منطقتك مع تقييمات العملاء وتوصيل سريع
					</p>
				</div>

				{/* شريط البحث والتصفية */}
				<div className="mb-8 space-y-4">
					{/* شريط البحث */}
					<div className="max-w-md mx-auto">
						<div className="relative">
							<input
								type="text"
								placeholder="ابحث عن محل..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right"
							/>
							<div className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
						</div>
					</div>

					{/* فلاتر التصفية والترتيب */}
					<div className="flex flex-wrap justify-center gap-4">
						{/* تصفية حسب القسم */}
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
						>
							{categories.map(category => (
								<option key={category} value={category}>{category}</option>
							))}
						</select>

						{/* ترتيب */}
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
						>
							<option value="rating">الأعلى تقييماً</option>
							<option value="reviewCount">الأكثر تقييماً</option>
							<option value="distance">الأقرب</option>
							<option value="deliveryTime">أسرع توصيل</option>
						</select>

						{/* فلتر المحلات الشهيرة فقط */}
						<label className="flex items-center space-x-2 space-x-reverse">
							<input
								type="checkbox"
								checked={showOnlyPopular}
								onChange={(e) => setShowOnlyPopular(e.target.checked)}
								className="rounded border-gray-300 text-green-600 focus:ring-green-500"
							/>
							<span className="text-sm text-gray-700">المحلات الشهيرة فقط</span>
						</label>
					</div>
				</div>

				{/* شبكة المحلات */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedStores.map((store: Store) => {
						const storeInfo = getStoreInfo(store);
						return (
							<div
								key={store.id}
								onClick={() => handleStoreClick(store.name)}
								className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative"
							>
								{/* شارة المحل الشهير */}
								{storeInfo.isPopular && (
									<div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
										⭐ مشهور
									</div>
								)}

								{/* صورة المحل */}
								<div className="relative mb-4">
									<img
										src={store.image || "/supermarket.png"}
										alt={store.name}
										className="w-full h-32 object-cover rounded-lg"
									/>
									{/* حالة المحل */}
									<div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
										storeInfo.isOpen 
											? 'bg-green-100 text-green-800' 
											: 'bg-red-100 text-red-800'
									}`}>
										{storeInfo.isOpen ? 'مفتوح' : 'مغلق'}
									</div>
								</div>

								{/* معلومات المحل */}
								<div>
									<h3 className="text-lg font-bold text-gray-900 mb-1">{store.name}</h3>
									<p className="text-sm text-gray-600 mb-2">{storeInfo.description}</p>
									
									{/* التقييم وعدد التقييمات */}
									<div className="flex items-center justify-between mb-3">
										<div className="flex items-center">
											<div className="flex items-center">
												{[...Array(5)].map((_, i) => (
													<svg
														key={i}
														className={`w-4 h-4 ${
															i < Math.floor(parseFloat(store.rating || "0")) 
																? 'text-yellow-400' 
																: 'text-gray-300'
														}`}
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
													</svg>
												))}
											</div>
											<span className="text-sm text-gray-600 mr-2">{store.rating || 0}</span>
										</div>
										<span className="text-xs text-gray-500">({storeInfo.reviewCount} تقييم)</span>
									</div>

									{/* المسافة ووقت التوصيل */}
									<div className="flex justify-between text-sm text-gray-500 mb-2">
										<span>📍 {storeInfo.distance}</span>
										<span>⏱️ {storeInfo.deliveryTime}</span>
									</div>

									{/* رسوم التوصيل والحد الأدنى */}
									<div className="flex justify-between text-xs text-gray-500">
										<span>🚚 {storeInfo.deliveryFee}</span>
										<span>💰 حد أدنى: {storeInfo.minimumOrder}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* رسالة في حالة عدم وجود نتائج */}
				{filteredStores.length === 0 && !currentIsLoading && (
					<div className="text-center py-12">
						<div className="text-6xl mb-4">🏆</div>
						<h3 className="text-xl font-semibold text-gray-700 mb-2">لم نجد أي محلات</h3>
						<p className="text-gray-500">جرب البحث بكلمات مختلفة أو غير الفلتر</p>
					</div>
				)}
			</>
		);
	}

	// عرض الشريط (الوضع الافتراضي)
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
				{sortedStores.map((store: Store) => (
					<button
						key={store.id}
						onClick={() => handleStoreClick(store.name)}
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
							{store.distance && (
								<p className="mt-1 text-xs text-green-600 font-medium">
									📍 {store.distance} كم
								</p>
							)}
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
