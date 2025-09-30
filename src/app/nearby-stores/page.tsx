import NearbyStoresPage from "@/components/HomePage/NearbyStoresPage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { getNearbyStoresAction } from "@/lib/ServerAction/nebry";
import { Metadata } from "next";
// Removed old content component; using unified component

export const metadata: Metadata = {
  title: "المتاجر القريبة منك - شلة",
  description: "اكتشف أفضل المتاجر والمطاعم القريبة من موقعك. تسوق من أقرب المتاجر واستمتع بتوصيل سريع وموثوق.",
  keywords: "متاجر قريبة, مطاعم قريبة, توصيل سريع, موقعي, أقرب متاجر, تسوق محلي",
  openGraph: {
    title: "المتاجر القريبة منك - شلة",
    description: "اكتشف أفضل المتاجر والمطاعم القريبة من موقعك. تسوق من أقرب المتاجر واستمتع بتوصيل سريع وموثوق.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "المتاجر القريبة منك - شلة",
    description: "اكتشف أفضل المتاجر والمطاعم القريبة من موقعك. تسوق من أقرب المتاجر واستمتع بتوصيل سريع وموثوق.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NearbyStoresPageRoute() {
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<NearbyStoresPage isFullPage={true} getNearbyStoresAction={getNearbyStoresAction} />
			</div>
			<Shellafooter />
		</>
	);
}
