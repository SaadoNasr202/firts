'use client';

import React, { useState, useEffect } from 'react';

interface Discount {
	id: string;
	title: string;
	description: string;
	time: string;
	image: string;
}

// Define the props for the component
interface DiscountSliderProps {
    onDiscountClick: (discountTitle: string) => void;
}

export default function DiscountSlider({ onDiscountClick }: DiscountSliderProps) {
	const [discounts, setDiscounts] = useState<Discount[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchDiscounts = async () => {
			try {
				const response = await fetch('/api/discounts');
				if (response.ok) {
					const data = await response.json();
					setDiscounts(data.discounts || []);
				} else {
					console.error('فشل في جلب الخصومات');
				}
			} catch (error) {
				console.error('خطأ في جلب الخصومات:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDiscounts();
	}, []);

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

	// عرض حالة التحميل
	if (isLoading) {
		return (
			<div className="relative flex items-center">
				<div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2">
					{[1, 2, 3].map((item) => (
						<div key={item} className="flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-96">
							<div className="relative h-48 animate-pulse bg-gray-300"></div>
							<div className="p-4">
								<div className="h-6 w-3/4 animate-pulse bg-gray-300 rounded mb-2"></div>
								<div className="h-4 w-full animate-pulse bg-gray-300 rounded"></div>
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
			{/* Left navigation arrow */}
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

			{/* Discounts container */}
			<div
				id="discounts-scroll-container"
				className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
			>
				{discounts.map((discount, index) => (
					// Changed from `div` to `button` to be interactive
					<button
						key={index}
                        onClick={() => onDiscountClick(discount.title)}
						className="flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-96 cursor-pointer"
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

			{/* Right navigation arrow */}
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