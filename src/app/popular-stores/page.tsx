import PopularStoresSlider from "@/components/HomePage/PopularStoresSlider";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "أشهر المحلات في منطقتك - شلة",
  description: "اكتشف أشهر وأفضل المحلات والمطاعم في منطقتك. متاجر موثوقة ومقيمة من قبل العملاء مع توصيل سريع.",
  keywords: "أشهر المحلات, أفضل المطاعم, متاجر موثوقة, تقييمات العملاء, توصيل سريع, محلات مشهورة",
  openGraph: {
    title: "أشهر المحلات في منطقتك - شلة",
    description: "اكتشف أشهر وأفضل المحلات والمطاعم في منطقتك. متاجر موثوقة ومقيمة من قبل العملاء مع توصيل سريع.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "أشهر المحلات في منطقتك - شلة",
    description: "اكتشف أشهر وأفضل المحلات والمطاعم في منطقتك. متاجر موثوقة ومقيمة من قبل العملاء مع توصيل سريع.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PopularStoresPageRoute() {
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<PopularStoresSlider isFullPage={true} />
			</div>
			<Shellafooter />
		</>
	);
}
