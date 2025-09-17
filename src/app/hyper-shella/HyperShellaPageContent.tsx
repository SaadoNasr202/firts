"use client";

import HyperShellaPage from "@/components/HomePage/HyperShellaPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";

export default function HyperShellaPageContent() {
	const handleCategoryClick = (categoryName: string) => {
		window.location.href = `/products?store=${encodeURIComponent("هايبر شلة")}&category=${encodeURIComponent(categoryName)}`;
	};

	const handleBreadcrumbClick = (index: number) => {
		if (index === 0) {
			window.location.href = "/HomePage";
		}
	};

	return (
		<>
			<div className="mb-4">
				<Breadcrumb 
					path={["الرئيسية", "هايبر شلة"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>
			<HyperShellaPage 
				storeName="هايبر شلة"
				onCategoryClick={handleCategoryClick}
			/>
		</>
	);
}
