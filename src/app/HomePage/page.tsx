import HomePage from "@/components/HomePage/HomePage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { getCategoriesAction } from "@/lib/ServerAction/category";
import { getDiscountsAction } from "@/lib/ServerAction/Discount";
import { getNearbyStoresAction } from "@/lib/ServerAction/nebry";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "الصفحة الرئيسية - شلة",
	description:
		"اكتشف أفضل المتاجر والمطاعم في منطقتك. تسوق من سوبرماركت، مطاعم، صيدليات وأكثر. توصيل سريع وموثوق إلى باب منزلك.",
	keywords:
		"شلة, تسوق, توصيل, مطاعم, سوبرماركت, صيدليات, متاجر قريبة, خصومات, عروض",
	openGraph: {
		title: "الصفحة الرئيسية - شلة",
		description:
			"اكتشف أفضل المتاجر والمطاعم في منطقتك. تسوق من سوبرماركت، مطاعم، صيدليات وأكثر. توصيل سريع وموثوق إلى باب منزلك.",
		type: "website",
		locale: "ar_SA",
	},
	twitter: {
		card: "summary_large_image",
		title: "الصفحة الرئيسية - شلة",
		description:
			"اكتشف أفضل المتاجر والمطاعم في منطقتك. تسوق من سوبرماركت، مطاعم، صيدليات وأكثر. توصيل سريع وموثوق إلى باب منزلك.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

// Loading component للـ Suspense
function HomePageLoading() {
	return (
		<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
			<div className="flex h-screen items-center justify-center">
				<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
			</div>
		</div>
	);
}

export default function HomePage1() {
	return (
		<>
			<NavBarCondition />
			<Suspense fallback={<HomePageLoading />}>
				<HomePage
					getCategoriesAction={getCategoriesAction}
					getNearbyStoresAction={getNearbyStoresAction}
					getDiscountsAction={getDiscountsAction}
				/>
			</Suspense>
			<Shellafooter />
		</>
	);
}
