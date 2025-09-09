import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
	return (
		<nav className="flex w-full flex-row items-center justify-between border-b bg-white px-6 py-2 shadow-sm">
			{/* قسم اللغة */}
			<div className="flex items-center gap-2 rounded-2xl border px-3 py-1">
				<ChevronDown className="text-green-600" size={22} />
				<span className="font-medium text-gray-800">العربية</span>
				<Image
					src="/saudiflag.png"
					alt="Saudi Flag"
					width={45}
					height={40}
					className="rounded-sm"
				/>
			</div>

			{/* شعار شلة - تم تعديل الحجم ليكون متجاوبًا */}
			<Image
				src="/shellalogo.png"
				alt="logo"
				width={0}
				height={0}
				sizes="100vw"
				className="w-32 object-contain sm:w-44 lg:w-52 cursor-pointer"
			/>
		</nav>
	);
}
