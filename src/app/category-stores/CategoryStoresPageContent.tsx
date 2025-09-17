"use client";

import Breadcrumb from "@/components/HomePage/Breadcrumb";
import CategoryStoresPage from "@/components/HomePage/CategoryStoresPage";
import { useSearchParams } from "next/navigation";

export default function CategoryStoresPageContent() {
	const searchParams = useSearchParams();
	const categoryName = searchParams.get("category") || "";

	const handleStoreClick = (storeName: string) => {
		window.location.href = `/store?store=${encodeURIComponent(storeName)}&category=${encodeURIComponent(categoryName)}`;
	};

	const handleBreadcrumbClick = (index: number) => {
		if (index === 0) {
			window.location.href = "/HomePage";
		} else {
			window.location.href = "/categories";
		}
	};

	if (!categoryName) {
		return <div className="text-center text-gray-600">القسم غير محدد.</div>;
	}

	return (
		<>
			<div className="mb-4">
				<Breadcrumb
					path={["الرئيسية", categoryName]}
					onBreadcrumbClick={handleBreadcrumbClick}
				/>
			</div>
			<CategoryStoresPage
				categoryName={categoryName}
				onStoreClick={handleStoreClick}
			/>
		</>
	);
}
