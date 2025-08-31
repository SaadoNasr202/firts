import { FaChevronDown, FaUserCircle } from "react-icons/fa";

interface ProfileInfo {
	label: string;
	value: string;
}

const profileInfo: ProfileInfo[] = [
	{ label: "الاسم بالكامل", value: "نورا أحمد" },
	{ label: "رقم الهاتف", value: "009626544884" },
	{ label: "تاريخ الميلاد", value: "12/12/1990" },
	{ label: "البريد الالكتروني", value: "Malini@mailito.com" },
	{ label: "كلمة المرور", value: "********" },
];

export default function ProfileDetails() {
	return (
		<div className="flex flex-col">
			<h2 className="mb-8 text-right text-2xl font-bold text-gray-800">
				تفاصيل الحساب
			</h2>
			<div className="rounded-lg bg-white shadow-sm">
				<div className="border-b border-gray-200 p-6">
					<div className="flex flex-row-reverse items-center text-right">
						<FaUserCircle className="mr-4 text-6xl text-gray-300" />
						<div className="flex flex-col">
							<span className="text-sm text-gray-500">الاسم بالكامل</span>
							<span className="text-lg font-semibold text-gray-900">
								نورا أحمد
							</span>
						</div>
					</div>
				</div>
				<div className="space-y-4 p-6">
					{profileInfo.map((item, index) => (
						<div
							key={index}
							// Added flex-row-reverse to change direction
							className="flex flex-row-reverse items-center justify-between border-b border-gray-200 pb-4"
						>
							<div className="flex flex-col text-right">
								<span className="text-sm text-gray-500">{item.label}</span>
								<span className="font-medium text-gray-900">{item.value}</span>
							</div>
							<FaChevronDown className="text-gray-400" />
						</div>
					))}
				</div>
				<div className="p-6 pt-0">
					<button className="w-full rounded-md bg-[#31A342] py-3 font-bold text-white transition-colors hover:bg-red-700">
						حذف الحساب
					</button>
				</div>
			</div>
		</div>
	);
}
