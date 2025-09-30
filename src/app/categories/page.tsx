import CategoriesSlider from "@/components/HomePage/CategoriesSlider";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { getCategoriesAction } from "@/lib/ServerAction/category";

type Category = {
	id: string;
	name: string;
	description?: string;
	image?: string;
};
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "أقسامنا - شلة",
	description:
		"تصفح جميع أقسام شلة: مطاعم، سوبرماركت، صيدليات، العناية بالحيوانات، هايبر شلة وأكثر. اكتشف أفضل المتاجر في كل قسم.",
	keywords:
		"أقسام شلة, مطاعم, سوبرماركت, صيدليات, العناية بالحيوانات, هايبر شلة, متاجر, تسوق",
	openGraph: {
		title: "أقسامنا - شلة",
		description:
			"تصفح جميع أقسام شلة: مطاعم، سوبرماركت، صيدليات، العناية بالحيوانات، هايبر شلة وأكثر. اكتشف أفضل المتاجر في كل قسم.",
		type: "website",
		locale: "ar_SA",
	},
	twitter: {
		card: "summary_large_image",
		title: "أقسامنا - شلة",
		description:
			"تصفح جميع أقسام شلة: مطاعم، سوبرماركت، صيدليات، العناية بالحيوانات، هايبر شلة وأكثر. اكتشف أفضل المتاجر في كل قسم.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function CategoriesPageRoute() {
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<CategoriesSlider
					isFullPage={true}
					getCategoriesAction={getCategoriesAction}
				/>
			</div>
			<Shellafooter />
		</>
	);
}
