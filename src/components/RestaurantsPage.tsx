// RestaurantsPage.tsx

'use client';

import React from 'react';
import { allRestaurants } from './datar';

interface RestaurantsPageProps {
	onRestaurantClick: (restaurantId: number) => void;
}

export default function RestaurantsPage({ onRestaurantClick }: RestaurantsPageProps) {
	return (
		<div className="p-4 md:p-8" dir="rtl">
			<h1 className="mb-6 text-2xl font-bold text-gray-900">المطاعم</h1>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{allRestaurants.map((restaurant) => (
					<div
						key={restaurant.id}
						onClick={() => onRestaurantClick(restaurant.id)}
						className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
					>
						<img
							src={restaurant.image}
							alt={restaurant.name}
							className="h-32 w-full object-cover"
						/>
						<div className="p-4 text-center">
							<h3 className="text-lg font-semibold text-gray-800">
								{restaurant.name}
							</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}