"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { cacheKeys, useClientCache } from "@/hooks/useClientCache";
import { useState } from "react";

interface Category {
	id: string;
	name: string;
	description?: string;
	image?: string;
}

export default function CategoriesPageContent() {
	const [searchTerm, setSearchTerm] = useState("");

	// استخدام التخزين المؤقت على مستوى العميل
	const {
		data: categoriesData,
		isLoading,
		error,
	} = useClientCache(
		cacheKeys.categories(),
		async () => {
			const response = await fetch("/api/categories");
			if (!response.ok) {
				throw new Error("فشل في جلب الأقسام");
			}
			return response.json();
		},
		900, // 15 دقيقة
	);

	const categories = categoriesData?.categories || [];

	const handleCategoryClick = (categoryName: string) => {
		if (categoryName === "هايبر شلة") {
			window.location.href = "/hyper-shella";
		} else if (categoryName === "استلام وتسليم") {
			window.location.href = "/PickUp";
		} else {
			window.location.href = `/category-stores?category=${encodeURIComponent(categoryName)}`;
		}
	};

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

	const filteredCategories = categories.filter(
		(category: Category) =>
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(category.description &&
				category.description.toLowerCase().includes(searchTerm.toLowerCase())),
	);

	// عرض حالة التحميل
	if (isLoading) {
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
	}

	// عرض رسالة الخطأ
	if (error) {
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
					<h3 className="mb-2 text-xl font-semibold text-gray-700">حدث خطأ</h3>
					<p className="text-gray-500">{error}</p>
				</div>
			</>
		);
	}

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
			{filteredCategories.length === 0 && !isLoading && (
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
