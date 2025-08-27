"use client";
import { ChevronDown, ClipboardList, Globe, Home, Mail, Search, ShoppingBag, User } from "lucide-react";

export default function NavBarCondition() {
	return (
		<nav className="flex w-full flex-col-reverse items-center justify-between border-b bg-white px-4 py-2 shadow-sm md:flex-row md:px-6">
			{/* الأيقونات على اليسار - الآن تظهر دائمًا */}
			<div className="flex w-full flex-row items-center justify-between gap-4 md:w-auto">
				<div className="flex items-center gap-2 text-gray-700">
					<Globe size={22} className="text-gray-500" />
					<span className="text-sm">عربية</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<Mail size={22} className="text-gray-500" />
					<span className="text-sm">اتصل بنا</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<User size={22} className="text-gray-500" />
					<span className="text-sm">تسجيل الدخول</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<ShoppingBag size={22} className="text-gray-500" />
					<span className="text-sm">السلة</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<ClipboardList size={22} className="text-gray-500" />
					<span className="text-sm">طلباتي</span>
				</div>
				<div className="flex items-center gap-2 text-green-600">
					<Home size={22} />
					<span className="text-sm font-bold">الرئيسية</span>
				</div>
			</div>

			{/* شريط البحث على اليمين */}
			<div className="my-2 flex w-full items-center gap-2 md:my-0 md:w-auto">
				<div className="relative flex w-full items-center">
					<Search size={20} className="absolute right-4 text-gray-400" />
					<input
						type="text"
						placeholder="ابحث عن المتاجر أو المطاعم أو المنتجات الفرادة..."
						className="w-full rounded-2xl border bg-gray-100 py-2 pl-4 pr-10 text-right text-sm placeholder-gray-500 focus:outline-none md:w-96"
					/>
				</div>
				<button className="hidden h-10 w-20 rounded-2xl border bg-gray-100 md:block"></button>
			</div>
		</nav>
	);
}