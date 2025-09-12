"use client";

import { useState } from "react";

import KaidhaWallet from "./KaidhaWallet";

import CondtionAterms from "../Condetion/CondtionAterms";
import HelpAndSupport from "../Condetion/HelpASupport";
import KaidhaTerms from "../Condetion/KaidhaTerms";
import PrivacyPolicy from "../Condetion/PrivacyPolicy";
import RefundPolicy from "../Condetion/RefundPolicy";
import Favorites from "../HomePage/Favorites";
import MyStats from "../HomePage/MyStats";
import MyWallet from "./MyWallet";
import ProfileDetails from "./ProfileDetails";
import SavedAddress from "./SavedAddress";
import Sidebar from "./Sidebar";

// هذا مجرد مثال لصفحة أخرى
const OtherPage = ({ title }: { title: string }) => (
	<div className="p-8 text-center text-3xl font-bold text-gray-500">
		{title}
	</div>
);

export default function ProfileDashboard() {
	const [activePage, setActivePage] = useState("معلومات الحساب");

	const renderContent = () => {
		switch (activePage) {
			case "معلومات الحساب":
				return <ProfileDetails />;
			case "العناوين المحفوظة":
				return <SavedAddress setActivePage={setActivePage} />;

			case "المفضلة لديك":
				return <Favorites />;
			case "إحصائياتي":
				return <MyStats />;
			case "محفظتي":
				return <MyWallet />;
			case "محفظة قيدها":
				return <KaidhaWallet />;
			case "نقاطي":
				return <OtherPage title="صفحة نقاطي" />;
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
			default:
				return <OtherPage title="المحتوى غير موجود" />;
		}
	};

	return (
		<div className="flex min-h-screen justify-center bg-gray-100 p-8">
			<div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-lg md:flex-row-reverse">
				{/* الشريط الجانبي يظهر فقط على الشاشات المتوسطة والكبيرة */}
				<div className="hidden w-full border-l border-gray-200 bg-gray-50 px-6 py-8 md:block md:w-[420px]">
					<Sidebar activePage={activePage} setActivePage={setActivePage} />
				</div>

				<div className="flex-1 p-4 md:p-8">{renderContent()}</div>
			</div>
		</div>
	);
}
