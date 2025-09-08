import { useState } from "react";

// لتحديد نوع بيانات القسيمة
interface Voucher {
	title: string;
	subtitle: string;
	details: string[];
	expirationDate: string;
}

const vouchers: Voucher[] = [
	{
		title: "30 % خصم",
		subtitle: "بدون حد أدنى",
		details: [
			"خصم 50% وفر حتى 20 رس",
			"طلبات التوصيل فقط",
			"خصم يصل إلى 20 رس",
		],
		expirationDate: "صالح حتى 20/3/2025 11:59 م",
	},
	{
		title: "30 % خصم",
		subtitle: "بدون حد أدنى",
		details: [
			"خصم 50% وفر حتى 20 رس",
			"طلبات التوصيل فقط",
			"خصم يصل إلى 20 رس",
		],
		expirationDate: "صالح حتى 20/3/2025 11:59 م",
	},
	{
		title: "30 % خصم",
		subtitle: "بدون حد أدنى",
		details: [
			"خصم 50% وفر حتى 20 رس",
			"طلبات التوصيل فقط",
			"خصم يصل إلى 20 رس",
		],
		expirationDate: "صالح حتى 20/3/2025 11:59 م",
	},
	{
		title: "30 % خصم",
		subtitle: "بدون حد أدنى",
		details: [
			"خصم 50% وفر حتى 20 رس",
			"طلبات التوصيل فقط",
			"خصم يصل إلى 20 رس",
		],
		expirationDate: "صالح حتى 20/3/2025 11:59 م",
	},
	{
		title: "30 % خصم",
		subtitle: "بدون حد أدنى",
		details: [
			"خصم 50% وفر حتى 20 رس",
			"طلبات التوصيل فقط",
			"خصم يصل إلى 20 رس",
		],
		expirationDate: "صالح حتى 20/3/2025 11:59 م",
	},
	{
		title: "30 % خصم",
		subtitle: "بدون حد أدنى",
		details: [
			"خصم 50% وفر حتى 20 رس",
			"طلبات التوصيل فقط",
			"خصم يصل إلى 20 رس",
		],
		expirationDate: "صالح حتى 20/3/2025 11:59 م",
	},
];

export default function MyVouchers() {
	const [activeTab, setActiveTab] = useState("available");

	return (
		<div className="flex flex-col rounded-xl p-4 md:p-8">
			{/* Tabs for Available and Expired Vouchers */}
			<div className="mb-6 flex w-full flex-row-reverse items-center justify-start gap-4 text-right">
				<button
					onClick={() => setActiveTab("available")}
					className={`w-1/2 border-b-2 py-2 text-lg font-bold transition-colors ${
						activeTab === "available"
							? "border-green-500 text-green-500"
							: "border-transparent text-gray-500 hover:text-gray-700"
					}`}
				>
					المتاحة
				</button>
				<button
					onClick={() => setActiveTab("expired")}
					className={`w-1/2 border-b-2 py-2 text-lg font-bold transition-colors ${
						activeTab === "expired"
							? "border-green-500 text-green-500"
							: "border-transparent text-gray-500 hover:text-gray-700"
					}`}
				>
					منتهية الصلاحية
				</button>
			</div>

			{/* Voucher Cards List with Separator */}
			<div className="flex flex-col">
				{vouchers.map((voucher, index) => (
					<div
						key={index}
						className="relative flex flex-row-reverse items-center justify-between rounded-none border-b border-gray-200 bg-white p-4 last:border-b-0"
					>
						{/* Right side (green section in the image) */}
						<div
							className={`relative flex w-1/3 flex-col items-end gap-1 p-4 text-right ${activeTab === "expired" ? "bg-gray-100 text-gray-600" : "bg-green-50 text-green-600"} after:absolute after:top-0 after:left-0 after:h-full after:w-[2px] after:bg-gray-200 after:content-['']`}
						>
							<span
								className={`text-xl font-bold ${
									activeTab === "expired" ? "text-gray-600" : "text-green-600"
								}`}
							>
								{voucher.title}
							</span>
							<span className="text-sm font-medium">{voucher.subtitle}</span>
						</div>

						{/* Left side (white section in the image) */}
						<div className="flex w-2/3 flex-col items-end gap-2 text-right">
							{/* Details and Expiration */}
							<div className="flex flex-col items-end gap-1">
								{voucher.details.map((detail, i) => (
									<span
										key={i}
										className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700"
									>
										{detail}
									</span>
								))}
							</div>
							<span className="mt-2 text-xs text-gray-500">
								{voucher.expirationDate}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
