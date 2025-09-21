"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { useState, useEffect } from "react";

interface Discount {
	id: string;
	title: string;
	description?: string;
	time: string;
	image: string;
}

export default function DiscountsPageContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("الكل");
	const [sortBy, setSortBy] = useState("title");
	const [discounts, setDiscounts] = useState<Discount[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// جلب الخصومات من قاعدة البيانات
	useEffect(() => {
		const fetchDiscounts = async () => {
			try {
				const response = await fetch('/api/discounts');
				if (response.ok) {
					const data = await response.json();
					setDiscounts(data.discounts || []);
				} else {
					setError('فشل في جلب الخصومات');
				}
			} catch (error) {
				console.error('خطأ في جلب الخصومات:', error);
				setError('خطأ في جلب الخصومات');
			} finally {
				setIsLoading(false);
			}
		};

		fetchDiscounts();
	}, []);

	const handleDiscountClick = (discountTitle: string) => {
		window.location.href = `/store?store=${encodeURIComponent(discountTitle)}&source=discounts`;
	};

	const handleBreadcrumbClick = (index: number) => {
		if (index === 0) {
			window.location.href = "/HomePage";
		}
	};

	// دالة لتوليد معلومات إضافية للخصومات
	const getDiscountInfo = (discount: Discount) => {
		// توليد خصم عشوائي (في التطبيق الحقيقي ستكون من قاعدة البيانات)
		const discountPercentages = [10, 15, 20, 25, 30, 35, 40, 50];
		const discountPercentage = discountPercentages[Math.floor(Math.random() * discountPercentages.length)];
		
		// توليد أسعار عشوائية
		const originalPrice = Math.floor(Math.random() * 200) + 50; // بين 50 و 250
		const discountedPrice = Math.floor(originalPrice * (1 - discountPercentage / 100));
		
		// توليد تاريخ انتهاء عشوائي
		const today = new Date();
		const validUntil = new Date(today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000); // خلال 30 يوم
		
		return {
			discountPercentage,
			originalPrice: `${originalPrice} ريال`,
			discountedPrice: `${discountedPrice} ريال`,
			validUntil: validUntil.toISOString().split('T')[0],
			category: discount.description || "عام"
		};
	};

	// تصفية الخصومات
	const filteredDiscounts = discounts.filter(discount => {
		const discountInfo = getDiscountInfo(discount);
		const matchesSearch = discount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			discount.description?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "الكل" || discountInfo.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	// ترتيب الخصومات
	const sortedDiscounts = [...filteredDiscounts].sort((a, b) => {
		const aInfo = getDiscountInfo(a);
		const bInfo = getDiscountInfo(b);
		
		switch (sortBy) {
			case "discountPercentage":
				return bInfo.discountPercentage - aInfo.discountPercentage;
			case "validUntil":
				return new Date(aInfo.validUntil).getTime() - new Date(bInfo.validUntil).getTime();
			case "title":
				return a.title.localeCompare(b.title);
			default:
				return 0;
		}
	});

	// الحصول على الأقسام الفريدة
	const categories = ["الكل", ...new Set(discounts.map(discount => getDiscountInfo(discount).category))];

	// حساب الأيام المتبقية
	const getDaysRemaining = (validUntil: string) => {
		const today = new Date();
		const validDate = new Date(validUntil);
		const diffTime = validDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	};

	// عرض حالة التحميل
	if (isLoading) {
		return (
			<>
				<div className="mb-6">
					<Breadcrumb 
						path={["الرئيسية", "أقوى الخصومات"]} 
						onBreadcrumbClick={handleBreadcrumbClick} 
					/>
				</div>
				<div className="text-center py-12">
					<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1] mx-auto mb-4"></div>
					<p className="text-gray-600">جاري تحميل الخصومات...</p>
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
						path={["الرئيسية", "أقوى الخصومات"]} 
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
					path={["الرئيسية", "أقوى الخصومات"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>

			{/* العنوان والوصف */}
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">أقوى الخصومات</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					اكتشف أقوى الخصومات والعروض الحصرية من أفضل المتاجر والمطاعم ووفر المال مع عروض شلة المميزة
				</p>
			</div>

			{/* شريط البحث والتصفية */}
			<div className="mb-8 space-y-4">
				{/* شريط البحث */}
				<div className="max-w-md mx-auto">
					<div className="relative">
						<input
							type="text"
							placeholder="ابحث عن خصم..."
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
						<option value="discountPercentage">أكبر خصم</option>
						<option value="validUntil">ينتهي قريباً</option>
						<option value="title">اسم المتجر</option>
					</select>
				</div>
			</div>

			{/* شبكة الخصومات */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sortedDiscounts.map((discount) => {
					const discountInfo = getDiscountInfo(discount);
					return (
						<div
							key={discount.id}
							onClick={() => handleDiscountClick(discount.title)}
							className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative"
						>
							{/* شارة الخصم */}
							<div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
								-{discountInfo.discountPercentage}%
							</div>

							{/* صورة المتجر */}
							<div className="relative mb-4">
								<img
									src={discount.image || "/supermarket.png"}
									alt={discount.title}
									className="w-full h-32 object-cover rounded-lg"
								/>
								{/* عداد الأيام المتبقية */}
								<div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
									{getDaysRemaining(discountInfo.validUntil)} أيام متبقية
								</div>
							</div>

							{/* معلومات الخصم */}
							<div>
								<h3 className="text-lg font-bold text-gray-900 mb-1">{discount.title}</h3>
								<p className="text-sm text-gray-600 mb-2">{discount.description || "خصم مميز من متجرنا"}</p>
								
								{/* اسم المتجر */}
								<div className="text-sm text-gray-500 mb-3">
									🏪 {discount.title}
								</div>

								{/* الأسعار */}
								<div className="flex items-center justify-between mb-3">
									<div className="flex items-center space-x-2 space-x-reverse">
										<span className="text-lg font-bold text-green-600">{discountInfo.discountedPrice}</span>
										<span className="text-sm text-gray-400 line-through">{discountInfo.originalPrice}</span>
									</div>
									<div className="text-sm text-gray-500">
										وفرت {parseFloat(discountInfo.originalPrice) - parseFloat(discountInfo.discountedPrice)} ريال
									</div>
								</div>

								{/* تاريخ الانتهاء */}
								<div className="text-xs text-gray-500 text-center">
									صالح حتى: {new Date(discountInfo.validUntil).toLocaleDateString('ar-SA')}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* رسالة في حالة عدم وجود نتائج */}
			{filteredDiscounts.length === 0 && !isLoading && (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">🎯</div>
					<h3 className="text-xl font-semibold text-gray-700 mb-2">لم نجد أي خصومات</h3>
					<p className="text-gray-500">جرب البحث بكلمات مختلفة أو غير الفلتر</p>
				</div>
			)}
		</>
	);
}
