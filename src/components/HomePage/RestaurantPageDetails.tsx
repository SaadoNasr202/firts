// RestaurantSectionsPage.tsx

"use client";

import { allRestaurants, restaurantMenu } from "./HomePage/datar";

interface RestaurantSectionsPageProps {
	restaurantId: number;
	onSectionClick: (sectionName: string, restaurantId: number) => void;
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

export default function RestaurantSectionsPage({
	restaurantId,
	onSectionClick,
}: RestaurantSectionsPageProps) {
	const restaurant = allRestaurants.find((r) => r.id === restaurantId);

	// Type assert the restaurantMenu object to allow number indexing
	const menuData = (restaurantMenu as RestaurantMenuType)[restaurantId];

	if (!restaurant || !menuData) {
		return (
			<div className="p-8 text-center text-red-600">المطعم غير موجود.</div>
		);
	}

	return (
		<div className="p-4 md:p-8" dir="rtl">
			<div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg shadow-md md:h-64">
				<img
					src={restaurant.image}
					alt={restaurant.name}
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 flex items-end bg-black/40 p-4 text-white">
					<h1 className="text-2xl font-bold">{restaurant.name}</h1>
				</div>
			</div>

			<h2 className="mb-4 text-xl font-bold text-gray-900">أقسام المطعم</h2>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
				{menuData.sections.map((section: string) => (
					<button
						key={section}
						onClick={() => onSectionClick(section, restaurantId)}
						className="rounded-lg bg-gray-100 p-4 text-center shadow-sm transition-colors hover:bg-gray-200"
					>
						<p className="text-md font-semibold text-gray-800">{section}</p>
					</button>
				))}
			</div>
		</div>
	);
}
