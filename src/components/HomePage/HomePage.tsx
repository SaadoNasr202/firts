// HomePage.tsx

"use client";

import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import CategoriesSlider from "./CategoriesSlider";
import CategoryStoresPage from "./CategoryStoresPage";
import DiscountSlider from "./DiscountSlider";
import MealDetailsPage from "./MealDetailsPage";
import MealsPage from "./MealsPage";
import NearbyStoresPage from "./NearbyStoresPage";
import PopularStoresSlider from "./PopularStoresSlider";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductsPage from "./ProductsPage";
import RestaurantSectionsPage from "./RestaurantPageDetails";
import StorePage from "./StorePage";

export default function HomePage() {
	const [currentPage, setCurrentPage] = useState("home");
	const [selectedStore, setSelectedStore] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedProductId, setSelectedProductId] = useState<number | null>(
		null,
	);
	const [selectedRestaurantId, setSelectedRestaurantId] = useState<
		number | null
	>(null);
	const [selectedSection, setSelectedSection] = useState("");
	const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
	const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>(["الرئيسية"]);

	const handleDiscountClick = (discountTitle: string) => {
		console.log(`Discount on ${discountTitle} was clicked.`);
	};

	const handlePopularStoreClick = (storeName: string) => {
		setBreadcrumbPath(["الرئيسية", "أشهر المحلات في منطقتك", storeName]);
		setSelectedStore(storeName);
		setCurrentPage("store");
	};

	const handleCategoryClick = (categoryName: string) => {
		setBreadcrumbPath(["الرئيسية", categoryName]);
		setSelectedCategory(categoryName);
		setCurrentPage("category-stores");
	};

	const handleCategoryStoreClick = (storeName: string) => {
		setBreadcrumbPath(["الرئيسية", selectedCategory, storeName]);
		setSelectedStore(storeName);
		setCurrentPage("store");
	};

	const handleStoreClick = (storeName: string) => {
		setBreadcrumbPath(["الرئيسية", "المتاجر القريبة منك", storeName]);
		setSelectedStore(storeName);
		setCurrentPage("store");
	};
	const handleNearbyStoresClick = () => {
		setBreadcrumbPath(["الرئيسية", "المتاجر القريبة منك"]);
		setCurrentPage("nearby-stores");
	};
	const handleSupermarketStoreClick = (storeName: string) => {
		setBreadcrumbPath(["الرئيسية", "سوبر ماركت", storeName]);
		setSelectedStore(storeName);
		setCurrentPage("store");
	};

	const handleStoreCategoryClick = (categoryName: string) => {
		setBreadcrumbPath([...breadcrumbPath, categoryName]);
		setSelectedCategory(categoryName);
		setCurrentPage("products");
	};

	const handleProductClick = (productId: number) => {
		// تبسيط - البيانات تأتي من قاعدة البيانات الآن
		setSelectedProductId(productId);
		setCurrentPage("product-details");
	};

	const handleRestaurantClick = (restaurantId: number) => {
		// تبسيط - البيانات تأتي من قاعدة البيانات الآن
		setSelectedRestaurantId(restaurantId);
		setCurrentPage("restaurant-sections");
	};

	const handleSectionClick = (sectionName: string, restaurantId: number) => {
		setBreadcrumbPath([...breadcrumbPath, sectionName]);
		setSelectedSection(sectionName);
		setCurrentPage("meals");
	};

	const handleMealClick = (mealId: number) => {
		// تبسيط - البيانات تأتي من قاعدة البيانات الآن
		setSelectedMealId(mealId);
		setCurrentPage("meal-details");
	};

	const handleBreadcrumbClick = (index: number) => {
		const newPath = breadcrumbPath.slice(0, index + 1);
		setBreadcrumbPath(newPath);

		if (newPath.length === 1) {
			// الرجوع للرئيسية
			setCurrentPage("home");
			setSelectedRestaurantId(null);
			setSelectedSection("");
			setSelectedMealId(null);
			setSelectedCategory("");
			setSelectedStore("");
		} else if (newPath[1] === "المتاجر القريبة منك") {
			// معالجة المتاجر القريبة منك (حالة خاصة)
			if (newPath.length === 2) {
				setCurrentPage("nearby-stores");
			} else if (newPath.length === 3) {
				setCurrentPage("store");
				setSelectedStore(newPath[2]);
			}
		} else {
			// معالجة جميع الأقسام (السوبرماركت، المطاعم، الصيدليات، إلخ)
			if (newPath.length === 2) {
				// الرجوع لصفحة متاجر القسم
				setCurrentPage("category-stores");
				setSelectedCategory(newPath[1]);
				setSelectedStore("");
			} else if (newPath.length === 3) {
				// الانتقال لصفحة المتجر المحدد
				setCurrentPage("store");
				setSelectedStore(newPath[2]);
				setSelectedCategory(newPath[1]);
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
			<div className="mb-4">
				<Breadcrumb
					path={breadcrumbPath}
					onBreadcrumbClick={handleBreadcrumbClick}
				/>
			</div>

			{currentPage === "home" && (
				<>
					{/* ... (مكونات الصفحة الرئيسية) */}
					<section className="mt-8">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-bold text-gray-900">أقسامنا</h2>
							<a
								href="#"
								className="text-sm font-semibold text-green-600 hover:text-green-800"
								onClick={() => handleCategoryClick("أقسامنا")}
							>
								عرض الكل
							</a>
						</div>
						<CategoriesSlider onCategoryClick={handleCategoryClick} />
					</section>
					<section className="mb-8 overflow-hidden rounded-lg shadow-md">
						<img
							src="/ramadan.png"
							alt="Ramadan Sale"
							className="h-160 w-full object-cover"
						/>
					</section>

					{/* ... (بقية المكونات) */}

					<section className="mt-8">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-bold text-gray-900">
								المتاجر القريبة منك
							</h2>
							<a
								href="#"
								className="text-sm font-semibold text-green-600 hover:text-green-800"
								onClick={() => handleStoreClick("المتاجر القريبة منك")}
							>
								عرض الكل
							</a>
						</div>
						<NearbyStoresPage onStoreClick={handleStoreClick} />
					</section>

					<section className="mt-8">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-bold text-gray-900">أقوى الخصومات</h2>
							<a
								href="#"
								className="text-sm font-semibold text-green-600 hover:text-green-800"
							>
								عرض الكل
							</a>
						</div>
						<DiscountSlider onDiscountClick={handleDiscountClick} />
					</section>

					<section className="mt-8">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-bold text-gray-900">
								أشهر المحلات في منطقتك
							</h2>
							<a
								href="#"
								className="text-sm font-semibold text-green-600 hover:text-green-800"
							>
								عرض الكل
							</a>
						</div>
						<PopularStoresSlider onStoreClick={handlePopularStoreClick} />
					</section>
				</>
			)}

			{currentPage === "store" && selectedStore && (
				<StorePage
					storeName={selectedStore}
					onCategoryClick={handleStoreCategoryClick}
				/>
			)}
			{currentPage === "products" && selectedCategory && selectedStore && (
				<ProductsPage
					categoryName={selectedCategory}
					storeName={selectedStore}
					onProductClick={handleProductClick}
				/>
			)}
			{currentPage === "product-details" && selectedProductId !== null && (
				<ProductDetailsPage
					productId={selectedProductId}
					onProductClick={handleProductClick}
				/>
			)}
			{currentPage === "restaurant-sections" &&
				selectedRestaurantId !== null && (
					<RestaurantSectionsPage
						restaurantId={selectedRestaurantId}
						onSectionClick={handleSectionClick}
					/>
				)}
			{currentPage === "meals" &&
				selectedRestaurantId !== null &&
				selectedSection && (
					<MealsPage
						restaurantId={selectedRestaurantId}
						sectionName={selectedSection}
						onMealClick={handleMealClick}
					/>
				)}
			{currentPage === "meal-details" && selectedMealId !== null && (
				<MealDetailsPage mealId={selectedMealId} />
			)}
			{currentPage === "category-stores" && selectedCategory && (
				<CategoryStoresPage
					categoryName={selectedCategory}
					onStoreClick={handleCategoryStoreClick}
				/>
			)}
		</div>
	);
}
