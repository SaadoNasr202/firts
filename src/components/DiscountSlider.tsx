"use client";

export default function DiscountSlider() {
	const discounts = [
		{
			title: "فيلي ستيكس",
			description: "ساندويتش، وجبات سريعة",
			time: "30 دقيقة",
			image: "https://via.placeholder.com/400x200?text=Philly+Steaks",
		},
		{
			title: "ماكدونالدز",
			description: "ساندويتش، وجبات سريعة",
			time: "90 دقيقة",
			image: "https://via.placeholder.com/400x200?text=McDonalds",
		},
		{
			title: "فواكه وخضار الإيمان",
			description: "بقالة",
			time: "60 دقيقة",
			image: "https://via.placeholder.com/400x200?text=Groceries",
		},
	
	];

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

			{/* حاوية الخصومات */}
			<div
				id="discounts-scroll-container"
				className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
			>
				{discounts.map((discount, index) => (
					<div
						key={index}
						className="flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm md:w-96"
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
					</div>
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
