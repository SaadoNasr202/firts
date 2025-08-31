"use client";

import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function DeliveryAgentForm()
 {
	const [formData, setFormData] = useState<{
		firstName: string;
		lastName: string;
		deliveryType: string;
		vehicleType: string;
		idType: string;
		personalIdNumber: string;
		email: string;
		region: string;
		idImage: File | null;
		agreed: boolean;
	}>({
		firstName: "",
		lastName: "",
		deliveryType: "",
		vehicleType: "",
		idType: "",
		personalIdNumber: "",
		email: "",
		region: "",
		idImage: null,
		agreed: false,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value, type, checked } = e.target as HTMLInputElement;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData((prevData) => ({
				...prevData,
				idImage: e.target.files![0],
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
		// يمكنك إضافة منطق إرسال البيانات إلى الخادم هنا
	};

	const handleReset = () => {
		setFormData({
			firstName: "",
			lastName: "",
			deliveryType: "",
			vehicleType: "",
			idType: "",
			personalIdNumber: "",
			email: "",
			region: "",
			idImage: null,
			agreed: false,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="h-full w-full p-4 md:p-8">
			{/* تم إضافة هذا السطر */}
			<h2 className="mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
				معلومات عامل التوصيل
			</h2>

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
				<div className="flex flex-col">
					<label
						htmlFor="firstName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						الاسم الأول
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						placeholder="أحمد"
						value={formData.firstName}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="lastName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						اسم العائلة
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						placeholder="خلف"
						value={formData.lastName}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="email"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						البريد الإلكتروني
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="ex@example.com"
						value={formData.email}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="deliveryType"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						نوع مندوب التوصيل
					</label>
					<select
						id="deliveryType"
						name="deliveryType"
						value={formData.deliveryType}
						onChange={handleChange as any}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					>
						<option value="">-- اختر --</option>
						<option value="freelancer">مستقل</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="region"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						المنطقة
					</label>
					<input
						type="text"
						id="region"
						name="region"
						placeholder="جدة"
						value={formData.region}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="vehicleType"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						نوع المركبة
					</label>
					<select
						id="vehicleType"
						name="vehicleType"
						value={formData.vehicleType}
						onChange={handleChange as any}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					>
						<option value="">-- اختر --</option>
						<option value="bike">دراجة نارية</option>
						<option value="car">سيارة</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="idType"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						نوع الهوية
					</label>
					<select
						id="idType"
						name="idType"
						value={formData.idType}
						onChange={handleChange as any}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					>
						<option value="">-- اختر --</option>
						<option value="passport">جواز سفر</option>
						<option value="nationalId">بطاقة هوية وطنية</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="personalIdNumber"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						رقم الهوية الشخصية
					</label>
					<input
						type="text"
						id="personalIdNumber"
						name="personalIdNumber"
						placeholder="EX: XXXXX-XXXXXXX-X"
						value={formData.personalIdNumber}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
			</div>
			<div className="mt-8">
				<label className="mb-2 block text-right font-semibold text-gray-700">
					تحميل صورة الهوية الشخصية
				</label>
				<div className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-300 hover:border-green-500">
					<input
						type="file"
						id="idImage"
						name="idImage"
						accept="image/*"
						onChange={handleFileChange}
						className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
						required
					/>
					<div className="flex flex-col items-center">
						<FaUpload className="mb-2 text-4xl text-gray-400" />
						<span className="text-gray-500">تحميل صورة الهوية الشخصية</span>
					</div>
				</div>
			</div>
			<div className="mt-8 flex items-center justify-start space-x-2 space-x-reverse">
				<label htmlFor="agreed" className="text-sm text-gray-600">
					الموافقة على جميع{" "}
					<a href="#" className="font-medium text-green-600 hover:underline">
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
			<div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-4">
  <button
    type="submit"
    className="w-full sm:w-auto px-10 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-300"
  >
    إرسال
  </button>
  <button
    type="button"
    onClick={handleReset}
    className="w-full sm:w-auto px-10 py-3 bg-white text-gray-500 font-semibold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
  >
    إعادة ضبط
  </button>
</div>
		</form>
	);
};

