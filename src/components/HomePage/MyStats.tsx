import React from 'react';
import { FaPlusCircle, FaWallet } from 'react-icons/fa';

interface Product {
	name: string;
	image: string;
	price: string;
	originalPrice: string;
	unit: string;
}

const mostPurchasedProducts: Product[] = [
	{
		name: "مطهر ارضيات ديتول",
		image: "https://via.placeholder.com/100x100.png?text=Product+1",
		price: "9 ريال",
		originalPrice: "12 ريال",
		unit: "500 مل",
	},
	{
		name: "شامبو كلير",
		image: "https://via.placeholder.com/100x100.png?text=Product+3",
		price: "10 ريال",
		originalPrice: "14 ريال",
		unit: "900 مل",
	},
	{
		name: "اوريو بسكويت",
		image: "https://via.placeholder.com/100x100.png?text=Product+2",
		price: "6 ريال",
		originalPrice: "11 ريال",
		unit: "300 جرام",
	},
	{
		name: "معكرونة بزياد",
		image: "https://via.placeholder.com/100x100.png?text=Product+4",
		price: "20 ريال",
		originalPrice: "25 ريال",
		unit: "190 جرام",
	},
];

export default function MyStats() {
	return (
		<div className="flex flex-col space-y-8">
			<h2 className="text-right text-2xl font-bold text-gray-800">
				إحصائياتي
			</h2>
			{/* Stats Summary Section */}
			<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 rounded-lg bg-green-600 p-6 text-white">
				<div className="flex flex-col text-right">
					<span className="text-sm font-medium">المبلغ المتاح للشراء</span>
					<span className="mt-1 text-xl font-bold">0.0 ر.س</span>
				</div>
				<div className="flex flex-col items-end text-right">
					<div className="flex items-center space-x-2">
						<FaWallet className="text-xl" />
						<span className="text-sm font-medium">المبلغ المقدم من قيدها</span>
					</div>
					<span className="mt-1 text-xl font-bold">0.0 ر.س</span>
				</div>
			</div>

			{/* Most Purchased Products Section */}
			<div className="flex flex-col">
				<h3 className="mb-4 text-right text-xl font-semibold text-gray-800">
					المنتجات الأكثر شراء
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{mostPurchasedProducts.map((product, index) => (
						<div
							key={index}
							className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4"
						>
							<div className="relative">
								<img
									src={product.image}
									alt={product.name}
									className="mb-2 h-24 w-24"
								/>
								<FaPlusCircle className="absolute right-0 bottom-0 cursor-pointer text-xl text-green-600" />
							</div>
							<div className="mb-2 flex flex-col items-center">
								<span className="text-center font-semibold text-gray-800">
									{product.name}
								</span>
								<span className="text-center text-sm text-gray-500">
									{product.unit}
								</span>
							</div>
							<div className="mt-auto flex w-full flex-row-reverse items-center justify-start space-x-1 text-right">
								<span className="text-lg font-bold text-orange-500">
									{product.price}
								</span>
								<span className="text-sm text-gray-500 line-through">
									{product.originalPrice}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}