// src/components/ProfileList.tsx
"use client";

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import CondtionAterms from "../Condetion/CondtionAterms";
import HelpAndSupport from "../Condetion/HelpASupport";
import KaidhaTerms from "../Condetion/KaidhaTerms";
import PrivacyPolicy from "../Condetion/PrivacyPolicy";
import RefundPolicy from "../Condetion/RefundPolicy";
import Favorites from "../HomePage/Favorites";
import MyStats from "../HomePage/MyStats";
import KaidhaWallet from "./KaidhaWallet";
import MyPoints from "./MyPoints";
import MyVouchers from "./MyVouchers";
import MyWallet from "./MyWallet";
import NewAddress from "./NewAddress";
import ProfileDetails from "./ProfileDetails";
import SavedAddress from "./SavedAddress";
import Sidebar from "./Sidebar";

const OtherPage = ({ title }: { title: string }) => (
	<div className="p-8 text-center text-3xl font-bold text-gray-500">
		{title}
	</div>
);
export default function ProfileList() {
	const [activePage, setActivePage] = useState("معلومات الحساب");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const renderContent = () => {
		switch (activePage) {
			case "معلومات الحساب":
				return <ProfileDetails />;
			case "العناوين المحفوظة":
				return <SavedAddress setActivePage={setActivePage} />;
			case "عنوان جديد":
				return <NewAddress />;
			case "المفضلة لديك":
				return <Favorites />;
			case "إحصائياتي":
				return <MyStats />;
			case "محفظتي":
				return <MyWallet />;
			case "محفظة قيدها":
				return <KaidhaWallet />;
			case "سياسة الخصوصية":
				return <PrivacyPolicy />;
			case "الشروط قيدها":
				return <KaidhaTerms />;
			case "الشروط والأحكام":
				return <CondtionAterms />;
			case "المساعدة والدعم":
				return <HelpAndSupport />;
			case "سياسة الاسترداد":
				return <RefundPolicy />;
			case "نقاطي":
				return <MyPoints />;
			case "قسائمي":
				return <MyVouchers />;
			default:
				return <OtherPage title="المحتوى غير موجود" />;
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			{/* الكرت بالنص */}
			<div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-lg md:flex-row">
				{/* زر الهامبرغر للموبايل */}
				<div className="flex justify-center p-4 md:hidden">
					<button
						onClick={() => setIsSidebarOpen(true)}
						className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
					>
						<MenuIcon size={24} />
					</button>
				</div>

				{/* Sidebar Desktop (يسار) */}
				<div className="hidden w-[420px] border-r border-gray-200 bg-gray-50 px-6 py-8 md:block">
					<Sidebar activePage={activePage} setActivePage={setActivePage} />
				</div>

				{/* Sidebar Mobile Modal (يسار) */}
				{isSidebarOpen && (
					<>
						<div
							className="bg-opacity-50 fixed inset-0 z-40 bg-black md:hidden"
							onClick={() => setIsSidebarOpen(false)}
						></div>
						<div className="fixed top-0 left-0 z-50 max-h-full w-3/4 transform overflow-y-auto border-r border-gray-200 bg-gray-50 px-6 py-8 transition-transform">
							<button
								onClick={() => setIsSidebarOpen(false)}
								className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
							>
								<X size={24} />
							</button>
							<Sidebar
								activePage={activePage}
								setActivePage={(page) => {
									setActivePage(page);
									setIsSidebarOpen(false);
								}}
							/>
						</div>
					</>
				)}

				{/* المحتوى */}
				<div className="flex-1 p-4 md:p-8">{renderContent()}</div>
			</div>
		</div>
	);
}
