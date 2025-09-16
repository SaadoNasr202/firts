"use client";

import NearbyStoresPage from "@/components/HomePage/NearbyStoresPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";

export default function NearbyStoresPageRoute() {
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
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<div className="mb-4">
					<Breadcrumb 
						path={["الرئيسية", "المتاجر القريبة منك"]} 
						onBreadcrumbClick={handleBreadcrumbClick} 
					/>
				</div>
				<NearbyStoresPage onStoreClick={handleStoreClick} />
			</div>
			<Shellafooter />
		</>
	);
}
