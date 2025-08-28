"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // استيراد أيقونة الإغلاق
import CondtionAterms from "./CondtionAterms";
import Favorites from "./Favorites";
import HelpAndSupport from "./HelpASupport";
import KaidhaTerms from "./KaidhaTerms";
import KaidhaWallet from "./KaidhaWallet";
import MyStats from "./MyStats";
import MyWallet from "./MyWallet";
import NewAddress from "./NewAddress";
import PrivacyPolicy from "./PrivacyPolicy";
import ProfileDetails from "./ProfileDetails";
import SavedAddress from "./SavedAddress";
import Sidebar from "./Sidebar";
import RefundPolicy from "./RefundPolicy";

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
			default:
				return <OtherPage title="المحتوى غير موجود" />;
		}
	};

	return (
		<div className="flex min-h-screen justify-center  bg-gray-100 p-4 md:p-8">
			<div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-lg md:flex-row-reverse">
				{/* زر فتح القائمة (يظهر فقط على الأجهزة الصغيرة) */}
				{/* زر فتح القائمة (يظهر فقط على الموبايل) */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className="fixed top-4 right-4 z-50 rounded-full bg-green-600 p-3 text-white shadow-lg md:hidden"
				>
					<FaBars size={22} />
				</button>

				{/* الشريط الجانبي للشاشات الكبيرة (يظهر فقط على md فما فوق) */}
				<div className="hidden w-[420px] border-l border-gray-200 bg-gray-50 px-6 py-8 md:block">
					<Sidebar activePage={activePage} setActivePage={setActivePage} />
				</div>

				{/* الشريط الجانبي للجوال (يظهر فقط عند isSidebarOpen) */}
				{isSidebarOpen && (
					<>
						{/* الغطاء الشفاف لإغلاق القائمة */}
						<div
							className="bg-opacity-50 fixed inset-0 z-40 bg-black md:hidden"
							onClick={() => setIsSidebarOpen(false)}
						></div>

						{/* قائمة الشريط الجانبي الفعلية */}
						<div className="fixed top-0 right-0 z-50 h-full w-3/4 border-l border-gray-200 bg-gray-50 px-6 py-8">
							<button
								onClick={() => setIsSidebarOpen(false)}
								className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
							>
								<FaTimes size={24} />
							</button>
							<Sidebar
								activePage={activePage}
								setActivePage={(page) => {
									setActivePage(page);
									setIsSidebarOpen(false); // إغلاق القائمة بعد الاختيار
								}}
							/>
						</div>
					</>
				)}

				<div className="flex-1 p-4 md:p-8">{renderContent()}</div>
			</div>
		</div>
	);
}
