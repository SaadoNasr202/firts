"use client";

import NearbyStoresPage from "@/components/HomePage/NearbyStoresPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";

export default function NearbyStoresPageContent() {
	const handleStoreClick = (storeName: string) => {
		window.location.href = `/store?store=${encodeURIComponent(storeName)}&source=nearby`;
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
					path={["الرئيسية", "المتاجر القريبة منك"]} 
					onBreadcrumbClick={handleBreadcrumbClick} 
				/>
			</div>
			<NearbyStoresPage onStoreClick={handleStoreClick} />
		</>
	);
}
