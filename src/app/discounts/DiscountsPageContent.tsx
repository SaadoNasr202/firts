"use client";

import DiscountSlider from "@/components/HomePage/DiscountSlider";
import Breadcrumb from "@/components/HomePage/Breadcrumb";

export default function DiscountsPageContent() {
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
			<div className="mb-4">
				<Breadcrumb 
					path={["الرئيسية", "أقوى الخصومات"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>
			<DiscountSlider onDiscountClick={handleDiscountClick} />
		</>
	);
}
