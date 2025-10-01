"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { useEffect, useState } from "react";
import { Discount, DiscountSliderProps } from "@/lib/api";

// interfaces imported from src/lib/api

export default function DiscountSlider({
	onDiscountClick,
	isFullPage = false,
	getDiscountsAction,
}: DiscountSliderProps) {
	const [discounts, setDiscounts] = useState<Discount[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("الكل");
	const [sortBy, setSortBy] = useState("title");

	useEffect(() => {
		const fetchDiscounts = async () => {
			try {
				const result = await getDiscountsAction();
				if ((result as any).discounts) {
					setDiscounts((result as any).discounts || []);
				} else if ((result as any).error) {
					setError((result as any).error);
				}
			} catch (err) {
				setError("خطأ في جلب الخصومات");
			} finally {
				setIsLoading(false);
			}
		};

		fetchDiscounts();
	}, [getDiscountsAction]);

	const navigateToDiscount = (title: string) => {
		if (onDiscountClick) {
			onDiscountClick(title);
		} else {
			window.location.href = `/store/${encodeURIComponent(title)}?source=discounts`;
		}
	};

	const handleScrollRight = () => {
		document
			.getElementById("discounts-scroll-container")
			?.scrollBy({ left: 300, behavior: "smooth" });
	};

	const handleScrollLeft = () => {
		document
			.getElementById("discounts-scroll-container")
			?.scrollBy({ left: -300, behavior: "smooth" });
	};

	// توليد معلومات إضافية (مطابقة لصفحة المحتوى السابقة)
	const getDiscountInfo = (discount: Discount) => {
		const discountPercentages = [10, 15, 20, 25, 30, 35, 40, 50];
		const discountPercentage =
			discountPercentages[
				Math.floor(Math.random() * discountPercentages.length)
			];
		const originalPrice = Math.floor(Math.random() * 200) + 50;
		const discountedPrice = Math.floor(
			originalPrice * (1 - discountPercentage / 100),
		);
		const today = new Date();
		const validUntil = new Date(
			today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000,
		);
		return {
			discountPercentage,
			originalPrice: `${originalPrice} ريال`,
			discountedPrice: `${discountedPrice} ريال`,
			validUntil: validUntil.toISOString().split("T")[0],
			category: discount.description || "عام",
		};
	};

	if (!isFullPage) {
		// عرض حالة التحميل (سلايدر)
		if (isLoading) {
			return (
				<div className="relative flex items-center">
					<div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-96"
							>
								<div className="relative h-48 animate-pulse bg-gray-300"></div>
								<div className="p-4">
									<div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-300"></div>
									<div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			);
		}

		// إذا لم توجد خصومات
		if (discounts.length === 0) {
			return (
				<div className="flex items-center justify-center py-8">
					<p className="text-gray-500">لا توجد خصومات متاحة حالياً</p>
				</div>
			);
		}

		return (
			<div className="relative flex items-center">
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

				<div
					id="discounts-scroll-container"
					className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
				>
					{discounts.map((discount, index) => (
						<button
							key={index}
							onClick={() => navigateToDiscount(discount.title)}
							className="flex w-80 flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-96"
						>
							<div className="relative h-48 bg-gray-200">
								<img
									src={discount.image}
									alt={discount.title}
									className="h-full w-full object-cover"
								/>
								<span className="absolute top-2 right-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-800 shadow">
									{discount.time}
								</span>
							</div>
							<div className="p-4 text-right">
								<h3 className="text-lg font-bold text-gray-800">
									{discount.title}
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									{discount.description}
								</p>
							</div>
						</button>
					))}
				</div>

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

	// وضع الصفحة الكاملة
	const filteredDiscounts = discounts.filter((discount) => {
		const info = getDiscountInfo(discount);
		const matchesSearch =
			discount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			discount.description?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "الكل" || info.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const sortedDiscounts = [...filteredDiscounts].sort((a, b) => {
		const aInfo = getDiscountInfo(a);
		const bInfo = getDiscountInfo(b);
		switch (sortBy) {
			case "discountPercentage":
				return bInfo.discountPercentage - aInfo.discountPercentage;
			case "validUntil":
				return (
					new Date(aInfo.validUntil).getTime() -
					new Date(bInfo.validUntil).getTime()
				);
			case "title":
				return a.title.localeCompare(b.title);
			default:
				return 0;
		}
	});

	const categories = [
		"الكل",
		...new Set(discounts.map((discount) => getDiscountInfo(discount).category)),
	] as string[];

	const getDaysRemaining = (validUntil: string) => {
		const today = new Date();
		const validDate = new Date(validUntil);
		const diffTime = validDate.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 0 ? diffDays : 0;
	};

	if (isLoading) {
		return (
			<>
				<div className="mb-6">
					<Breadcrumb
						path={["الرئيسية", "أقوى الخصومات"]}
						onBreadcrumbClick={(i) => {
							if (i === 0) window.location.href = "/HomePage";
						}}
					/>
				</div>
				<div className="py-12 text-center">
					<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
					<p className="text-gray-600">جاري تحميل الخصومات...</p>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<div className="mb-6">
					<Breadcrumb
						path={["الرئيسية", "أقوى الخصومات"]}
						onBreadcrumbClick={(i) => {
							if (i === 0) window.location.href = "/HomePage";
						}}
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
					path={["الرئيسية", "أقوى الخصومات"]}
					onBreadcrumbClick={(i) => {
						if (i === 0) window.location.href = "/HomePage";
					}}
				/>
			</div>

			<div className="mb-8 text-center">
				<h1 className="mb-4 text-3xl font-bold text-gray-900">أقوى الخصومات</h1>
				<p className="mx-auto max-w-2xl text-lg text-gray-600">
					اكتشف أقوى الخصومات والعروض الحصرية من أفضل المتاجر والمطاعم ووفر
					المال مع عروض شلة المميزة
				</p>
			</div>

			<div className="mb-8 space-y-4">
				<div className="mx-auto max-w-md">
					<div className="relative">
						<input
							type="text"
							placeholder="ابحث عن خصم..."
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
						<option value="discountPercentage">أكبر خصم</option>
						<option value="validUntil">ينتهي قريباً</option>
						<option value="title">اسم المتجر</option>
					</select>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{sortedDiscounts.map((discount) => {
					const info = getDiscountInfo(discount);
					return (
						<div
							key={discount.id}
							onClick={() => navigateToDiscount(discount.title)}
							className="relative transform cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
						>
							<div className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
								-{info.discountPercentage}%
							</div>
							<div className="relative mb-4">
								<img
									src={discount.image || "/supermarket.png"}
									alt={discount.title}
									className="h-32 w-full rounded-lg object-cover"
								/>
								<div className="bg-opacity-70 absolute right-2 bottom-2 rounded bg-black px-2 py-1 text-xs text-white">
									{getDaysRemaining(info.validUntil)} أيام متبقية
								</div>
							</div>
							<div>
								<h3 className="mb-1 text-lg font-bold text-gray-900">
									{discount.title}
								</h3>
								<p className="mb-2 text-sm text-gray-600">
									{discount.description || "خصم مميز من متجرنا"}
								</p>
								<div className="mb-3 text-sm text-gray-500">
									🏪 {discount.title}
								</div>
								<div className="mb-3 flex items-center justify-between">
									<div className="flex items-center space-x-2 space-x-reverse">
										<span className="text-lg font-bold text-green-600">
											{info.discountedPrice}
										</span>
										<span className="text-sm text-gray-400 line-through">
											{info.originalPrice}
										</span>
									</div>
									<div className="text-sm text-gray-500">
										وفرت{" "}
										{parseFloat(info.originalPrice) -
											parseFloat(info.discountedPrice)}{" "}
										ريال
									</div>
								</div>
								<div className="text-center text-xs text-gray-500">
									صالح حتى:{" "}
									{new Date(info.validUntil).toLocaleDateString("ar-SA")}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{filteredDiscounts.length === 0 && !isLoading && (
				<div className="py-12 text-center">
					<div className="mb-4 text-6xl">🎯</div>
					<h3 className="mb-2 text-xl font-semibold text-gray-700">
						لم نجد أي خصومات
					</h3>
					<p className="text-gray-500">جرب البحث بكلمات مختلفة أو غير الفلتر</p>
				</div>
			)}
		</>
	);
}
