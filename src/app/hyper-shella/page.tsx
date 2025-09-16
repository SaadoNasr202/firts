"use client";

import HyperShellaPage from "@/components/HomePage/HyperShellaPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";

export default function HyperShellaPageRoute() {
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
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
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
			</div>
			<Shellafooter />
		</>
	);
}
