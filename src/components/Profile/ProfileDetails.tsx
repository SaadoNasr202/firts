"use client";

import { useEffect, useState } from "react";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";

interface UserData {
	fullName: string;
	phoneNumber: string;
	birthDate: string;
	email: string;
}

export default function ProfileDetails() {
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				const res = await fetch("/api/user");
				const data = await res.json();
				setUser(data);
			} catch (error) {
				console.error("Failed to fetch user:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchUser();
	}, []);

	if (loading) return <div className="p-8 text-center">جارٍ التحميل...</div>;
	if (!user)
		return (
			<div className="p-8 text-center text-red-500">المستخدم غير موجود</div>
		);

	// جهزنا بيانات العرض
	const profileInfo = [
		{ label: "الاسم بالكامل", value: user.fullName },
		{ label: "رقم الهاتف", value: user.phoneNumber },
		{
			label: "تاريخ الميلاد",
			value: user.birthDate
				? new Date(user.birthDate).toLocaleDateString("ar-EG", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})
				: "غير محدد",
		},
		{ label: "البريد الالكتروني", value: user.email },
		{ label: "كلمة المرور", value: "********" }, // لا تعرض كلمة المرور الحقيقية
	];

	console.log("birth", user.birthDate);

	return (
		<div className="flex flex-col">
			<h2 className="mb-8 text-right text-2xl font-bold text-gray-800">
				تفاصيل الحساب
			</h2>
			<div className="rounded-lg bg-white shadow-sm">
				<div className="border-b border-gray-200 p-6">
					<div className="flex flex-row items-center text-right">
						<FaUserCircle className="mr-4 text-6xl text-gray-300" />
						<div className="flex flex-col">
							<span className="text-sm text-gray-500">الاسم بالكامل</span>
							<span className="text-lg font-semibold text-gray-900">
								{user.fullName}
							</span>
						</div>
					</div>
				</div>
				<div className="space-y-4 p-6">
					{profileInfo.map((item, index) => (
						<div
							key={index}
							className="flex flex-row items-center justify-between border-b border-gray-200 pb-4"
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
