"use client";

import ProductDetailsPage from "@/components/HomePage/ProductDetailsPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { useSearchParams } from "next/navigation";

export default function ProductDetailsPageRoute() {
	const searchParams = useSearchParams();
	const productId = searchParams.get("productId") || "";
	const storeName = searchParams.get("store") || "";
	const categoryName = searchParams.get("category") || "";

	const handleProductClick = (productId: string) => {
		window.location.href = `/product-details?productId=${encodeURIComponent(productId)}&store=${encodeURIComponent(storeName)}&category=${encodeURIComponent(categoryName)}`;
	};

	const handleBreadcrumbClick = (index: number) => {
		if (index === 0) {
			window.location.href = "/HomePage";
		} else if (index === 1) {
			window.location.href = `/store?store=${encodeURIComponent(storeName)}`;
		} else if (index === 2) {
			window.location.href = `/products?store=${encodeURIComponent(storeName)}&category=${encodeURIComponent(categoryName)}`;
		}
	};

	if (!productId) {
		return (
			<>
				<NavBarCondition />
				<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
					<div className="text-center text-gray-600">المنتج غير محدد.</div>
				</div>
				<Shellafooter />
			</>
		);
	}

	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<div className="mb-4">
					<Breadcrumb 
						path={["الرئيسية", storeName, categoryName, "تفاصيل المنتج"]} 
						onBreadcrumbClick={handleBreadcrumbClick} 
					/>
				</div>
				<ProductDetailsPage 
					productId={productId}
					onProductClick={handleProductClick}
				/>
			</div>
			<Shellafooter />
		</>
	);
}
