// MealsPage.tsx

"use client";

import { restaurantMenu } from "./datar";

interface MealsPageProps {
	restaurantId: number;
	sectionName: string;
	onMealClick: (mealId: number) => void;
}

// Add a type definition for the restaurantMenu object
interface RestaurantMenuType {
	[key: number]: {
		sections: string[];
		items: {
			id: number;
			restaurantId: number;
			name: string;
			price: string;
			image: string;
			section: string;
			description: string;
		}[];
	};
}

export default function MealsPage({
	restaurantId,
	sectionName,
	onMealClick,
}: MealsPageProps) {
	// Type assert the restaurantMenu object to allow number indexing
	const menuData = (restaurantMenu as RestaurantMenuType)[restaurantId];

	if (!menuData) {
		return (
			<div className="p-8 text-center text-red-600">القائمة غير موجودة.</div>
		);
	}

	const meals = menuData.items.filter((item) => item.section === sectionName);

	if (meals.length === 0) {
		return (
			<div className="p-8 text-center text-gray-600">
				لا توجد وجبات في هذا القسم.
			</div>
		);
	}

	return (
		<div className="p-4 md:p-8" dir="rtl">
			<h2 className="mb-6 text-xl font-bold text-gray-900">{sectionName}</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{meals.map((meal) => (
					<div
						key={meal.id}
						onClick={() => onMealClick(meal.id)}
						className="w-[200px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
					>
						{/* قسم الصورة العلوي */}
						<div className="relative h-[200px] w-[200px]">
							<img
								src={meal.image}
								alt={meal.name}
								className="h-full w-full object-cover"
							/>
							{/* أيقونة القلب في الزاوية العلوية اليمنى */}
							<div className="absolute top-3 right-3 rounded-full bg-white p-2 shadow">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-5 w-5 text-gray-600"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
									/>
								</svg>
							</div>
						</div>

						{/* قسم التفاصيل السفلي */}
						<div className="p-4 pt-2 text-right">
							<h3 className="text-lg font-bold text-gray-800">{meal.name}</h3>
							<p className="mt-1 text-sm text-gray-600">{meal.description}</p>

							{/* قسم السعر وزر الإضافة */}
							<div className="mt-2 flex items-center justify-between">
								<p className="text-base font-semibold text-orange-500">
									{meal.price}
								</p>

								<button
									className="text-green-500 hover:text-green-600"
									aria-label="Add to cart"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-7 w-7"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
