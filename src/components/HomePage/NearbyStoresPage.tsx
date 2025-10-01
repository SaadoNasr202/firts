// NearbyStoresPage.tsx
"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { NearbyStore } from "@/lib/api";
import { useEffect, useState } from "react";
import { Store, NearbyStoresPageProps } from "@/lib/api";

// interfaces imported from src/lib/api

export default function NearbyStoresPage({
	onStoreClick,
	selectedLocation,
	isFullPage = false,
	getNearbyStoresAction,
}: NearbyStoresPageProps) {
	// مشتركة
	const [stores, setStores] = useState<Store[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userLocation, setUserLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);

  // حالة الصفحة الكاملة
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [sortBy, setSortBy] = useState("rating");
  const [fullPageStores, setFullPageStores] = useState<Store[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  // الحصول على موقع المستخدم (مستخدم في كلا الوضعين)
  useEffect(() => {
    // استخدام الموقع المختار أولاً، ثم الموقع الحالي للمستخدم
    if (!isFullPage && selectedLocation && selectedLocation.address) {
      const coords = selectedLocation.address
        .split(",")
        .map((coord: string) => parseFloat(coord.trim()));
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        setUserLocation({ lat: coords[0], lng: coords[1] });
        return;
      }
    }

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (err) => {
            console.warn("فشل في الحصول على الموقع:", err);
            // استخدام موقع افتراضي (الرياض) إذا فشل الحصول على الموقع
            setUserLocation({ lat: 24.7136, lng: 46.6753 });
          },
        );
      } else {
        // استخدام موقع افتراضي إذا لم يكن المتصفح يدعم الموقع
        setUserLocation({ lat: 24.7136, lng: 46.6753 });
      }
    };

    getUserLocation();
  }, [selectedLocation, isFullPage]);

  // وضع السلايدر: استخدام Server Action بدل API
  useEffect(() => {
    if (isFullPage) return;
    const fetchNearbyStores = async () => {
      if (!userLocation) return;
      try {
        const result = await getNearbyStoresAction({
          lat: userLocation.lat,
          lng: userLocation.lng,
          limit: 10,
          maxDistance: 10,
        });
        if ((result as any).stores) {
          setStores(((result as any).stores || []) as Store[]);
        } else if ((result as any).error) {
          console.error("فشل في جلب المتاجر القريبة:", (result as any).error);
        }
      } catch (err) {
        console.error("خطأ في جلب المتاجر القريبة:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNearbyStores();
  }, [userLocation, isFullPage, getNearbyStoresAction]);

  // وضع الصفحة الكاملة: جلب عبر Server Action
  useEffect(() => {
    if (!isFullPage) return;
    const fetchAllNearby = async () => {
      if (!userLocation) return;
      setPageLoading(true);
      setError(null);
      try {
        console.log("🔍 NearbyStoresPage: بدء جلب المتاجر من server action");
        console.log("📍 الموقع:", { lat: userLocation.lat, lng: userLocation.lng });
        
        const result = await getNearbyStoresAction({
          lat: userLocation.lat,
          lng: userLocation.lng,
          limit: 200,
          maxDistance: 15,
        });
        
        console.log("📦 النتيجة:", result);
        
        if ((result as any).stores) {
          console.log(`✅ عدد المتاجر: ${(result as any).stores.length}`);
          setFullPageStores(((result as any).stores || []) as Store[]);
        } else if ((result as any).error) {
          console.error("❌ خطأ:", (result as any).error);
          setError((result as any).error);
        }
      } catch (err) {
        console.error("❌ خطأ في catch:", err);
        setError(err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchAllNearby();
  }, [isFullPage, userLocation, getNearbyStoresAction]);

	const getStoreInfo = (store: Store) => {
		const distances = [
			"0.3 كم",
			"0.5 كم",
			"0.8 كم",
			"1.2 كم",
			"1.5 كم",
			"2.0 كم",
		];
		const deliveryTimes = [
			"10-20 دقيقة",
			"15-25 دقيقة",
			"20-30 دقيقة",
			"25-35 دقيقة",
			"30-40 دقيقة",
			"35-45 دقيقة",
		];
		const randomDistance =
			distances[Math.floor(Math.random() * distances.length)];
		const randomDeliveryTime =
			deliveryTimes[Math.floor(Math.random() * deliveryTimes.length)];
		return {
			distance: randomDistance,
			deliveryTime: randomDeliveryTime,
			description: `${store.name} - ${store.type || "متجر"} عالي الجودة`,
			isOpen: Math.random() > 0.1,
		};
	};

	const filteredStores = fullPageStores.filter((store: Store) => {
		const info = getStoreInfo(store);
		const matchesSearch =
			store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			info.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "الكل" || store.type === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const sortedStores = [...filteredStores].sort((a: Store, b: Store) => {
		const aInfo = getStoreInfo(a);
		const bInfo = getStoreInfo(b);
		switch (sortBy) {
			case "rating":
				return Number(b.rating || 0) - Number(a.rating || 0);
			case "distance":
				return parseFloat(aInfo.distance) - parseFloat(bInfo.distance);
			case "deliveryTime":
				return parseInt(aInfo.deliveryTime) - parseInt(bInfo.deliveryTime);
			default:
				return 0;
		}
	});

  const categories = [
    "الكل",
    ...new Set(fullPageStores.map((s: Store) => s.type).filter(Boolean)),
  ] as string[];
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

	// وضع الصفحة الكاملة: تحميل
	if (isFullPage) {
		if (pageLoading) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb
							path={["الرئيسية", "المتاجر القريبة منك"]}
							onBreadcrumbClick={(index) => {
								if (index === 0) window.location.href = "/HomePage";
							}}
						/>
					</div>
					<div className="py-12 text-center">
						<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
						<p className="text-gray-600">جاري تحميل المتاجر...</p>
					</div>
				</>
			);
		}
		if (error) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb
							path={["الرئيسية", "المتاجر القريبة منك"]}
							onBreadcrumbClick={(index) => {
								if (index === 0) window.location.href = "/HomePage";
							}}
						/>
					</div>
					<div className="py-12 text-center">
						<div className="mb-4 text-6xl">❌</div>
						<h3 className="mb-2 text-xl font-semibold text-gray-700">
							حدث خطأ
						</h3>
						<p className="text-gray-500">{String(error)}</p>
					</div>
				</>
			);
		}

		return (
			<>
				<div className="mb-6">
					<Breadcrumb
						path={["الرئيسية", "المتاجر القريبة منك"]}
						onBreadcrumbClick={(index) => {
							if (index === 0) window.location.href = "/HomePage";
						}}
					/>
				</div>

				<div className="mb-8 text-center">
					<h1 className="mb-4 text-3xl font-bold text-gray-900">
						المتاجر القريبة منك
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						اكتشف أفضل المتاجر والمطاعم القريبة من موقعك واستمتع بتوصيل سريع
						وموثوق
					</p>
				</div>

				<div className="mb-8 space-y-4">
					<div className="mx-auto max-w-md">
						<div className="relative">
							<input
								type="text"
								placeholder="ابحث عن متجر..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-right focus:border-transparent focus:ring-2 focus:ring-green-500"
							/>
							<div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
								<svg
									className="h-5 w-5 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap justify-center gap-4">
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>

						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
						>
							<option value="rating">الأعلى تقييماً</option>
							<option value="distance">الأقرب</option>
							<option value="deliveryTime">أسرع توصيل</option>
						</select>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{sortedStores.map((store: Store) => {
						const info = getStoreInfo(store);
						return (
							<div
								key={store.id}
								onClick={() =>
									(window.location.href = `/store/${encodeURIComponent(store.name)}?source=nearby`)
								}
								className="transform cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
							>
								<div className="relative mb-4">
									<img
										src={(store.image as string) || "/supermarket.png"}
										alt={store.name}
										className="h-32 w-full rounded-lg object-cover"
									/>
									<div
										className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-semibold ${
											info.isOpen
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{info.isOpen ? "مفتوح" : "مغلق"}
									</div>
								</div>

								<div>
									<h3 className="mb-1 text-lg font-bold text-gray-900">
										{store.name}
									</h3>
									<p className="mb-2 text-sm text-gray-600">
										{info.description}
									</p>
									<div className="mb-2 flex items-center">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<svg
													key={i}
													className={`h-4 w-4 ${i < Math.floor(Number(store.rating || 0)) ? "text-yellow-400" : "text-gray-300"}`}
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
										</div>
										<span className="mr-2 text-sm text-gray-600">
											{Number(store.rating || 0)}
										</span>
									</div>
									<div className="flex justify-between text-sm text-gray-500">
										<span>📍 {info.distance}</span>
										<span>⏱️ {info.deliveryTime}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{sortedStores.length === 0 && !pageLoading && (
					<div className="py-12 text-center">
						<div className="mb-4 text-6xl">🏪</div>
						<h3 className="mb-2 text-xl font-semibold text-gray-700">
							لم نجد أي متاجر
						</h3>
						<p className="text-gray-500">
							جرب البحث بكلمات مختلفة أو غير الفلتر
						</p>
					</div>
				)}
			</>
		);
	}

	// وضع السلايدر: تحميل
	if (isLoading) {
		return (
			<div className="relative flex items-center p-4 md:p-8" dir="rtl">
				<div className="scrollbar-hide flex gap-5 space-x-reverse overflow-x-auto px-4 pb-2">
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div
							key={item}
							className="flex w-[109px] flex-shrink-0 flex-col items-center text-center"
						>
							<div className="h-[85px] w-[85px] animate-pulse rounded-lg bg-gray-300"></div>
							<div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-300"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// إذا لم توجد متاجر في السلايدر
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
						onClick={() => onStoreClick && onStoreClick(store.name)}
						className="flex w-[109px] flex-shrink-0 cursor-pointer flex-col items-center text-center"
					>
						<div className="flex h-[85px] w-[85px] items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-md">
							<img
								src={store.image || ""}
								alt={store.name}
								className="h-full w-full object-cover"
								onError={(e) => {
									try {
										const img = e.currentTarget as HTMLImageElement;
										img.onerror = null;
										img.src =
											"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial' font-size='14'>لا توجد صورة</text></svg>";
										console.warn(
											"Store image failed:",
											store.name,
											store.image,
										);
									} catch {}
								}}
							/>
						</div>
						<p className="mt-2 text-xs text-gray-700">{store.name}</p>
						{store.distance && (
							<p className="text-xs font-medium text-green-600">
								{store.distance} كم
							</p>
						)}
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
