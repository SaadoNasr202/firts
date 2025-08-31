import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

interface Product {
	name: string;
	image: string;
	price: string;
	originalPrice: string;
	unit: string;
}

const favoriteProducts: Product[] = [
	{
		name: "مطهر ارضيات ديتول",
		image: "https://via.placeholder.com/100x100.png?text=Product+1",
		price: "9 ريال",
		originalPrice: "12 ريال",
		unit: "500 مل",
	},
	{
		name: "اوريو بسكويت",
		image: "https://via.placeholder.com/100x100.png?text=Product+2",
		price: "6 ريال",
		originalPrice: "11 ريال",
		unit: "300 جرام",
	},
	{
		name: "شامبو كلير",
		image: "https://via.placeholder.com/100x100.png?text=Product+3",
		price: "10 ريال",
		originalPrice: "14 ريال",
		unit: "900 مل",
	},
];

export default function Favorites() {
	return (
		<div className="flex flex-col">
			{/* Container for buttons, centered with a bottom border */}
			<div className="flex justify-center mb-6 border-b border-gray-200 bg-white px-2 py-4">
				<div className="flex flex-row-reverse space-x-6">
					<button className="border-b-2 border-green-600 pb-2 px-6 font-semibold text-xl text-green-600">
						المنتجات
					</button>
					<button className="border-b-2 border-transparent pb-2 px-6 font-semibold text-xl text-gray-600 hover:border-green-600">
						كل المتاجر
					</button>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{favoriteProducts.map((product, index) => (
					<div
						key={index}
						className="flex flex-col items-center rounded-lg bg-white border border-gray-200 p-4"
					>
						<div className="relative">
							<img
								src={product.image}
								alt={product.name}
								className="mb-2 h-24 w-24"
							/>
							<FaPlusCircle className="absolute right-0 bottom-0 cursor-pointer text-xl text-green-600" />
						</div>
						<div className="flex flex-col items-center mb-2">
							<span className="font-semibold text-gray-800 text-center">{product.name}</span>
							<span className="text-sm text-gray-500 text-center">{product.unit}</span>
						</div>
						{/* Price container, right-aligned with correct order and styling */}
						<div className="mt-auto w-full text-right flex flex-row-reverse items-center justify-start space-x-1">
							<span className="text-lg font-bold text-orange-500">{product.price}</span>
							<span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}