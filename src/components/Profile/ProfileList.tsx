// src/components/ProfileList.tsx
"use client";

import { MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import ProfileDetails from "./ProfileDetails";
import SavedAddress from "./SavedAddress";
import Sidebar from "./Sidebar";

const OtherPage = ({ title }: { title: string }) => (
	<div className="p-8 text-center text-3xl font-bold text-gray-500">
		{title}
	</div>
);
export default function ProfileList() {
	const router = useRouter();
	const [activePage, setActivePage] = useState("معلومات الحساب");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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

	// التحقق من حالة تسجيل الدخول
	useEffect(() => {
		async function checkLoginStatus() {
			try {
				// إعطاء وقت أكثر للجلسة لتسجل في الكوكيز
				await new Promise(resolve => setTimeout(resolve, 100));
				
				const response = await fetch("/api/is_logged_in");
				console.log("🔍 Profile: Response status:", response.status);

				const data = await response.json();
				console.log("🔍 Profile: Response data:", data);

				if (data.isLoggedIn) {
					console.log("✅ Profile: User is logged in, showing profile");
					setIsLoading(false);
				} else {
					console.log("❌ Profile: User not logged in, redirecting to login");
					router.push("/login");
				}
			} catch (error) {
				console.error("💥 Profile: Login check failed:", error);
				router.push("/login");
			}
		}

		checkLoginStatus();
	}, [router]);

	// وظيفة تسجيل الخروج
	const handleLogout = async () => {
		if (isLoggingOut) return; // منع الضغط المتعدد
		
		// تأكيد تسجيل الخروج
		const confirmLogout = window.confirm("هل أنت متأكد من تسجيل الخروج؟");
		if (!confirmLogout) return;
		
		setIsLoggingOut(true);
		
		try {
			const response = await fetch("/api/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				console.log("✅ تم تسجيل الخروج بنجاح");
				// إعادة توجيه إلى صفحة تسجيل الدخول
				router.push("/login");
			} else {
				console.error("❌ فشل في تسجيل الخروج");
				// حتى لو فشل، نوجه المستخدم لصفحة تسجيل الدخول
				router.push("/login");
			}
		} catch (error) {
			console.error("❌ خطأ في تسجيل الخروج:", error);
			// في حالة الخطأ، نوجه المستخدم لصفحة تسجيل الدخول
			router.push("/login");
		} finally {
			setIsLoggingOut(false);
		}
	};

	// إذا كان يتم تسجيل الخروج، عرض شاشة تحميل
	if (isLoggingOut) {
		return (
			<div className="flex h-screen items-center justify-center bg-gray-100">
				<div className="flex flex-col items-center">
					<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-red-500"></div>
					<p className="mt-4 text-lg text-gray-600">جاري تسجيل الخروج...</p>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-gray-100">
				<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
			</div>
		);
	}

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
					<Sidebar 
						activePage={activePage} 
						setActivePage={setActivePage} 
						onLogout={handleLogout}
					/>
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
								onLogout={handleLogout}
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
