import StorePage from "@/components/HomePage/StorePage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Suspense } from "react";
import { Metadata } from "next";
import StorePageContent from "./StorePageContent";

export const metadata: Metadata = {
  title: "المتجر - شلة",
  description: "تصفح منتجات المتجر واستمتع بأفضل العروض والخصومات. توصيل سريع وموثوق إلى باب منزلك.",
  keywords: "متجر, منتجات, عروض, خصومات, توصيل سريع, تسوق",
  openGraph: {
    title: "المتجر - شلة",
    description: "تصفح منتجات المتجر واستمتع بأفضل العروض والخصومات. توصيل سريع وموثوق إلى باب منزلك.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "المتجر - شلة",
    description: "تصفح منتجات المتجر واستمتع بأفضل العروض والخصومات. توصيل سريع وموثوق إلى باب منزلك.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
