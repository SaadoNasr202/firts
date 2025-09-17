"use client";

import StorePage from "@/components/HomePage/StorePage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function StorePageRoute() {
    return (
        <>
            <NavBarCondition />
            <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
                <Suspense fallback={null}>
                    <StorePageContent />
                </Suspense>
            </div>
            <Shellafooter />
        </>
    );
}

function StorePageContent() {
    const searchParams = useSearchParams();
    const storeName = searchParams.get("store") || "";
    const categoryName = searchParams.get("category") || "";
    const source = searchParams.get("source") || "";

    const handleCategoryClick = (categoryName: string) => {
        window.location.href = `/products?store=${encodeURIComponent(storeName)}&category=${encodeURIComponent(categoryName)}`;
    };

    const handleBreadcrumbClick = (index: number) => {
        if (index === 0) {
            window.location.href = "/HomePage";
        } else if (source === "nearby") {
            window.location.href = "/nearby-stores";
        } else if (source === "discounts") {
            window.location.href = "/discounts";
        } else if (source === "popular") {
            window.location.href = "/popular-stores";
        } else if (categoryName) {
            window.location.href = `/category-stores?category=${encodeURIComponent(categoryName)}`;
        }
    };

    if (!storeName) {
        return <div className="text-center text-gray-600">المتجر غير محدد.</div>;
    }

    return (
        <>
            <div className="mb-4">
                <Breadcrumb 
                    path={["الرئيسية", storeName]} 
                    onBreadcrumbClick={handleBreadcrumbClick} 
                />
            </div>
            <StorePage 
                storeName={storeName}
                onCategoryClick={handleCategoryClick}
            />
        </>
    );
}
