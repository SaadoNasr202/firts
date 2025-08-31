// src/components/InvestoreForm.tsx
"use client";

import React, { useState } from "react";

export default function InvestoreForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		fatherName: "",
		family: "",
		birthDate: "",
		email: "",
		nationalEmail: "",
		iban: "",
		grandfatherName: "",
		idNumber: "",
		phoneNumber: "",
		city: "",
		bankName: "",
		investmentAmount: "",
		agreed: false,
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name } = e.target;
		let value: string | boolean;

		if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
			value = e.target.checked;
		} else {
			value = e.target.value;
		}

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="rtl mx-auto w-full space-y-6 text-right"
			dir="rtl"
		>
			{/* شبكة حقلين في كل صف */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* الصف الأول */}
				<div className="space-y-2">
					<label
						htmlFor="firstName"
						className="block text-sm font-semibold text-gray-700"
					>
						الاسم الأول
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						placeholder="الاسم الأول"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="fatherName"
						className="block text-sm font-semibold text-gray-700"
					>
						اسم الأب
					</label>
					<input
						type="text"
						id="fatherName"
						name="fatherName"
						placeholder="اسم الأب"
						value={formData.fatherName}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>

				{/* الصف الثاني */}
				<div className="space-y-2">
					<label
						htmlFor="family"
						className="block text-sm font-semibold text-gray-700"
					>
						اسم العائلة
					</label>
					<input
						type="text"
						id="family"
						name="family"
						placeholder="اسم العائلة"
						value={formData.family}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="grandfatherName"
						className="block text-sm font-semibold text-gray-700"
					>
						اسم الجد
					</label>
					<input
						type="text"
						id="grandfatherName"
						name="grandfatherName"
						placeholder="اسم الجد"
						value={formData.grandfatherName}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>

				{/* الصف الثالث */}
				<div className="space-y-2">
					<label
						htmlFor="birthDate"
						className="block text-sm font-semibold text-gray-700"
					>
						تاريخ الميلاد
					</label>
					<input
						type="date"
						id="birthDate"
						name="birthDate"
						value={formData.birthDate}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="idNumber"
						className="block text-sm font-semibold text-gray-700"
					>
						رقم الهوية
					</label>
					<input
						type="text"
						id="idNumber"
						name="idNumber"
						placeholder="رقم الهوية"
						value={formData.idNumber}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>

				{/* الصف الرابع */}
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="block text-sm font-semibold text-gray-700"
					>
						البريد الإلكتروني
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="example@example.com"
						value={formData.email}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="phoneNumber"
						className="block text-sm font-semibold text-gray-700"
					>
						رقم الهاتف
					</label>
					<div className="relative">
						<input
							type="tel"
							id="phoneNumber"
							name="phoneNumber"
							placeholder="رقم الهاتف"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 pr-14 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
							dir="rtl"
						/>
						<span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-500">
							+966 🇸🇦
						</span>
					</div>
				</div>

				{/* الصف الخامس */}
				<div className="space-y-2">
					<label
						htmlFor="nationalEmail"
						className="block text-sm font-semibold text-gray-700"
					>
						البريد الإلكتروني حسب العنوان الوطني
					</label>
					<input
						type="email"
						id="nationalEmail"
						name="nationalEmail"
						placeholder="البريد الإلكتروني حسب العنوان الوطني"
						value={formData.nationalEmail}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="city"
						className="block text-sm font-semibold text-gray-700"
					>
						المنطقة
					</label>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="المنطقة"
						value={formData.city}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>

				{/* الصف السادس */}
				<div className="space-y-2">
					<label
						htmlFor="iban"
						className="block text-sm font-semibold text-gray-700"
					>
						رقم الآيبان
					</label>
					<input
						type="text"
						id="iban"
						name="iban"
						placeholder="رقم الآيبان"
						value={formData.iban}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="bankName"
						className="block text-sm font-semibold text-gray-700"
					>
						اسم البنك
					</label>
					<input
						type="text"
						id="bankName"
						name="bankName"
						placeholder="اسم البنك"
						value={formData.bankName}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>

				{/* الصف السابع */}
				<div className="space-y-2">
					<label
						htmlFor="investmentAmount"
						className="block text-sm font-semibold text-gray-700"
					>
						المبلغ المراد استثماره
					</label>
					<input
						type="number"
						id="investmentAmount"
						name="investmentAmount"
						placeholder="المبلغ المراد استثماره"
						value={formData.investmentAmount}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						required
					/>
				</div>
			</div>

			{/* الموافقة */}
			<div className="mt-8 flex items-center justify-start space-x-2 space-x-reverse">
				<label htmlFor="agreed" className="text-sm text-gray-600">
					الموافقة على جميع{" "}
					<a href="/CondtionAterms" className="font-medium text-green-600 hover:underline">
						الشروط والأحكام
					</a>
				</label>
				<input
					type="checkbox"
					id="agreed"
					name="agreed"
					checked={formData.agreed}
					onChange={handleChange}
					className="form-checkbox h-5 w-5 rounded-md border-gray-300 text-green-500 focus:ring-green-400"
					required
				/>
			</div>

			{/* زر الإرسال */}
			<div className="mt-8 flex justify-center">
				<button
					type="submit"
					className="w-full max-w-sm rounded-lg bg-white px-10 py-3 font-semibold text-[#31A342] shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
					style={{ border: "2px solid #31A342" }}
				>
					عرض مسودة العقد
				</button>
			</div>
		</form>
	);
}
