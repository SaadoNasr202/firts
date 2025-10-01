import StorePage from "@/components/HomePage/StorePage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";
import { StoreRoutePageProps } from "@/lib/api";
import { Suspense } from "react";

// interfaces imported from src/lib/api

export async function generateMetadata({ params }: StoreRoutePageProps): Promise<Metadata> {
	const storeName = decodeURIComponent(params.storeName);
	
	return {
		title: `${storeName} - شلة`,
		description: `تصفح منتجات ${storeName} واستمتع بأفضل العروض والخصومات. توصيل سريع وموثوق إلى باب منزلك.`,
		keywords: `متجر, ${storeName}, منتجات, عروض, خصومات, توصيل سريع, تسوق`,
		openGraph: {
			title: `${storeName} - شلة`,
			description: `تصفح منتجات ${storeName} واستمتع بأفضل العروض والخصومات. توصيل سريع وموثوق إلى باب منزلك.`,
			type: "website",
			locale: "ar_SA",
		},
		twitter: {
			card: "summary_large_image",
			title: `${storeName} - شلة`,
			description: `تصفح منتجات ${storeName} واستمتع بأفضل العروض والخصومات. توصيل سريع وموثوق إلى باب منزلك.`,
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

export default function StorePageRoute({ params, searchParams }: StoreRoutePageProps) {
	const storeName = decodeURIComponent(params.storeName);
	
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<Suspense fallback={null}>
					<StorePage 
						storeName={storeName}
						category={searchParams.category}
						source={searchParams.source}
					/>
				</Suspense>
			</div>
			<Shellafooter />
		</>
	);
}
