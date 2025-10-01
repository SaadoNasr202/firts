import SearchPage from "@/components/HomePage/SearchPage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "البحث - شلة",
	description:
		"ابحث عن المتاجر والمطاعم والمنتجات في شلة. اكتشف أفضل العروض والخصومات.",
	keywords: "بحث, متاجر, مطاعم, منتجات, شلة, عروض, خصومات",
	openGraph: {
		title: "البحث - شلة",
		description:
			"ابحث عن المتاجر والمطاعم والمنتجات في شلة. اكتشف أفضل العروض والخصومات.",
		type: "website",
		locale: "ar_SA",
	},
	twitter: {
		card: "summary_large_image",
		title: "البحث - شلة",
		description:
			"ابحث عن المتاجر والمطاعم والمنتجات في شلة. اكتشف أفضل العروض والخصومات.",
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
				<Suspense
					fallback={
						<div className="py-12 text-center">
							<div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
							<p className="text-gray-600">جاري تحميل صفحة البحث...</p>
						</div>
					}
				>
					<SearchPage />
				</Suspense>
			</div>
			<Shellafooter />
		</>
	);
}
