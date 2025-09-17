"use client";

import ProductsPage from "@/components/HomePage/ProductsPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import { useSearchParams } from "next/navigation";

export default function ProductsPageContent() {
    const searchParams = useSearchParams();
    const storeName = searchParams.get("store") || "";
    const categoryName = searchParams.get("category") || "";

    const handleProductClick = (productId: string) => {
        window.location.href = `/product-details?productId=${encodeURIComponent(productId)}&store=${encodeURIComponent(storeName)}&category=${encodeURIComponent(categoryName)}`;
    };

    const handleBreadcrumbClick = (index: number) => {
        if (index === 0) {
            window.location.href = "/HomePage";
        } else {
            window.location.href = `/store?store=${encodeURIComponent(storeName)}`;
        }
    };

    if (!storeName || !categoryName) {
        return <div className="text-center text-gray-600">المتجر أو القسم غير محدد.</div>;
    }

    return (
        <>
            <div className="mb-4">
                <Breadcrumb 
                    path={["الرئيسية", storeName, categoryName]} 
                    onBreadcrumbClick={handleBreadcrumbClick} 
                />
            </div>
            <ProductsPage 
                storeName={storeName}
                categoryName={categoryName}
                onProductClick={handleProductClick}
            />
        </>
    );
}
