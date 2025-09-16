"use client";

import DiscountSlider from "@/components/HomePage/DiscountSlider";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";

export default function DiscountsPageRoute() {
	const handleDiscountClick = (discountTitle: string) => {
		window.location.href = `/store?store=${encodeURIComponent(discountTitle)}&source=discounts`;
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
						path={["الرئيسية", "أقوى الخصومات"]} 
						onBreadcrumbClick={handleBreadcrumbClick} 
					/>
				</div>
				<DiscountSlider onDiscountClick={handleDiscountClick} />
			</div>
			<Shellafooter />
		</>
	);
}
