"use client";
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

interface Product {
	id: string;
	name: string;
	image: string;
	price: string;
	originalPrice: string;
	unit: string;
}

interface Store {
	id: string;
	name: string;
	type: string;
	rating: string;
	image: string;
}

export default function Favorites() {
	const [products, setProducts] = useState<Product[]>([]);
	const [stores, setStores] = useState<Store[]>([]);
	const [activeTab, setActiveTab] = useState<"products" | "stores">("products"); 

	useEffect(() => {
		fetch("/api/favorites")
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.favProducts || []);
				setStores(data.favStores || []);
			});
	}, []);

	return (
		<div className="flex flex-col">
			{/* تبويبات */}
			<div className="mb-6 flex justify-center border-b border-gray-200 bg-white px-2 py-4">
				<div className="flex flex-row-reverse space-x-6">
					<button
						className={`border-b-2 px-6 pb-2 text-xl font-semibold ${
							activeTab === "products"
								? "border-green-600 text-green-600"
								: "border-transparent text-gray-600 hover:border-green-600"
						}`}
						onClick={() => setActiveTab("products")}
					>
						المنتجات
					</button>
					<button
						className={`border-b-2 px-6 pb-2 text-xl font-semibold ${
							activeTab === "stores"
								? "border-green-600 text-green-600"
								: "border-transparent text-gray-600 hover:border-green-600"
						}`}
						onClick={() => setActiveTab("stores")}
					>
						كل المتاجر
					</button>
				</div>
			</div>

			{/* عرض المنتجات */}
			{activeTab === "products" && (
				<div className="grid grid-cols-3 gap-4">
					{products.map((product) => (
						<div
							key={product.id}
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
			)}

			{/* عرض المتاجر */}
			{activeTab === "stores" && (
				<div className="mt-4 grid grid-cols-2 gap-4">
					{stores.map((store) => (
						<div
							key={store.id}
							className="flex flex-col items-center rounded-lg border bg-white p-4"
						>
							<img
								src={store.image}
								alt={store.name}
								className="mb-2 h-20 w-20"
							/>
							<span className="font-semibold">{store.name}</span>
							<span className="text-sm text-gray-500">{store.type}</span>
							<span className="text-yellow-500">{store.rating} ⭐</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
