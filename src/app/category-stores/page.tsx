"use client";

import CategoryStoresPage from "@/components/HomePage/CategoryStoresPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function CategoryStoresPageRoute() {
    return (
        <>
            <NavBarCondition />
            <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
                <Suspense fallback={null}>
                    <CategoryStoresPageContent />
                </Suspense>
            </div>
            <Shellafooter />
        </>
    );
}

function CategoryStoresPageContent() {
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
