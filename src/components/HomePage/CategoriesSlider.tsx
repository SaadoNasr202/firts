"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

// تحديد نوع البيانات
interface Category {
	id: string;
	name: string;
	description?: string;
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
			const url = forceRefresh ? `/api/categories?t=${Date.now()}` : "/api/categories";
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

		window.addEventListener('focus', handleFocus);
		return () => window.removeEventListener('focus', handleFocus);
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
				className="absolute -left-12 z-10 hidden rounded-full bg-white p-2 shadow-md md:block hover:bg-gray-50 transition-colors"
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
				className="scrollbar-hide flex gap-5 space-x-reverse overflow-x-auto px-4 pb-2"
			>
				{categories.map((category) => (
					<button
						key={category.id}
						className="flex w-[85px] flex-shrink-0 cursor-pointer flex-col items-center text-center"
						onClick={() => onCategoryClick(category.name)}
					>
						<div className="flex h-[85px] w-[85px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-md">
							{/* أيقونة افتراضية للقسم */}
							<svg
								className="h-10 w-10 text-white"
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
						<p className="mt-2 text-xs font-medium text-gray-700">
							{category.name}
						</p>
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
