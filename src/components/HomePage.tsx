// HomePage.tsx

"use client";

import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import CategoriesSlider from "./CategoriesSlider";
import { allRestaurants, restaurantMenu } from "./datar";
import DiscountSlider from "./DiscountSlider";
import MealDetailsPage from "./MealDetailsPage";
import MealsPage from "./MealsPage";
import PopularStoresSlider from "./PopularStoresSlider";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductsPage from "./ProductsPage";
import RestaurantsPage from "./RestaurantsPage";
import StorePage from "./StorePage";
import SuperMarket from "./SuperMarket";
import { allProducts } from "./data";
import RestaurantSectionsPage from "./RestaurantPageDetails";

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
		if (categoryName === "سوبر ماركت") {
			setCurrentPage("supermarket");
		} else if (categoryName === "المطاعم") {
			setCurrentPage("restaurants");
		} else {
			setCurrentPage("home");
		}
	};

	const handleStoreClick = (storeName: string) => {
		setBreadcrumbPath(["الرئيسية", "المتاجر القريبة منك", storeName]);
		setSelectedStore(storeName);
		setCurrentPage("store");
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
		const product = allProducts.find((p) => p.id === productId);
		if (product) {
			setBreadcrumbPath([...breadcrumbPath, product.name]);
			setSelectedProductId(productId);
			setCurrentPage("product-details");
		}
	};

	const handleRestaurantClick = (restaurantId: number) => {
		const restaurant = allRestaurants.find((r) => r.id === restaurantId);
		if (restaurant) {
			setBreadcrumbPath(["الرئيسية", "المطاعم", restaurant.name]);
			setSelectedRestaurantId(restaurantId);
			setCurrentPage("restaurant-sections"); // اسم جديد للصفحة
		}
	};

	const handleSectionClick = (sectionName: string, restaurantId: number) => {
		setBreadcrumbPath([...breadcrumbPath, sectionName]);
		setSelectedSection(sectionName);
		setCurrentPage("meals");
	};

	const handleMealClick = (mealId: number) => {
		const allMeals = Object.values(restaurantMenu).flatMap(
			(menu) => menu.items,
		);
		const meal = allMeals.find((item) => item.id === mealId);

		if (meal) {
			setBreadcrumbPath([...breadcrumbPath, meal.name]);
			setSelectedMealId(mealId);
			setCurrentPage("meal-details");
		}
	};

	const handleBreadcrumbClick = (index: number) => {
		const newPath = breadcrumbPath.slice(0, index + 1);
		setBreadcrumbPath(newPath);

		if (newPath.length === 1) {
			setCurrentPage("home");
			setSelectedRestaurantId(null);
			setSelectedSection("");
			setSelectedMealId(null);
		} else if (newPath[1] === "سوبر ماركت") {
			if (newPath.length === 2) setCurrentPage("supermarket");
			else if (newPath.length === 3) setCurrentPage("store");
			else if (newPath.length === 4) setCurrentPage("products");
			else if (newPath.length === 5) setCurrentPage("product-details");
			setSelectedStore(newPath[2]);
			setSelectedCategory(newPath[3]);
			setSelectedProductId(null);
		} else if (newPath[1] === "المطاعم") {
			if (newPath.length === 2) {
				setCurrentPage("restaurants");
			} else if (newPath.length === 3) {
				setCurrentPage("restaurant-sections");
				const restaurant = allRestaurants.find((r) => r.name === newPath[2]);
				setSelectedRestaurantId(restaurant?.id || null);
				setSelectedSection("");
			} else if (newPath.length === 4) {
				setCurrentPage("meals");
				const restaurant = allRestaurants.find((r) => r.name === newPath[2]);
				setSelectedRestaurantId(restaurant?.id || null);
				setSelectedSection(newPath[3]);
				setSelectedMealId(null);
			} else if (newPath.length === 5) {
				setCurrentPage("meal-details");
				// Note: mealId is not in breadcrumb, so we just set page
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
					{/* ... (بقية المكونات) */}
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

			{currentPage === "supermarket" && (
				<SuperMarket onStoreClick={handleSupermarketStoreClick} />
			)}
			{currentPage === "store" && selectedStore && (
				<StorePage
					storeName={selectedStore}
					onCategoryClick={handleStoreCategoryClick}
				/>
			)}
			{currentPage === "products" && selectedCategory && (
				<ProductsPage
					categoryName={selectedCategory}
					onProductClick={handleProductClick}
				/>
			)}
			{currentPage === "product-details" && selectedProductId !== null && (
				<ProductDetailsPage
					productId={selectedProductId}
					onProductClick={handleProductClick}
				/>
			)}
			{currentPage === "restaurants" && (
				<RestaurantsPage onRestaurantClick={handleRestaurantClick} />
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
		</div>
	);
}
