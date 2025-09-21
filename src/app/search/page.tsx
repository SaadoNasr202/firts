import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";
import SearchPageContent from "./SearchPageContent";

export const metadata: Metadata = {
  title: "البحث - شلة",
  description: "ابحث عن المتاجر والمطاعم والمنتجات في شلة. اكتشف أفضل العروض والخصومات.",
  keywords: "بحث, متاجر, مطاعم, منتجات, شلة, عروض, خصومات",
  openGraph: {
    title: "البحث - شلة",
    description: "ابحث عن المتاجر والمطاعم والمنتجات في شلة. اكتشف أفضل العروض والخصومات.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "البحث - شلة",
    description: "ابحث عن المتاجر والمطاعم والمنتجات في شلة. اكتشف أفضل العروض والخصومات.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SearchPageRoute() {
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<SearchPageContent />
			</div>
			<Shellafooter />
		</>
	);
}
