"use client";

import React, { useState } from "react";

export default function InvestoreForm() {
	// حالة لتخزين بيانات النموذج (Form)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		city: "",
		phoneNumber: "",
		nationality: "",
		investmentAmount: "",
		background: "",
		agreed: false,
	});

	// دالة للتعامل مع تغييرات الحقول
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name } = e.target;
		// استخدام حارس النوع للتحقق من نوع العنصر قبل الوصول إلى الخاصية
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

	// دالة للتعامل مع إرسال النموذج (Form)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
		// يمكنك إضافة منطق إرسال البيانات إلى الخادم هنا
	};

	// دالة لإعادة ضبط النموذج (Form)
	const handleReset = () => {
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			city: "",
			phoneNumber: "",
			nationality: "",
			investmentAmount: "",
			background: "",
			agreed: false,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			onReset={handleReset}
			className="rtl mx-auto w-full space-y-6 text-right" 
		>
			{/* عنوان النموذج الرئيسي */}

			{/* حقول الإدخال في تخطيط من عمودين */}
			{/* يتحول من عمود واحد على الشاشات الصغيرة إلى عمودين على الشاشات المتوسطة */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* الاسم الاول */}
				<div className="space-y-2">
					<label
						htmlFor="firstName"
						className="block text-sm font-semibold text-gray-700"
					>
						الاسم الاول
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						placeholder="الرجاء ادخال الاسم الاول"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						dir="rtl" // تم إضافة هذه الخاصية
						required
					/>
				</div>

				{/* الاسم الاخير */}
				<div className="space-y-2">
					<label
						htmlFor="lastName"
						className="block text-sm font-semibold text-gray-700"
					>
						الاسم الاخير
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						placeholder="الرجاء ادخال الاسم الاخير"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						dir="rtl" // تم إضافة هذه الخاصية
						required
					/>
				</div>

				{/* البريد الالكتروني */}
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="block text-sm font-semibold text-gray-700"
					>
						البريد الالكتروني
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="example@example.com"
						value={formData.email}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						dir="rtl" // تم إضافة هذه الخاصية
						required
					/>
				</div>

				{/* مدينة الاقامة */}
				<div className="space-y-2">
					<label
						htmlFor="city"
						className="block text-sm font-semibold text-gray-700"
					>
						مدينة الاقامة
					</label>
					<select
						id="city"
						name="city"
						value={formData.city}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						dir="rtl" // تم إضافة هذه الخاصية
						required
					>
						<option value="">السعودية</option>
						{/* يمكنك إضافة المزيد من الخيارات هنا */}
					</select>
				</div>

				{/* رقم الهاتف */}
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
							placeholder="55xxxxxxx"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 pr-14 text-right shadow-sm focus:border-green-500 focus:ring-green-500"
							dir="rtl" // تم إضافة هذه الخاصية
							required
						/>
						<span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-500">
							+966 🇸🇦
						</span>
					</div>
				</div>

				{/* الجنسية */}
				<div className="space-y-2">
					<label
						htmlFor="nationality"
						className="block text-sm font-semibold text-gray-700"
					>
						الجنسية
					</label>
					<select
						id="nationality"
						name="nationality"
						value={formData.nationality}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						dir="rtl" // تم إضافة هذه الخاصية
						required
					>
						<option value="">السعودية</option>
						{/* يمكنك إضافة المزيد من الخيارات هنا */}
					</select>
				</div>

				{/* نبذة عن خلفيتك العلمية وخبراتك (حقل نصي كبير) */}
				<div className="space-y-2 md:col-span-2">
					<label
						htmlFor="background"
						className="block text-sm font-semibold text-gray-700"
					>
						نبذة عن خلفيتك العلمية وخبراتك
					</label>
					<textarea
						id="background"
						name="background"
						rows={4}
						placeholder="اكتب هنا"
						value={formData.background}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						dir="rtl" // تم إضافة هذه الخاصية
						required
					></textarea>
				</div>

				{/* المبلغ المراد الاستثمار فيه */}
				<div className="space-y-2 md:col-span-2">
					<label
						htmlFor="investmentAmount"
						className="block text-sm font-semibold text-gray-700"
					>
						المبلغ المراد الاستثمار فيه
					</label>
					<input
						type="text"
						id="investmentAmount"
						name="investmentAmount"
						placeholder="10000SAR"
						value={formData.investmentAmount}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
						dir="rtl" // تم إضافة هذه الخاصية
						required
					/>
				</div>
			</div>

			{/* قسم المعلومات الإضافية والموافقة */}
			<div className="mt-8 flex items-center justify-end space-x-2 space-x-reverse">
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

			{/* الأزرار تتحول من مكدسة إلى صف على الشاشات الصغيرة */}
			<div className="mt-8 flex flex-col justify-start gap-4 sm:flex-row">
				<button
					type="submit"
					className="w-full rounded-lg bg-green-500 px-10 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
				>
					إرسال
				</button>
				<button
					type="button"
					onClick={handleReset}
					className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 font-semibold text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none sm:w-auto"
				>
					إعادة ضبط
				</button>
			</div>
		</form>
	);
}
