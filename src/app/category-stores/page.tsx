import Breadcrumb from "@/components/HomePage/Breadcrumb";
import CategoryStoresPage from "@/components/HomePage/CategoryStoresPage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";
import { Suspense } from "react";
import CategoryStoresPageContent from "./CategoryStoresPageContent";

export const metadata: Metadata = {
	title: "متاجر القسم - شلة",
	description:
		"تصفح جميع المتاجر المتاحة في هذا القسم. اكتشف أفضل المتاجر والمطاعم مع توصيل سريع وموثوق.",
	keywords: "متاجر القسم, مطاعم, سوبرماركت, صيدليات, توصيل سريع, متاجر متنوعة",
	openGraph: {
		title: "متاجر القسم - شلة",
		description:
			"تصفح جميع المتاجر المتاحة في هذا القسم. اكتشف أفضل المتاجر والمطاعم مع توصيل سريع وموثوق.",
		type: "website",
		locale: "ar_SA",
	},
	twitter: {
		card: "summary_large_image",
		title: "متاجر القسم - شلة",
		description:
			"تصفح جميع المتاجر المتاحة في هذا القسم. اكتشف أفضل المتاجر والمطاعم مع توصيل سريع وموثوق.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

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
