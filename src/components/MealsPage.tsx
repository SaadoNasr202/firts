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
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{meals.map((meal) => (
					<div
						key={meal.id}
						onClick={() => onMealClick(meal.id)}
						className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
					>
						<img
							src={meal.image}
							alt={meal.name}
							className="h-32 w-full object-cover"
						/>
						<div className="p-4 text-right">
							<h3 className="text-md font-bold text-gray-800">{meal.name}</h3>
							<p className="mt-1 text-sm font-semibold text-green-600">
								{meal.price}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
