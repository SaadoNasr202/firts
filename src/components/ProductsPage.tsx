"use client";

import { allProducts } from "./data"; // استيراد البيانات

// تحديد الواجهة (interface) للمكون
interface ProductsPageProps {
	categoryName: string;
	onProductClick: (productId: number) => void;
}

export default function ProductsPage({
	categoryName,
	onProductClick,
}: ProductsPageProps) {
	// فلترة المنتجات حسب القسم
	const filteredProducts = allProducts.filter(
		(product) => product.category === categoryName,
	);

	return (
		<div className="p-4 md:p-8" dir="rtl">
			<h2 className="mb-4 text-xl font-bold text-gray-900">
				المنتجات في قسم {categoryName}
			</h2>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{filteredProducts.map((product, index) => (
					<button
						key={index}
						onClick={() => onProductClick(product.id)}
						className="flex cursor-pointer flex-col overflow-hidden rounded-lg bg-gray-100 p-4 text-center shadow-sm"
					>
						<div className="relative">
							<img
								src={product.image}
								alt={product.name}
								className="h-32 w-full object-contain"
							/>
							<button className="absolute right-2 bottom-2 rounded-full bg-green-500 p-2 text-white shadow-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4v16m8-8H4"
									/>
								</svg>
							</button>
						</div>
						<div className="mt-2 text-right">
							<h3 className="text-sm font-semibold text-gray-800">
								{product.name}
							</h3>
							<p className="text-xs text-gray-500">{product.size}</p>
							<div className="mt-2 flex items-center justify-end">
								{product.oldPrice && (
									<span className="ml-2 text-xs text-gray-400 line-through">
										{product.oldPrice}
									</span>
								)}
								<span className="text-md font-bold text-green-600">
									{product.newPrice}
								</span>
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
