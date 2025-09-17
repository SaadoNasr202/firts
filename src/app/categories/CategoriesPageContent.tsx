"use client";

import CategoriesSlider from "@/components/HomePage/CategoriesSlider";
import Breadcrumb from "@/components/HomePage/Breadcrumb";

export default function CategoriesPageContent() {
	const handleCategoryClick = (categoryName: string) => {
		window.location.href = `/category-stores?category=${encodeURIComponent(categoryName)}`;
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
					path={["الرئيسية", "أقسامنا"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>
			<CategoriesSlider onCategoryClick={handleCategoryClick} />
		</>
	);
}
