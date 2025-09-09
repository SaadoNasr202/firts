"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { i18n } = useTranslation();

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setIsDropdownOpen(false);
	};

	return (
		<nav className="relative flex w-full flex-row items-center justify-between border-b bg-white px-6 py-2 shadow-sm">
			<div className="relative z-10">
				<button
					onClick={toggleDropdown}
					className="flex items-center gap-2 rounded-2xl border px-3 py-1 transition-colors duration-200 hover:bg-gray-100"
				>
					<ChevronDown className="text-green-600" size={22} />
					<span className="font-medium text-gray-800">
						{i18n.language === "ar" ? "العربية" : "English"}
					</span>
					<Image
						src={i18n.language === "ar" ? "/saudiflag.png" : "/logous.png"}
						alt="Flag"
						width={45}
						height={40}
						className="rounded-sm"
					/>
				</button>

				{isDropdownOpen && (
					<div className="absolute top-full right-0 z-20 mt-2 w-40 rounded-lg border bg-white py-2 shadow-lg">
						<div
							onClick={() => changeLanguage("ar")}
							className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
						>
							<span className="font-medium text-gray-800">العربية</span>
							<Image
								src="/saudiflag.png"
								alt="Saudi Flag"
								width={45}
								height={40}
								className="rounded-sm"
							/>
						</div>
						<div
							onClick={() => changeLanguage("en")}
							className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
						>
							<span className="font-medium text-gray-800">English</span>
							<Image
								src="/logous.png"
								alt="US Flag"
								width={45}
								height={40}
								className="rounded-sm"
							/>
						</div>
					</div>
				)}
			</div>
			<Image
				onClick={() => {
					window.location.href = "/";
				}}
				src="/shellalogo.png"
				alt="logo"
				width={0}
				height={0}
				sizes="100vw"
				className="w-32 object-contain sm:w-44 lg:w-52"
			/>
		</nav>
	);
}
