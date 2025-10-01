"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
// ملاحظة: تم إلغاء استخدام API والكاش على العميل؛ سيتم الاعتماد على Server Action فقط
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
	onCategoryClick?: (categoryName: string) => void;
	isFullPage?: boolean; // جديد: لتحديد ما إذا كانت صفحة كاملة أم شريط تمرير
	getCategoriesAction: () => Promise<
		| { categories: Category[]; cached: boolean; success: boolean }
		| { error: string }
	>;
}

export default function CategoriesSlider({
	onCategoryClick,
	isFullPage = false,
	getCategoriesAction,
}: CategoriesSliderProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lastFetchTime, setLastFetchTime] = useState<number>(0);
	const [searchTerm, setSearchTerm] = useState("");

	// جلب الأقسام عبر Server Action (أساسي)
	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setIsLoading(true);
				const result = await getCategoriesAction();
				if (cancelled) return;
				if (result && 'categories' in result) {
					setCategories(result.categories || []);
				}
			} catch (e) {
				// سيتم الاعتماد على fallback عند الحاجة
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		})();
		return () => { cancelled = true; };
	}, [getCategoriesAction]);

// تم إلغاء التخزين المؤقت على العميل

// تمت إزالة أي استدعاء API للأقسام

// لا يوجد فولباك للـ API

// أزلنا إعادة التحميل المعتمدة على API عند التركيز

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
    (async () => {
        try {
            const result = await getCategoriesAction();
            if (result && 'categories' in result) {
                setCategories(result.categories || []);
                setLastFetchTime(Date.now());
            }
        } finally {
            setIsLoading(false);
        }
    })();
};

	// دالة التعامل مع النقر على القسم
	const handleCategoryClick = (categoryName: string) => {
		if (onCategoryClick) {
			onCategoryClick(categoryName);
		} else {
			// سلوك افتراضي للصفحة الكاملة
			if (categoryName === "هايبر شلة") {
				window.location.href = "/hyper-shella";
			} else if (categoryName === "استلام وتسليم") {
				window.location.href = "/PickUp";
			} else {
				window.location.href = `/category-stores/${encodeURIComponent(categoryName)}`;
			}
		}
	};

	// دالة التعامل مع النقر على Breadcrumb
	const handleBreadcrumbClick = (index: number) => {
		if (index === 0) {
			window.location.href = "/HomePage";
		}
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

// تحديد البيانات المستخدمة (Server Action فقط)
const currentCategories = categories;
const currentIsLoading = isLoading;
const currentError = null as unknown as string | null;

	// فلترة الأقسام للصفحة الكاملة
	const filteredCategories = isFullPage
		? currentCategories.filter(
				(category: Category) =>
					category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(category.description &&
						category.description
							.toLowerCase()
							.includes(searchTerm.toLowerCase())),
			)
		: currentCategories;

	// إذا كان يتم تحميل البيانات
	if (currentIsLoading) {
		if (isFullPage) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb
							path={["الرئيسية", "أقسامنا"]}
							onBreadcrumbClick={handleBreadcrumbClick}
						/>
					</div>
					<div className="py-12 text-center">
						<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
						<p className="text-gray-600">جاري تحميل الأقسام...</p>
					</div>
				</>
			);
		} else {
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
	}

	// عرض رسالة الخطأ
	if (currentError) {
		if (isFullPage) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb
							path={["الرئيسية", "أقسامنا"]}
							onBreadcrumbClick={handleBreadcrumbClick}
						/>
					</div>
					<div className="py-12 text-center">
						<div className="mb-4 text-6xl">❌</div>
						<h3 className="mb-2 text-xl font-semibold text-gray-700">
							حدث خطأ
						</h3>
						<p className="text-gray-500">{currentError}</p>
					</div>
				</>
			);
		} else {
			return (
				<div className="flex items-center justify-center py-8">
					<div className="text-center">
						<div className="mb-4 text-6xl">❌</div>
						<h3 className="mb-2 text-xl font-semibold text-gray-700">
							حدث خطأ
						</h3>
						<p className="text-gray-500">{currentError}</p>
					</div>
				</div>
			);
		}
	}

	// إذا لم توجد أقسام
	if (currentCategories.length === 0) {
		if (isFullPage) {
			return (
				<>
					<div className="mb-6">
						<Breadcrumb
							path={["الرئيسية", "أقسامنا"]}
							onBreadcrumbClick={handleBreadcrumbClick}
						/>
					</div>
					<div className="py-12 text-center">
						<div className="mb-4 text-6xl">📂</div>
						<h3 className="mb-2 text-xl font-semibold text-gray-700">
							لا توجد أقسام
						</h3>
						<p className="text-gray-500">لم يتم العثور على أي أقسام</p>
					</div>
				</>
			);
		} else {
			return (
				<div className="flex items-center justify-center py-8">
					<p className="text-gray-500">لا توجد أقسام متاحة حالياً</p>
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
						path={["الرئيسية", "أقسامنا"]}
						onBreadcrumbClick={handleBreadcrumbClick}
					/>
				</div>

				{/* العنوان والوصف */}
				<div className="mb-8 text-center">
					<h1 className="mb-4 text-3xl font-bold text-gray-900">أقسامنا</h1>
					<p className="mx-auto max-w-2xl text-lg text-gray-600">
						اكتشف جميع أقسام شلة واختر ما يناسب احتياجاتك من مطاعم، سوبرماركت،
						صيدليات وأكثر
					</p>
				</div>

				{/* شريط البحث */}
				<div className="mb-8">
					<div className="mx-auto max-w-md">
						<div className="relative">
							<input
								type="text"
								placeholder="ابحث عن قسم..."
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
				</div>

				{/* شبكة الأقسام */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredCategories.map((category: Category) => {
						const style = getCategoryStyle(category.name);
						return (
							<div
								key={category.id}
								onClick={() => handleCategoryClick(category.name)}
								className={`${style.color} transform cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
							>
								<div className="text-center">
									<div className="mb-4 flex justify-center">
										{category.image ? (
											<div className="relative h-24 w-24 overflow-hidden">
												<img
													src={category.image}
													alt={category.name}
													className="absolute inset-0 h-full w-full items-center rounded-full object-cover"
													onError={(e) => {
														// في حالة فشل تحميل الصورة، عرض الأيقونة النصية
														const target = e.target as HTMLImageElement;
														target.style.display = "none";
														const parent = target.parentElement;
														if (parent) {
															parent.innerHTML = `<div class="w-full h-full flex items-center justify-center rounded-full ${style.color}"><div class="text-4xl">${style.icon}</div></div>`;
														}
													}}
												/>
											</div>
										) : (
											<div
												className={`flex h-24 w-24 items-center justify-center rounded-full shadow-lg ${style.color}`}
											>
												<div className="text-4xl">{style.icon}</div>
											</div>
										)}
									</div>
									<h3 className={`text-xl font-bold ${style.textColor} mb-2`}>
										{category.name}
									</h3>
									<p className="text-sm text-gray-600">
										{category.description || "اكتشف أفضل المنتجات في هذا القسم"}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* رسالة في حالة عدم وجود نتائج */}
				{filteredCategories.length === 0 && !currentIsLoading && (
					<div className="py-12 text-center">
						<div className="mb-4 text-6xl">🔍</div>
						<h3 className="mb-2 text-xl font-semibold text-gray-700">
							لم نجد أي أقسام
						</h3>
						<p className="text-gray-500">جرب البحث بكلمات مختلفة</p>
					</div>
				)}
			</>
		);
	}

	// عرض الشريط (الوضع الافتراضي)
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
				{filteredCategories.map((category: Category) => {
					const style = getCategoryStyle(category.name);
					return (
						<button
							key={category.id}
							className={`flex w-[100px] flex-shrink-0 transform cursor-pointer flex-col items-center text-center transition-all duration-300 hover:scale-105`}
							onClick={() => handleCategoryClick(category.name)}
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
