// HomePage.tsx

"use client";

import { Discount, NearbyStore } from "@/lib/types/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategoriesSlider from "./CategoriesSlider";
import DeliveryAddressSelector from "./DeliveryAddressSelector";
import DiscountSlider from "./DiscountSlider";
import NearbyStoresPage from "./NearbyStoresPage";
import PopularStoresSlider from "./PopularStoresSlider";
// Local Category type for action typing
type Category = {
	id: string;
	name: string;
	description?: string;
	image?: string;
};

export default function HomePageHomePage({
	getCategoriesAction,
	getNearbyStoresAction,
	getDiscountsAction,
}: {
	getCategoriesAction: () => Promise<
		| { categories: Category[]; cached: boolean; success: boolean }
		| { error: string }
	>;
	getNearbyStoresAction: (args: {
		lat: number;
		lng: number;
		limit?: number;
		maxDistance?: number;
	}) => Promise<
		| {
				stores: NearbyStore[];
				userLocation: { lat: number; lng: number };
				maxDistance: number;
				total: number;
		  }
		| { error: string }
	>;
	getDiscountsAction: () => Promise<
		{ discounts: Discount[]; success: boolean } | { error: string }
	>;
}) {
	const router = useRouter();

	const [selectedDeliveryAddress, setSelectedDeliveryAddress] =
		useState<any>(null);

	// لا نحتاج إلى تحميل الحالة من URL بعد الآن

	// لا نحتاج إلى دالة updateURL بعد الآن

	const handleDeliveryAddressChange = (address: any) => {
		setSelectedDeliveryAddress(address);
	};

	const handleDiscountClick = (discountTitle: string) => {
		// معاملة الخصومات كمتاجر - الانتقال لصفحة المتجر
		router.push(
			`/store?store=${encodeURIComponent(discountTitle)}&source=discounts`,
		);
	};

	const handlePopularStoreClick = (storeName: string) => {
		router.push(`/store?store=${encodeURIComponent(storeName)}&source=popular`);
	};

	const handleCategoryClick = (categoryName: string) => {
		if (categoryName === "هايبر شلة") {
			router.push("/hyper-shella");
		} else if (categoryName == "استلام وتسليم") {
			router.push("/PickUp");
		} else {
			router.push(
				`/category-stores?category=${encodeURIComponent(categoryName)}`,
			);
		}
	};

	// هذه الدالة لم تعد مستخدمة في الصفحة الرئيسية

	const handleStoreClick = (storeName: string) => {
		router.push(`/store?store=${encodeURIComponent(storeName)}&source=nearby`);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
			<div className="mb-4">
				<DeliveryAddressSelector
					onAddressChange={handleDeliveryAddressChange}
				/>
			</div>

			{/* مكونات الصفحة الرئيسية */}
			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">أقسامنا</h2>
					<button
						onClick={() => router.push("/categories")}
						className="text-sm font-semibold text-green-600 hover:text-green-800"
					>
						عرض الكل
					</button>
				</div>
				<CategoriesSlider
					onCategoryClick={handleCategoryClick}
					getCategoriesAction={getCategoriesAction}
				/>
			</section>

			<section>
				<div className="relative">
					{/* صورة الخلفية */}
					<div className="w-full">
						<img
							src="ramadan.png"
							alt="مع شلة كل احتياجاتك بضغطة زر"
							className="h-auto w-full object-cover object-center"
						/>
					</div>
				</div>
			</section>

			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">
						المتاجر القريبة منك
					</h2>
					<button
						onClick={() => router.push("/nearby-stores")}
						className="text-sm font-semibold text-green-600 hover:text-green-800"
					>
						عرض الكل
					</button>
				</div>
				<NearbyStoresPage
					onStoreClick={handleStoreClick}
					selectedLocation={selectedDeliveryAddress}
					getNearbyStoresAction={getNearbyStoresAction}
				/>
			</section>

			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">أقوى الخصومات</h2>
					<button
						onClick={() => router.push("/discounts")}
						className="text-sm font-semibold text-green-600 hover:text-green-800"
					>
						عرض الكل
					</button>
				</div>
				<DiscountSlider
					onDiscountClick={handleDiscountClick}
					getDiscountsAction={getDiscountsAction}
				/>
			</section>

			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">
						أشهر المحلات في منطقتك
					</h2>
					<button
						onClick={() => router.push("/popular-stores")}
						className="text-sm font-semibold text-green-600 hover:text-green-800"
					>
						عرض الكل
					</button>
				</div>
				<PopularStoresSlider
					onStoreClick={handlePopularStoreClick}
					selectedLocation={selectedDeliveryAddress}
					getNearbyStoresAction={getNearbyStoresAction}
				/>
			</section>
		</div>
	);
}
