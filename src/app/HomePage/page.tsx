import HomePage from "@/components/HomePage/HomePage";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Suspense } from "react";

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
				<HomePage />
			</Suspense>
			<Shellafooter />
		</>
	);
}
