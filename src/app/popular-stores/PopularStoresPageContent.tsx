"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { useState, useEffect } from "react";
import { useClientCache, cacheKeys } from "@/hooks/useClientCache";

interface Store {
	id: string;
	name: string;
	image: string | null;
	type: string | null;
	rating: number | null;
}

export default function PopularStoresPageContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("الكل");
	const [sortBy, setSortBy] = useState("rating");
	const [showOnlyPopular, setShowOnlyPopular] = useState(false);

	// استخدام التخزين المؤقت على مستوى العميل
	const { data: storesData, isLoading, error } = useClientCache(
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

	const stores = storesData?.stores || [];

	const handleStoreClick = (storeName: string) => {
		window.location.href = `/store?store=${encodeURIComponent(storeName)}&source=popular`;
	};

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

	// تصفية المحلات
	const filteredStores = stores.filter((store: Store) => {
		const storeInfo = getStoreInfo(store);
		const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			storeInfo.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "الكل" || store.type === selectedCategory;
		const matchesPopular = !showOnlyPopular || storeInfo.isPopular;
		return matchesSearch && matchesCategory && matchesPopular;
	});

	// ترتيب المحلات
	const sortedStores = [...filteredStores].sort((a: Store, b: Store) => {
		const aInfo = getStoreInfo(a);
		const bInfo = getStoreInfo(b);
		
		switch (sortBy) {
			case "rating":
				return (b.rating || 0) - (a.rating || 0);
			case "reviewCount":
				return bInfo.reviewCount - aInfo.reviewCount;
			case "distance":
				return parseFloat(aInfo.distance) - parseFloat(bInfo.distance);
			case "deliveryTime":
				return parseInt(aInfo.deliveryTime) - parseInt(bInfo.deliveryTime);
			default:
				return 0;
		}
	});

	// الحصول على الأقسام الفريدة
	const categories = ["الكل", ...new Set(stores.map((store: Store) => store.type).filter(Boolean))] as string[];

	// عرض حالة التحميل
	if (isLoading) {
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
	}

	// عرض رسالة الخطأ
	if (error) {
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
					<p className="text-gray-500">{error}</p>
				</div>
			</>
		);
	}

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
														i < Math.floor(store.rating || 0) 
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
			{filteredStores.length === 0 && !isLoading && (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">🏆</div>
					<h3 className="text-xl font-semibold text-gray-700 mb-2">لم نجد أي محلات</h3>
					<p className="text-gray-500">جرب البحث بكلمات مختلفة أو غير الفلتر</p>
				</div>
			)}
		</>
	);
}
