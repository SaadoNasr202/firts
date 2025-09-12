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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileMenu = ({
	onClose,
	activeTab,
	setActiveTab,
}: {
	onClose: () => void;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}) => {
	const handleClick = (tab: string, href: string) => {
		setActiveTab(tab);
		window.location.href = href;
		onClose();
	};

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
				<button
					onClick={() => handleClick("home", "/")}
					className={`flex items-center gap-2 ${
						activeTab === "home"
							? "text-green-600"
							: "text-gray-700 hover:text-green-600"
					}`}
				>
					<Home size={22} />
					<span className="text-base font-bold">الرئيسية</span>
				</button>
				<button
					onClick={() => handleClick("orders", "/orders")}
					className={`flex items-center gap-2 ${
						activeTab === "orders"
							? "text-green-600"
							: "text-gray-700 hover:text-green-600"
					}`}
				>
					<ClipboardList size={22} />
					<span className="text-base">طلباتي</span>
				</button>
				<button
					onClick={() => handleClick("cart", "/cart")}
					className={`flex items-center gap-2 ${
						activeTab === "cart"
							? "text-green-600"
							: "text-gray-700 hover:text-green-600"
					}`}
				>
					<ShoppingBag size={22} />
					<span className="text-base">السلة</span>
				</button>
				<button
					onClick={() => handleClick("login", "/profile")}
					className={`flex items-center gap-2 ${
						activeTab === "login"
							? "text-green-600"
							: "text-gray-700 hover:text-green-600"
					}`}
				>
					<User size={22} />
					<span className="text-base">تسجيل الدخول</span>
				</button>
				<button
					onClick={() => handleClick("contact", "/contact")}
					className={`flex items-center gap-2 ${
						activeTab === "contact"
							? "text-green-600"
							: "text-gray-700 hover:text-green-600"
					}`}
				>
					<Mail size={22} />
					<span className="text-base">اتصل بنا</span>
				</button>
				<button
					onClick={() => handleClick("language", "/")}
					className={`flex items-center gap-2 ${
						activeTab === "language"
							? "text-green-600"
							: "text-gray-700 hover:text-green-600"
					}`}
				>
					<Globe size={22} />
					<span className="text-base">عربية</span>
				</button>
			</div>
		</div>
	);
};

export default function NavBarCondition() {
	const pathname = usePathname();
	const [activeTab, setActiveTab] = useState("");
	const [showAterms, setShowAterms] = useState(false);

	useEffect(() => {
		if (pathname.startsWith("/profile")) setActiveTab("login");
		else if (pathname.startsWith("/cart")) setActiveTab("cart");
		else if (pathname.startsWith("/orders")) setActiveTab("orders");
		else setActiveTab("home");
	}, [pathname]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleClick = (tab: string, href: string) => {
		setActiveTab(tab);
		window.location.href = href;
	};

	return (
		<>
			<nav className="flex w-full items-center justify-between border-b bg-white px-4 py-2 shadow-sm md:px-6">
				<div className="md:hidden">
					<button
						onClick={() => setIsMenuOpen(true)}
						className="rounded-full p-2 text-gray-700 hover:bg-gray-100"
					>
						<MenuIcon size={24} />
					</button>
				</div>

				<div className="relative flex w-full items-center md:order-2 md:w-auto">
					<Search size={20} className="absolute right-4 text-gray-400" />
					<input
						type="text"
						placeholder="ابحث عن المتاجر أو المطاعم أو المنتجات الفريدة..."
						className="h-fit w-full rounded-2xl border bg-gray-100 py-2 pr-10 pl-4 text-right text-sm placeholder-gray-500 focus:outline-none md:w-96"
					/>
				</div>

				<div className="hidden w-full flex-row-reverse items-center justify-between gap-4 md:order-1 md:flex md:w-auto">
					<button
						onClick={() => handleClick("home", "/HomePage")}
						className={`flex items-center gap-2 ${
							activeTab === "home"
								? "text-green-600"
								: "text-gray-700 hover:text-green-600"
						}`}
					>
						<Home size={22} />
						<span className="text-sm font-bold">الرئيسية</span>
					</button>
					<button
						onClick={() => handleClick("orders", "/orders")}
						className={`flex items-center gap-2 ${
							activeTab === "orders"
								? "text-green-600"
								: "text-gray-700 hover:text-green-600"
						}`}
					>
						<ClipboardList size={22} />
						<span className="text-sm">طلباتي</span>
					</button>
					<button
						onClick={() => handleClick("cart", "/cart")}
						className={`flex items-center gap-2 ${
							activeTab === "cart"
								? "text-green-600"
								: "text-gray-700 hover:text-green-600"
						}`}
					>
						<ShoppingBag size={22} />
						<span className="text-sm">السلة</span>
					</button>
					<button
						onClick={() => handleClick("login", "/profile")}
						className={`flex items-center gap-2 ${
							activeTab === "login"
								? "text-green-600"
								: "text-gray-700 hover:text-green-600"
						}`}
					>
						<User size={22} />
						<span className="text-sm">تسجيل الدخول</span>
					</button>
					<button
						onClick={() => setShowAterms(true)}
						className={`flex items-center gap-2 ${
							activeTab === "contact"
								? "text-green-600"
								: "text-gray-700 hover:text-green-600"
						}`}
					>
						<Mail size={22} />
						<span className="text-sm">اتصل بنا</span>
					</button>

					<button
						onClick={() => handleClick("language", "/")}
						className={`flex items-center gap-2 ${
							activeTab === "language"
								? "text-green-600"
								: "text-gray-700 hover:text-green-600"
						}`}
					>
						<Globe size={22} />
						<span className="text-sm">عربية</span>
					</button>
				</div>
			</nav>

			{isMenuOpen && (
				<MobileMenu
					onClose={() => setIsMenuOpen(false)}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			)}
		</>
	);
}
