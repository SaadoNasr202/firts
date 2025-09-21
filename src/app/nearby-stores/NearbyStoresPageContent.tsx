"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { useState, useEffect } from "react";

interface Store {
	id: string;
	name: string;
	image: string | null;
	type: string | null;
	rating: number | null;
}

export default function NearbyStoresPageContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("الكل");
	const [sortBy, setSortBy] = useState("rating");
	const [stores, setStores] = useState<Store[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// جلب المتاجر من قاعدة البيانات
	useEffect(() => {
		const fetchStores = async () => {
			try {
				const response = await fetch('/api/stores/nearby');
				if (response.ok) {
					const data = await response.json();
					setStores(data.stores || []);
				} else {
					setError('فشل في جلب المتاجر');
				}
			} catch (error) {
				console.error('خطأ في جلب المتاجر:', error);
				setError('خطأ في جلب المتاجر');
			} finally {
				setIsLoading(false);
			}
		};

		fetchStores();
	}, []);

	const handleStoreClick = (storeName: string) => {
		window.location.href = `/store?store=${encodeURIComponent(storeName)}&source=nearby`;
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
		
		const randomDistance = distances[Math.floor(Math.random() * distances.length)];
		const randomDeliveryTime = deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
		
		return {
			distance: randomDistance,
			deliveryTime: randomDeliveryTime,
			description: `${store.name} - ${store.type || "متجر"} عالي الجودة`,
			isOpen: Math.random() > 0.1 // 90% من المتاجر مفتوحة
		};
	};

	// تصفية المتاجر
	const filteredStores = stores.filter(store => {
		const storeInfo = getStoreInfo(store);
		const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			storeInfo.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "الكل" || store.type === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	// ترتيب المتاجر
	const sortedStores = [...filteredStores].sort((a, b) => {
		const aInfo = getStoreInfo(a);
		const bInfo = getStoreInfo(b);
		
		switch (sortBy) {
			case "rating":
				return (b.rating || 0) - (a.rating || 0);
			case "distance":
				return parseFloat(aInfo.distance) - parseFloat(bInfo.distance);
			case "deliveryTime":
				return parseInt(aInfo.deliveryTime) - parseInt(bInfo.deliveryTime);
			default:
				return 0;
		}
	});

	// الحصول على الأقسام الفريدة
	const categories = ["الكل", ...new Set(stores.map(store => store.type).filter(Boolean))] as string[];

	// عرض حالة التحميل
	if (isLoading) {
		return (
			<>
				<div className="mb-6">
					<Breadcrumb 
						path={["الرئيسية", "المتاجر القريبة منك"]} 
						onBreadcrumbClick={handleBreadcrumbClick} 
					/>
				</div>
				<div className="text-center py-12">
					<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1] mx-auto mb-4"></div>
					<p className="text-gray-600">جاري تحميل المتاجر...</p>
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
						path={["الرئيسية", "المتاجر القريبة منك"]} 
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
					path={["الرئيسية", "المتاجر القريبة منك"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>

			{/* العنوان والوصف */}
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">المتاجر القريبة منك</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					اكتشف أفضل المتاجر والمطاعم القريبة من موقعك واستمتع بتوصيل سريع وموثوق
				</p>
			</div>

			{/* شريط البحث والتصفية */}
			<div className="mb-8 space-y-4">
				{/* شريط البحث */}
				<div className="max-w-md mx-auto">
					<div className="relative">
						<input
							type="text"
							placeholder="ابحث عن متجر..."
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
						<option value="distance">الأقرب</option>
						<option value="deliveryTime">أسرع توصيل</option>
					</select>
				</div>
			</div>

			{/* شبكة المتاجر */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sortedStores.map((store) => {
					const storeInfo = getStoreInfo(store);
					return (
						<div
							key={store.id}
							onClick={() => handleStoreClick(store.name)}
							className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
						>
							{/* صورة المتجر */}
							<div className="relative mb-4">
								<img
									src={store.image || "/supermarket.png"}
									alt={store.name}
									className="w-full h-32 object-cover rounded-lg"
								/>
								{/* حالة المتجر */}
								<div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
									storeInfo.isOpen 
										? 'bg-green-100 text-green-800' 
										: 'bg-red-100 text-red-800'
								}`}>
									{storeInfo.isOpen ? 'مفتوح' : 'مغلق'}
								</div>
							</div>

							{/* معلومات المتجر */}
							<div>
								<h3 className="text-lg font-bold text-gray-900 mb-1">{store.name}</h3>
								<p className="text-sm text-gray-600 mb-2">{storeInfo.description}</p>
								
								{/* التقييم */}
								<div className="flex items-center mb-2">
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

								{/* المسافة ووقت التوصيل */}
								<div className="flex justify-between text-sm text-gray-500">
									<span>📍 {storeInfo.distance}</span>
									<span>⏱️ {storeInfo.deliveryTime}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* رسالة في حالة عدم وجود نتائج */}
			{filteredStores.length === 0 && !isLoading && (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">🏪</div>
					<h3 className="text-xl font-semibold text-gray-700 mb-2">لم نجد أي متاجر</h3>
					<p className="text-gray-500">جرب البحث بكلمات مختلفة أو غير الفلتر</p>
				</div>
			)}
		</>
	);
}
