"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

// تحديد نوع البيانات
interface Category {
	id: string;
	name: string;
	description?: string;
	image?: string;
}

// تحديد نوع الخاصية (prop)
interface CategoriesSliderProps {
	onCategoryClick: (categoryName: string) => void;
}

export default function CategoriesSlider({
	onCategoryClick,
}: CategoriesSliderProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lastFetchTime, setLastFetchTime] = useState<number>(0);

	// دالة جلب الأقسام
	const fetchCategories = async (forceRefresh = false) => {
		try {
			// إضافة timestamp لضمان عدم استخدام التخزين المؤقت إذا كان forceRefresh = true
			const url = forceRefresh
				? `/api/categories?t=${Date.now()}`
				: "/api/categories";
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setCategories(data.categories || []);
				setLastFetchTime(Date.now());
			} else {
				console.error("فشل في جلب الأقسام");
			}
		} catch (error) {
			console.error("خطأ في جلب الأقسام:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	// إعادة تحميل الأقسام عند التركيز على النافذة (إذا مر أكثر من دقيقة)
	useEffect(() => {
		const handleFocus = () => {
			const now = Date.now();
			// إذا مر أكثر من دقيقة منذ آخر جلب، أعد التحميل
			if (now - lastFetchTime > 60000) {
				fetchCategories(true);
			}
		};

		window.addEventListener("focus", handleFocus);
		return () => window.removeEventListener("focus", handleFocus);
	}, [lastFetchTime]);

	const handleScrollRight = () => {
		document
			.getElementById("categories-scroll-container")
			?.scrollBy({ left: 200, behavior: "smooth" });
	};

	const handleScrollLeft = () => {
		document
			.getElementById("categories-scroll-container")
			?.scrollBy({ left: -200, behavior: "smooth" });
	};

	const handleRefresh = () => {
		setIsLoading(true);
		fetchCategories(true);
	};

	// دالة للحصول على الأيقونة واللون حسب اسم القسم
	const getCategoryStyle = (categoryName: string) => {
		const styles: {
			[key: string]: { icon: string; color: string; textColor: string };
		} = {
			المطاعم: {
				icon: "🍽️",
				color: "bg-red-50 border-red-200 hover:bg-red-100",
				textColor: "text-red-700",
			},
			السوبرماركت: {
				icon: "🛒",
				color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
				textColor: "text-blue-700",
			},
			الصيدليات: {
				icon: "💊",
				color: "bg-green-50 border-green-200 hover:bg-green-100",
				textColor: "text-green-700",
			},
			الإلكترونيات: {
				icon: "📱",
				color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
				textColor: "text-purple-700",
			},
			الملابس: {
				icon: "👕",
				color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
				textColor: "text-pink-700",
			},
			المنزل: {
				icon: "🏠",
				color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
				textColor: "text-indigo-700",
			},
			"هايبر شلة": {
				icon: "🏪",
				color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
				textColor: "text-purple-700",
			},
			"استلام وتسليم": {
				icon: "📦",
				color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
				textColor: "text-indigo-700",
			},
		};

		return (
			styles[categoryName] || {
				icon: "📂",
				color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
				textColor: "text-gray-700",
			}
		);
	};

	// إذا كان يتم تحميل البيانات
	if (isLoading) {
		return (
			<div className="relative flex items-center">
				<div className="scrollbar-hide flex gap-8 space-x-reverse overflow-x-auto px-4 pb-2">
					{[1, 2, 3, 4, 5].map((item) => (
						<div
							key={item}
							className="flex w-[85px] flex-shrink-0 flex-col items-center text-center"
						>
							<div className="h-[85px] w-[85px] animate-pulse rounded-full bg-gray-300"></div>
							<div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-300"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// إذا لم توجد أقسام
	if (categories.length === 0) {
		return (
			<div className="flex items-center justify-center py-8">
				<p className="text-gray-500">لا توجد أقسام متاحة حالياً</p>
			</div>
		);
	}

	return (
		<div className="relative flex items-center">
			{/* زر إعادة التحميل */}
			<button
				onClick={handleRefresh}
				className="absolute -left-12 z-10 hidden rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-50 md:block"
				title="إعادة تحميل الأقسام"
			>
				<RefreshCw className="h-4 w-4 text-gray-600" />
			</button>

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

			{/* حاوية الأقسام */}
			<div
				id="categories-scroll-container"
				className="scrollbar-hide flex gap-6 space-x-reverse overflow-x-auto px-4 pb-2"
			>
				{categories.map((category) => {
					const style = getCategoryStyle(category.name);
					return (
						<button
							key={category.id}
							className={`flex w-[100px] flex-shrink-0 transform cursor-pointer flex-col items-center text-center transition-all duration-300 hover:scale-105`}
							onClick={() => onCategoryClick(category.name)}
						>
							<div className="relative h-[90px] w-[90px] overflow-hidden rounded-full">
								{category.image ? (
									<img
										src={category.image}
										alt={category.name}
										className="absolute inset-0 h-full w-full object-cover"
										onError={(e) => {
											// في حالة فشل تحميل الصورة، عرض الأيقونة النصية
											const target = e.target as HTMLImageElement;
											target.style.display = "none";
											const parent = target.parentElement;
											if (parent) {
												parent.innerHTML = `<div class="w-full h-full flex items-center justify-center rounded-full ${style.color}"><span class="text-3xl">${style.icon}</span></div>`;
											}
										}}
									/>
								) : (
									<div
										className={`flex h-full w-full items-center justify-center rounded-full ${style.color}`}
									>
										<span className="text-3xl">{style.icon}</span>
									</div>
								)}
							</div>
							<p
								className={`mt-2 text-xs font-medium ${style.textColor} line-clamp-2`}
							>
								{category.name}
							</p>
						</button>
					);
				})}
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
