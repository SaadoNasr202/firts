import CategoryStoresPage from "@/components/HomePage/CategoryStoresPage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
	params: {
		category: string;
	};
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const categoryName = decodeURIComponent(params.category);
	
	return {
		title: `${categoryName} - شلة`,
		description: `تصفح جميع المتاجر المتاحة في قسم ${categoryName}. اكتشف أفضل المتاجر والمطاعم مع توصيل سريع وموثوق.`,
		keywords: `متاجر ${categoryName}, مطاعم, سوبرماركت, صيدليات, توصيل سريع, متاجر متنوعة`,
		openGraph: {
			title: `${categoryName} - شلة`,
			description: `تصفح جميع المتاجر المتاحة في قسم ${categoryName}. اكتشف أفضل المتاجر والمطاعم مع توصيل سريع وموثوق.`,
			type: "website",
			locale: "ar_SA",
		},
		twitter: {
			card: "summary_large_image",
			title: `${categoryName} - شلة`,
			description: `تصفح جميع المتاجر المتاحة في قسم ${categoryName}. اكتشف أفضل المتاجر والمطاعم مع توصيل سريع وموثوق.`,
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

export default function CategoryStoresPageRoute({ params }: PageProps) {
	const categoryName = decodeURIComponent(params.category);
	
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<Suspense fallback={null}>
					<CategoryStoresPage 
						isFullPage={true} 
						categoryName={categoryName}
					/>
				</Suspense>
			</div>
			<Shellafooter />
		</>
	);
}
