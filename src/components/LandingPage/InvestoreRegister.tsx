// src/components/InvestoreForm.tsx
"use client";

import { InvestoreFormData } from "@/app/invstore/page";
import React, { useState } from "react";

// مكون الإشعارات
const Notification = ({ message, type, isVisible, onClose }: {
	message: string;
	type: 'success' | 'error';
	isVisible: boolean;
	onClose: () => void;
}) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
			<div className={`relative p-4 rounded-lg shadow-lg max-w-sm w-full mx-4 transition-all duration-300 ${
				type === 'success' 
					? 'bg-green-500 text-white' 
					: 'bg-red-500 text-white'
			}`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{type === 'success' ? (
							<svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
							</svg>
						) : (
							<svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
							</svg>
						)}
						<span className="font-medium text-sm sm:text-base">{message}</span>
					</div>
					<button
						onClick={onClose}
						className="ml-4 text-white hover:text-gray-200 flex-shrink-0"
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default function InvestoreForm({
  postInvestoreAction,
}: {
  postInvestoreAction: (formData: InvestoreFormData) => Promise<{ success: boolean; message?:string }>;
}) {
	const [formData, setFormData] = useState({
		first_name: "",
		father_name: "",
		family_name: "", 
		grandfather_name: "", 
		birth_date: "",
		national_id: "", 
		email: "",
		phone: "", 
		national_address_email: "", 
		region: "",
		iban: "", 
		bank_name: "",
		amount: "", 
		agreed: false, 
	});

	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	// State for notifications
	const [notification, setNotification] = useState({
		message: '',
		type: 'success' as 'success' | 'error',
		isVisible: false
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

	// التحقق من صحة النموذج
	const validateForm = () => {
		const requiredFields = [
			'first_name', 'father_name', 'family_name', 'grandfather_name', 'birth_date',
			'national_id', 'email', 'phone', 'national_address_email', 'region',
			'iban', 'bank_name', 'amount'
		];

		for (const field of requiredFields) {
			if (!formData[field as keyof typeof formData] || 
				(formData[field as keyof typeof formData] as string).trim() === '') {
				return {
					isValid: false,
					message: `يرجى ملء جميع الحقول المطلوبة`
				};
			}
		}

		if (!formData.agreed) {
			return {
				isValid: false,
				message: `يرجى الموافقة على الشروط والأحكام`
			};
		}

		return { isValid: true, message: '' };
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		// التحقق من صحة النموذج أولاً
		const validation = validateForm();
		if (!validation.isValid) {
			setNotification({
				message: validation.message,
				type: 'error',
				isVisible: true
			});
			return;
		}

		try {
			const response = await fetch(
				"https://shellafood.com/api/v1/investor/contract-pdf?pdf=1",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				},
			);

			if (!response.ok) {
				throw new Error("فشل إنشاء ملف PDF");
			}

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);
			setIsOpen(true); // افتح الـ Modal بعد جلب الملف
			
			// إظهار رسالة نجاح
			setNotification({
				message: 'تم إنشاء العقد بنجاح!',
				type: 'success',
				isVisible: true
			});
		} catch (error) {
			console.error("Error generating PDF:", error);
			// إظهار رسالة خطأ
			setNotification({
				message: 'حدث خطأ أثناء إنشاء العقد',
				type: 'error',
				isVisible: true
			});
		}
	};

	return (
		<div className="w-full space-y-8">
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
							htmlFor="first_name"
							className="block text-sm font-semibold text-gray-700"
						>
							الاسم الأول
						</label>
						<input
							type="text"
							id="first_name"
							name="first_name"
							placeholder="الاسم الأول"
							value={formData.first_name}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="father_name"
							className="block text-sm font-semibold text-gray-700"
						>
							اسم الأب
						</label>
						<input
							type="text"
							id="father_name"
							name="father_name"
							placeholder="اسم الأب"
							value={formData.father_name}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>

					{/* الصف الثاني */}
					<div className="space-y-2">
						<label
							htmlFor="family_name"
							className="block text-sm font-semibold text-gray-700"
						>
							اسم العائلة
						</label>
						<input
							type="text"
							id="family_name"
							name="family_name"
							placeholder="اسم العائلة"
							value={formData.family_name}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="grandfather_name"
							className="block text-sm font-semibold text-gray-700"
						>
							اسم الجد
						</label>
						<input
							type="text"
							id="grandfather_name"
							name="grandfather_name"
							placeholder="اسم الجد"
							value={formData.grandfather_name}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>

					{/* الصف الثالث */}
					<div className="space-y-2">
						<label
							htmlFor="birth_date"
							className="block text-sm font-semibold text-gray-700"
						>
							تاريخ الميلاد
						</label>
						<input
							type="date"
							id="birth_date"
							name="birth_date"
							value={formData.birth_date}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="national_id"
							className="block text-sm font-semibold text-gray-700"
						>
							رقم الهوية
						</label>
						<input
							type="text"
							id="national_id"
							name="national_id"
							placeholder="رقم الهوية"
							value={formData.national_id}
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
							htmlFor="phone"
							className="block text-sm font-semibold text-gray-700"
						>
							رقم الهاتف
						</label>
						<div className="relative">
							<input
								type="tel"
								id="phone"
								name="phone"
								placeholder="رقم الهاتف"
								value={formData.phone}
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
							htmlFor="national_address_email"
							className="block text-sm font-semibold text-gray-700"
						>
							البريد الإلكتروني حسب العنوان الوطني
						</label>
						<input
							type="email"
							id="national_address_email"
							name="national_address_email"
							placeholder="البريد الإلكتروني حسب العنوان الوطني"
							value={formData.national_address_email}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="region"
							className="block text-sm font-semibold text-gray-700"
						>
							المنطقة
						</label>
						<input
							type="text"
							id="region"
							name="region"
							placeholder="المنطقة"
							value={formData.region}
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
							htmlFor="bank_name"
							className="block text-sm font-semibold text-gray-700"
						>
							اسم البنك
						</label>
						<input
							type="text"
							id="bank_name"
							name="bank_name"
							placeholder="اسم البنك"
							value={formData.bank_name}
							onChange={handleChange}
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>

					{/* الصف السابع */}
					<div className="space-y-2">
						<label
							htmlFor="amount"
							className="block text-sm font-semibold text-gray-700"
						>
							المبلغ المراد استثماره
						</label>
						<input
							type="number"
							id="amount"
							name="amount"
							placeholder="المبلغ المراد استثماره"
							value={formData.amount}
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
						<a
							href="/CondtionAterms"
							className="font-medium text-green-600 hover:underline"
						>
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
				<div className="mt-8 flex justify-end">
					<button
						type="submit"
						className="w-full max-w-sm rounded-lg bg-white px-10 py-3 font-semibold text-[#31A342] shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
						style={{ border: "2px solid #31A342" }}
					>
						عرض العقد
					</button>
				</div>
			</form>

			{/* شاشة منبثقة لعرض PDF */}
			{isOpen && pdfUrl && (
				<div className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black">
					<div className="relative w-11/12 max-w-4xl rounded-lg bg-white p-4 shadow-lg">
						{/* زر إغلاق */}
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-2 left-2 rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
						>
							✕ إغلاق
						</button>

						<h2 className="mb-4 text-lg font-bold text-gray-700">
							 العقد
						</h2>

						<iframe
							src={pdfUrl}
							className="h-[600px] w-full rounded-md border"
						></iframe>
					</div>
				</div>
			)}

			{/* إشعارات */}
			<Notification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
			/>
		</div>
	);
}
