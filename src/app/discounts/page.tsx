import DiscountSlider from "@/components/HomePage/DiscountSlider";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";
import DiscountsPageContent from "./DiscountsPageContent";

export const metadata: Metadata = {
  title: "أقوى الخصومات - شلة",
  description: "اكتشف أقوى الخصومات والعروض الحصرية من أفضل المتاجر والمطاعم. وفر المال مع عروض شلة المميزة على جميع المنتجات والخدمات.",
  keywords: "خصومات شلة, عروض, تخفيضات, وفر المال, عروض حصرية, متاجر, مطاعم, تسوق بخصم",
  openGraph: {
    title: "أقوى الخصومات - شلة",
    description: "اكتشف أقوى الخصومات والعروض الحصرية من أفضل المتاجر والمطاعم. وفر المال مع عروض شلة المميزة على جميع المنتجات والخدمات.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "أقوى الخصومات - شلة",
    description: "اكتشف أقوى الخصومات والعروض الحصرية من أفضل المتاجر والمطاعم. وفر المال مع عروض شلة المميزة على جميع المنتجات والخدمات.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DiscountsPageRoute() {
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<DiscountsPageContent />
			</div>
			<Shellafooter />
		</>
	);
}
