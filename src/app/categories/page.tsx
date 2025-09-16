"use client";

import CategoriesSlider from "@/components/HomePage/CategoriesSlider";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";

export default function CategoriesPageRoute() {
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
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<div className="mb-4">
					<Breadcrumb 
						path={["الرئيسية", "أقسامنا"]} 
						onBreadcrumbClick={handleBreadcrumbClick} 
					/>
				</div>
				<CategoriesSlider onCategoryClick={handleCategoryClick} />
			</div>
			<Shellafooter />
		</>
	);
}
