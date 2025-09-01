// src/components/NavBarCondition.tsx
"use client";

import {
	ClipboardList,
	Globe,
	Home,
	Mail,
	MenuIcon,
	Search,
	ShoppingBag,
	User,
	X,
} from "lucide-react";
import { useState } from "react";

// Mobile menu component
const MobileMenu = ({ onClose }: { onClose: () => void }) => {
	return (
		<div className="fixed inset-0 z-50 flex flex-col bg-white p-4 shadow-lg md:hidden">
			<div className="flex justify-end">
				<button
					onClick={onClose}
					className="rounded-full p-2 text-gray-700 hover:bg-gray-100"
				>
					<X size={24} />
				</button>
			</div>
			<div className="relative mt-8 flex w-full items-center">
				<Search size={20} className="absolute right-4 text-gray-400" />
				<input
					type="text"
					placeholder="ابحث عن المتاجر أو المطاعم..."
					className="w-full rounded-2xl border bg-gray-100 py-2 pr-10 pl-4 text-right text-sm placeholder-gray-500 focus:outline-none"
				/>
			</div>
			<div className="mt-8 flex flex-col items-start gap-6">
				<div className="flex items-center gap-2 text-green-600">
					<Home size={22} />
					<span className="text-base font-bold">الرئيسية</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<ClipboardList size={22} className="text-gray-500" />
					<span className="text-base">طلباتي</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<ShoppingBag size={22} className="text-gray-500" />
					<span className="text-base">السلة</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<User size={22} className="text-gray-500" />
					<span className="text-base">تسجيل الدخول</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<Mail size={22} className="text-gray-500" />
					<span className="text-base">اتصل بنا</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<Globe size={22} className="text-gray-500" />
					<span className="text-base">عربية</span>
				</div>
			</div>
		</div>
	);
};

export default function NavBarCondition() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<nav className="flex w-full items-center justify-between border-b bg-white px-4 py-2 shadow-sm md:px-6">
				{/* Mobile Hamburger Menu Button */}
				<div className="md:hidden">
					<button
						onClick={() => setIsMenuOpen(true)}
						className="p-2 text-gray-700"
					>
						<MenuIcon size={24} />
					</button>
				</div>

				{/* Search Bar - Visible on all screens, but styled differently */}
				<div className="relative flex w-full items-center md:order-2 md:w-auto">
					<Search size={20} className="absolute right-4 text-gray-400" />
					<input
						type="text"
						placeholder="ابحث عن المتاجر أو المطاعم أو المنتجات الفريدة..."
						className="h-fit w-full rounded-2xl border bg-gray-100 py-2 pr-10 pl-4 text-right text-sm placeholder-gray-500 focus:outline-none md:w-96"
					/>
				</div>

				{/* Full-size Nav Links - Hidden on small screens */}
				<div className="hidden w-full flex-row-reverse items-center justify-between gap-4 md:order-1 md:flex md:w-auto">
					<div className="flex items-center gap-2 text-green-600">
						<Home size={22} />
						<span className="text-sm font-bold">الرئيسية</span>
					</div>
					<div className="flex items-center gap-2 text-gray-700">
						<ClipboardList size={22} className="text-gray-500" />
						<span className="text-sm">طلباتي</span>
					</div>
					<div className="flex items-center gap-2 text-gray-700">
						<ShoppingBag size={22} className="text-gray-500" />
						<span className="text-sm">السلة</span>
					</div>
					<div className="flex items-center gap-2 text-gray-700">
						<User size={22} className="text-gray-500" />
						<span className="text-sm">تسجيل الدخول</span>
					</div>
					<div className="flex items-center gap-2 text-gray-700">
						<Mail size={22} className="text-gray-500" />
						<span className="text-sm">اتصل بنا</span>
					</div>
					<div className="flex items-center gap-2 text-gray-700">
						<Globe size={22} className="text-gray-500" />
						<span className="text-sm">عربية</span>
					</div>
				</div>
			</nav>

			{/* Render MobileMenu if isMenuOpen is true */}
			{isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
		</>
	);
}
