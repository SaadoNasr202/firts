"use client";

import PopularStoresSlider from "@/components/HomePage/PopularStoresSlider";
import Breadcrumb from "@/components/HomePage/Breadcrumb";

export default function PopularStoresPageContent() {
	const handleStoreClick = (storeName: string) => {
		window.location.href = `/store?store=${encodeURIComponent(storeName)}&source=popular`;
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
					path={["الرئيسية", "أشهر المحلات في منطقتك"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>
			<PopularStoresSlider onStoreClick={handleStoreClick} />
		</>
	);
}
