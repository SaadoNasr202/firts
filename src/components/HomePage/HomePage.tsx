// HomePage.tsx

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import CategoriesSlider from "./CategoriesSlider";
import DeliveryAddressSelector from "./DeliveryAddressSelector";
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
import HyperShellaPage from "./HyperShellaPage";

export default function HomePage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	
	const [currentPage, setCurrentPage] = useState("home");
	const [selectedStore, setSelectedStore] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedProductId, setSelectedProductId] = useState<string | null>(
		null,
	);
	const [selectedRestaurantId, setSelectedRestaurantId] = useState<
		number | null
	>(null);
	const [selectedSection, setSelectedSection] = useState("");
	const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
	const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>(["الرئيسية"]);
	const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState<any>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	// تحميل الحالة من URL عند بدء التطبيق
	useEffect(() => {
		const page = searchParams.get('page');
		const store = searchParams.get('store');
		const category = searchParams.get('category');
		const productId = searchParams.get('productId');
		const restaurantId = searchParams.get('restaurantId');
		const section = searchParams.get('section');
		const mealId = searchParams.get('mealId');
		const breadcrumb = searchParams.get('breadcrumb');

		if (page) {
			setCurrentPage(page);
		}
		if (store) {
			setSelectedStore(store);
		}
		if (category) {
			setSelectedCategory(category);
		}
		if (productId) {
			setSelectedProductId(productId);
		}
		if (restaurantId) {
			setSelectedRestaurantId(parseInt(restaurantId));
		}
		if (section) {
			setSelectedSection(section);
		}
		if (mealId) {
			setSelectedMealId(parseInt(mealId));
		}
		if (breadcrumb) {
			setBreadcrumbPath(JSON.parse(decodeURIComponent(breadcrumb)));
		}

		setIsInitialized(true);
	}, [searchParams]);

	// دالة مساعدة لتحديث URL
	const updateURL = (params: {
		page?: string;
		store?: string;
		category?: string;
		productId?: string | null;
		restaurantId?: number | null;
		section?: string;
		mealId?: number | null;
		breadcrumb?: string[];
	}) => {
		const url = new URL(window.location.href);
		
		// مسح المعاملات السابقة
		url.searchParams.delete('page');
		url.searchParams.delete('store');
		url.searchParams.delete('category');
		url.searchParams.delete('productId');
		url.searchParams.delete('restaurantId');
		url.searchParams.delete('section');
		url.searchParams.delete('mealId');
		url.searchParams.delete('breadcrumb');

		// إضافة المعاملات الجديدة
		if (params.page) url.searchParams.set('page', params.page);
		if (params.store) url.searchParams.set('store', params.store);
		if (params.category) url.searchParams.set('category', params.category);
		if (params.productId) url.searchParams.set('productId', params.productId);
		if (params.restaurantId) url.searchParams.set('restaurantId', params.restaurantId.toString());
		if (params.section) url.searchParams.set('section', params.section);
		if (params.mealId) url.searchParams.set('mealId', params.mealId.toString());
		if (params.breadcrumb) url.searchParams.set('breadcrumb', encodeURIComponent(JSON.stringify(params.breadcrumb)));

		router.replace(url.pathname + url.search);
	};

	const handleDeliveryAddressChange = (address: any) => {
		setSelectedDeliveryAddress(address);
	};

	const handleDiscountClick = (discountTitle: string) => {
		// معاملة الخصومات كمتاجر - الانتقال لصفحة المتجر
		const newBreadcrumb = ["الرئيسية", "أقوى الخصومات", discountTitle];
		setBreadcrumbPath(newBreadcrumb);
		setSelectedStore(discountTitle);
		setCurrentPage("store");
		updateURL({
			page: "store",
			store: discountTitle,
			breadcrumb: newBreadcrumb
		});
	};

	const handlePopularStoreClick = (storeName: string) => {
		const newBreadcrumb = ["الرئيسية", "أشهر المحلات في منطقتك", storeName];
		setBreadcrumbPath(newBreadcrumb);
		setSelectedStore(storeName);
		setCurrentPage("store");
		updateURL({
			page: "store",
			store: storeName,
			breadcrumb: newBreadcrumb
		});
	};

	const handleCategoryClick = (categoryName: string) => {
		const newBreadcrumb = ["الرئيسية", categoryName];
		setBreadcrumbPath(newBreadcrumb);
		
		if (categoryName === "هايبر شلة") {
			setCurrentPage("hyper-shella");
			updateURL({
				page: "hyper-shella",
				breadcrumb: newBreadcrumb
			});
		} else {
			setSelectedCategory(categoryName);
			setCurrentPage("category-stores");
			updateURL({
				page: "category-stores",
				category: categoryName,
				breadcrumb: newBreadcrumb
			});
		}
	};

	const handleCategoryStoreClick = (storeName: string) => {
		const newBreadcrumb = ["الرئيسية", selectedCategory, storeName];
		setBreadcrumbPath(newBreadcrumb);
		setSelectedStore(storeName);
		setCurrentPage("store");
		updateURL({
			page: "store",
			store: storeName,
			category: selectedCategory,
			breadcrumb: newBreadcrumb
		});
	};

	const handleStoreClick = (storeName: string) => {
		const newBreadcrumb = ["الرئيسية", "المتاجر القريبة منك", storeName];
		setBreadcrumbPath(newBreadcrumb);
		setSelectedStore(storeName);
		setCurrentPage("store");
		updateURL({
			page: "store",
			store: storeName,
			breadcrumb: newBreadcrumb
		});
	};
	const handleNearbyStoresClick = () => {
		const newBreadcrumb = ["الرئيسية", "المتاجر القريبة منك"];
		setBreadcrumbPath(newBreadcrumb);
		setCurrentPage("nearby-stores");
		updateURL({
			page: "nearby-stores",
			breadcrumb: newBreadcrumb
		});
	};
	const handleSupermarketStoreClick = (storeName: string) => {
		const newBreadcrumb = ["الرئيسية", "سوبر ماركت", storeName];
		setBreadcrumbPath(newBreadcrumb);
		setSelectedStore(storeName);
		setCurrentPage("store");
		updateURL({
			page: "store",
			store: storeName,
			breadcrumb: newBreadcrumb
		});
	};

	const handleStoreCategoryClick = (categoryName: string) => {
		const newBreadcrumb = [...breadcrumbPath, categoryName];
		setBreadcrumbPath(newBreadcrumb);
		setSelectedCategory(categoryName);
		setCurrentPage("products");
		updateURL({
			page: "products",
			category: categoryName,
			store: selectedStore,
			breadcrumb: newBreadcrumb
		});
	};

	const handleProductClick = (productId: string) => {
		// productId جاي كـ string من قاعدة البيانات
		setSelectedProductId(productId);
		setCurrentPage("product-details");
		updateURL({
			page: "product-details",
			productId: productId,
			store: selectedStore,
			category: selectedCategory,
			breadcrumb: breadcrumbPath
		});
	};

	const handleRestaurantClick = (restaurantId: number) => {
		// تبسيط - البيانات تأتي من قاعدة البيانات الآن
		setSelectedRestaurantId(restaurantId);
		setCurrentPage("restaurant-sections");
		updateURL({
			page: "restaurant-sections",
			restaurantId: restaurantId,
			breadcrumb: breadcrumbPath
		});
	};

	const handleSectionClick = (sectionName: string, restaurantId: number) => {
		const newBreadcrumb = [...breadcrumbPath, sectionName];
		setBreadcrumbPath(newBreadcrumb);
		setSelectedSection(sectionName);
		setCurrentPage("meals");
		updateURL({
			page: "meals",
			restaurantId: restaurantId,
			section: sectionName,
			breadcrumb: newBreadcrumb
		});
	};

	const handleMealClick = (mealId: number) => {
		// تبسيط - البيانات تأتي من قاعدة البيانات الآن
		setSelectedMealId(mealId);
		setCurrentPage("meal-details");
		updateURL({
			page: "meal-details",
			mealId: mealId,
			restaurantId: selectedRestaurantId,
			section: selectedSection,
			breadcrumb: breadcrumbPath
		});
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
			setSelectedProductId(null);
			updateURL({ page: "home", breadcrumb: newPath });
		} else if (newPath[1] === "المتاجر القريبة منك") {
			// معالجة المتاجر القريبة منك (حالة خاصة)
			if (newPath.length === 2) {
				setCurrentPage("nearby-stores");
				updateURL({ page: "nearby-stores", breadcrumb: newPath });
			} else if (newPath.length === 3) {
				setCurrentPage("store");
				setSelectedStore(newPath[2]);
				updateURL({ page: "store", store: newPath[2], breadcrumb: newPath });
			}
		} else if (newPath[1] === "أقوى الخصومات") {
			// معالجة أقوى الخصومات
			if (newPath.length === 2) {
				setCurrentPage("home"); // العودة للرئيسية حيث توجد الخصومات
				updateURL({ page: "home", breadcrumb: newPath });
			} else if (newPath.length === 3) {
				setCurrentPage("store");
				setSelectedStore(newPath[2]);
				updateURL({ page: "store", store: newPath[2], breadcrumb: newPath });
			}
		} else if (newPath[1] === "هايبر شلة") {
			// معالجة هايبر شلة
			setCurrentPage("hyper-shella");
			updateURL({ page: "hyper-shella", breadcrumb: newPath });
		} else {
			// معالجة جميع الأقسام (السوبرماركت، المطاعم، الصيدليات، إلخ)
			if (newPath.length === 2) {
				// الرجوع لصفحة متاجر القسم
				setCurrentPage("category-stores");
				setSelectedCategory(newPath[1]);
				setSelectedStore("");
				updateURL({ page: "category-stores", category: newPath[1], breadcrumb: newPath });
			} else if (newPath.length === 3) {
				// الانتقال لصفحة المتجر المحدد
				setCurrentPage("store");
				setSelectedStore(newPath[2]);
				setSelectedCategory(newPath[1]);
				updateURL({ page: "store", store: newPath[2], category: newPath[1], breadcrumb: newPath });
			}
		}
	};

	// عدم عرض المحتوى حتى يتم تحميل الحالة من URL
	if (!isInitialized) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
			<div className="mb-4">
				<DeliveryAddressSelector onAddressChange={handleDeliveryAddressChange} />
			</div>
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
							<button
								onClick={handleNearbyStoresClick}
								className="text-sm font-semibold text-green-600 hover:text-green-800"
							>
								عرض الكل
							</button>
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
			{currentPage === "nearby-stores" && (
				<NearbyStoresPage
					onStoreClick={handleStoreClick}
				/>
			)}
			{currentPage === "hyper-shella" && (
				<HyperShellaPage 
					storeName="هايبر شلة"
					onCategoryClick={handleStoreCategoryClick}
				/>
			)}
		</div>
	);
}
