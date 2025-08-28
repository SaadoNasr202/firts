"use client";

// تحديد نوع الخاصية (prop)
interface CategoriesSliderProps {
	onCategoryClick: (categoryName: string) => void;
}

export default function CategoriesSlider({
	onCategoryClick,
}: CategoriesSliderProps) {
	const categories = [
		"خدمة خدمتي",
		"استلام وتسليم",
		"هايبر سلة",
		"الخضار والفواكه",
		"سوبر ماركت",
		"المخبوزات",
		"العطور",
		"العناية بالحيوانات",
		"الصيدليات",
		"المطاعم",
	];

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

	return (
		<div className="relative flex items-center">
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
				className="scrollbar-hide flex space-x-4 space-x-reverse overflow-x-auto px-4 pb-2"
			>
				{categories.map((category, index) => (
					// جعل كل قسم زرًا تفاعليًا
					<button
						key={index}
						className="flex w-24 flex-shrink-0 cursor-pointer flex-col items-center text-center"
						onClick={() => onCategoryClick(category)}
					>
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 shadow-md">
							{/* هنا سيتم وضع أيقونة القسم */}
						</div>
						<p className="mt-2 text-xs text-gray-700">{category}</p>
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
