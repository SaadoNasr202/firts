"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { useState, useEffect } from "react";

interface Category {
	id: string;
	name: string;
	description?: string;
}

export default function CategoriesPageContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// جلب الأقسام من قاعدة البيانات
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch('/api/categories');
				if (response.ok) {
					const data = await response.json();
					setCategories(data.categories || []);
				} else {
					setError('فشل في جلب الأقسام');
				}
			} catch (error) {
				console.error('خطأ في جلب الأقسام:', error);
				setError('خطأ في جلب الأقسام');
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategories();
	}, []);

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
		const styles: { [key: string]: { icon: string; color: string; textColor: string } } = {
			"المطاعم": { icon: "🍽️", color: "bg-red-50 border-red-200 hover:bg-red-100", textColor: "text-red-700" },
			"السوبرماركت": { icon: "🛒", color: "bg-blue-50 border-blue-200 hover:bg-blue-100", textColor: "text-blue-700" },
			"الصيدليات": { icon: "💊", color: "bg-green-50 border-green-200 hover:bg-green-100", textColor: "text-green-700" },
			"الإلكترونيات": { icon: "📱", color: "bg-purple-50 border-purple-200 hover:bg-purple-100", textColor: "text-purple-700" },
			"الملابس": { icon: "👕", color: "bg-pink-50 border-pink-200 hover:bg-pink-100", textColor: "text-pink-700" },
			"المنزل": { icon: "🏠", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100", textColor: "text-indigo-700" },
			"هايبر شلة": { icon: "🏪", color: "bg-purple-50 border-purple-200 hover:bg-purple-100", textColor: "text-purple-700" },
			"استلام وتسليم": { icon: "📦", color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100", textColor: "text-indigo-700" }
		};
		
		return styles[categoryName] || { icon: "📂", color: "bg-gray-50 border-gray-200 hover:bg-gray-100", textColor: "text-gray-700" };
	};

	const filteredCategories = categories.filter(category =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
				<div className="text-center py-12">
					<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1] mx-auto mb-4"></div>
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
					path={["الرئيسية", "أقسامنا"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>

			{/* العنوان والوصف */}
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">أقسامنا</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					اكتشف جميع أقسام شلة واختر ما يناسب احتياجاتك من مطاعم، سوبرماركت، صيدليات وأكثر
				</p>
			</div>

			{/* شريط البحث */}
			<div className="mb-8">
				<div className="max-w-md mx-auto">
					<div className="relative">
						<input
							type="text"
							placeholder="ابحث عن قسم..."
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
			</div>

			{/* شبكة الأقسام */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredCategories.map((category) => {
					const style = getCategoryStyle(category.name);
					return (
						<div
							key={category.id}
							onClick={() => handleCategoryClick(category.name)}
							className={`${style.color} border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
						>
							<div className="text-center">
								<div className="text-4xl mb-4">{style.icon}</div>
								<h3 className={`text-xl font-bold ${style.textColor} mb-2`}>
									{category.name}
								</h3>
								<p className="text-gray-600 text-sm">
									{category.description || "اكتشف أفضل المنتجات في هذا القسم"}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* رسالة في حالة عدم وجود نتائج */}
			{filteredCategories.length === 0 && !isLoading && (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">🔍</div>
					<h3 className="text-xl font-semibold text-gray-700 mb-2">لم نجد أي أقسام</h3>
					<p className="text-gray-500">جرب البحث بكلمات مختلفة</p>
				</div>
			)}
		</>
	);
}
