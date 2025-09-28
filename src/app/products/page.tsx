import ProductsPage from "@/components/HomePage/ProductsPage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المنتجات - شلة",
  description: "تصفح جميع المنتجات المتاحة في المتجر. منتجات متنوعة بأسعار منافسة مع توصيل سريع وموثوق.",
  keywords: "منتجات, تسوق, أسعار منافسة, توصيل سريع, منتجات متنوعة",
  openGraph: {
    title: "المنتجات - شلة",
    description: "تصفح جميع المنتجات المتاحة في المتجر. منتجات متنوعة بأسعار منافسة مع توصيل سريع وموثوق.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "المنتجات - شلة",
    description: "تصفح جميع المنتجات المتاحة في المتجر. منتجات متنوعة بأسعار منافسة مع توصيل سريع وموثوق.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsPageRoute() {
    return (
        <>
            <NavBarCondition />
            <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
                <Suspense fallback={null}>
                    <ProductsPage isFullPage={true} />
                </Suspense>
            </div>
            <Shellafooter />
        </>
    );
}
