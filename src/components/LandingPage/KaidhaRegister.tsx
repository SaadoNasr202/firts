"use client";

import { FormData } from "@/app/Kaidha/page";
import React, { useState } from "react";
// We will use inline SVG for the upload icon to avoid external dependencies.

// This is the main React component for the delivery driver registration form.
export default function KaidhaRegister({
	postFormKaidhaAction,
}: {
	postFormKaidhaAction: (formData: FormData) => Promise<{ success: boolean }>;
}) {
	// State to manage all form data based on the new image.
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		fatherName: "",
		grandFatherName: "",
		birthDate: "",
		nationality: "",
		socialStatus: "",
		familyMembersCount: "",
		idType: "",
		personalIdNumber: "",
		idExpirationDate: "",
		phoneNumber: "",
		whatsappNumber: "",
		email: "",
		homeType: "",
		homeNature: "",
		city: "",
		neighborhood: "",
		addressDetails: "",
		agreed: false,
		companyName: "",
		jobTitle: "",
		yearsOfExperience: "",
		grossSalary: "",
		workAddress: "",
	});
	// New state for map location
	const [mapLocation, setMapLocation] = useState({
		lat: 24.7136,
		lng: 46.6753,
	}); // Default to Riyadh

	const handleSumbit = async () => {
		const result  =await postFormKaidhaAction(InputField);
		if (result){
			console.log("true");
			
		}
		else {
			console.log("false");
			
		}
	}

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
		console.log("Map Location Submitted:", mapLocation);
		// يمكنك إضافة منطق إرسال البيانات إلى الخادم هنا
	};
	// Handle form reset, clearing all fields to their initial state.
	const handleReset = () => {
		setFormData({
			firstName: "",
			lastName: "",
			fatherName: "",
			grandFatherName: "",
			birthDate: "",
			nationality: "",
			socialStatus: "",
			familyMembersCount: "",
			idType: "",
			personalIdNumber: "",
			idExpirationDate: "",
			phoneNumber: "",
			whatsappNumber: "",
			email: "",
			homeType: "",
			homeNature: "",
			city: "",
			neighborhood: "",
			addressDetails: "",
			agreed: false,
			companyName: "",
			jobTitle: "",
			yearsOfExperience: "",
			grossSalary: "",
			workAddress: "",
		});
		setMapLocation({ lat: 24.7136, lng: 46.6753 });
	};

	// A reusable component for a single input field with RTL styling.
	const InputField = ({
		label,
		name,
		type,
		placeholder,
		value,
		onChange,
		required = true,
		icon,
	}: {
		label: string;
		name: string;
		type: string;
		placeholder: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		required?: boolean;
		icon?: string;
	}) => (
		<div className="flex flex-col">
			<label
				htmlFor={name}
				className="mb-2 text-right font-semibold text-gray-700"
			>
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
				required={required}
			/>
		</div>
	);

	// A reusable component for a select dropdown field.
	const SelectField = ({
		label,
		name,
		options,
		value,
		onChange,
		required = true,
	}: {
		label: string;
		name: string;
		options: { value: string; label: string }[];
		value: string;
		onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
		required?: boolean;
	}) => (
		<div className="flex flex-col">
			<label
				htmlFor={name}
				className="mb-2 text-right font-semibold text-gray-700"
			>
				{label}
			</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
				required={required}
			>
				<option value="">-- اختر --</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);

	// The main JSX structure for the form.
	return (
		<div className="w-full font-sans" dir="rtl">
			<form onSubmit={handleSubmit}>
				{/* Main Form Title Section based on the image */}
				<h2 className="mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
					المعلومات الشخصية
				</h2>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					{/* First Row of Inputs */}
					<InputField
						label="الاسم الأول"
						name="firstName"
						type="text"
						placeholder=""
						value={formData.firstName}
						onChange={handleChange}
					/>
					<InputField
						label="اسم العائلة"
						name="lastName"
						type="text"
						placeholder=""
						value={formData.lastName}
						onChange={handleChange}
					/>
					<InputField
						label="اسم الأب"
						name="fatherName"
						type="text"
						placeholder=""
						value={formData.fatherName}
						onChange={handleChange}
					/>
					<InputField
						label="اسم الجد"
						name="grandFatherName"
						type="text"
						placeholder=""
						value={formData.grandFatherName}
						onChange={handleChange}
					/>
					<InputField
						label="تاريخ الميلاد"
						name="birthDate"
						type="date"
						placeholder="MM/DD/YY"
						value={formData.birthDate}
						onChange={handleChange}
					/>
					<InputField
						label="الجنسية"
						name="nationality"
						type="text"
						placeholder="سعودي"
						value={formData.nationality}
						onChange={handleChange}
					/>

					{/* Second Row of Inputs */}
					<SelectField
						label="الحالة الاجتماعية"
						name="socialStatus"
						options={[
							{ value: "single", label: "أعزب" },
							{ value: "married", label: "متزوج" },
						]}
						value={formData.socialStatus}
						onChange={handleChange}
					/>
					<SelectField
						label="عدد أفراد الأسرة"
						name="familyMembersCount"
						options={[
							{ value: "1", label: "1" },
							{ value: "2", label: "2" },
							{ value: "3", label: "3" },
							{ value: "4", label: "4" },
							{ value: "5", label: "5" },
							{ value: "6", label: "6" },
							{ value: "7", label: "7" },
							{ value: "8", label: "8" },
							{ value: "9", label: "9" },
							{ value: "10+", label: "10+" },
						]}
						value={formData.familyMembersCount}
						onChange={handleChange}
					/>
					<SelectField
						label="نوع الهوية"
						name="idType"
						options={[
							{ value: "nationalId", label: "بطاقة هوية وطنية" },
							{ value: "passport", label: "جواز سفر" },
						]}
						value={formData.idType}
						onChange={handleChange}
					/>
					<InputField
						label="رقم الهوية"
						name="personalIdNumber"
						type="text"
						placeholder="001447888554"
						value={formData.personalIdNumber}
						onChange={handleChange}
					/>
					<InputField
						label="تاريخ الانتهاء"
						name="idExpirationDate"
						type="date"
						placeholder="MM/DD/YY"
						value={formData.idExpirationDate}
						onChange={handleChange}
					/>
					<InputField
						label="رقم الجوال"
						name="phoneNumber"
						type="tel"
						placeholder="+966"
						value={formData.phoneNumber}
						onChange={handleChange}
					/>

					{/* Third Row of Inputs */}
					<InputField
						label="رقم الواتساب"
						name="whatsappNumber"
						type="tel"
						placeholder="+966"
						value={formData.whatsappNumber}
						onChange={handleChange}
					/>
					<InputField
						label="بريد إلكتروني"
						name="email"
						type="email"
						placeholder="example@example.com"
						value={formData.email}
						onChange={handleChange}
					/>
					<SelectField
						label="نوع المنزل"
						name="homeType"
						options={[
							{ value: "villa", label: "فيلا" },
							{ value: "apartment", label: "شقة" },
						]}
						value={formData.homeType}
						onChange={handleChange}
					/>
					<SelectField
						label="طبيعة المنزل"
						name="homeNature"
						options={[
							{ value: "rent", label: "إيجار" },
							{ value: "ownership", label: "تملك" },
						]}
						value={formData.homeNature}
						onChange={handleChange}
					/>

					{/* Fourth Row of Inputs */}
					<InputField
						label="المدينة"
						name="city"
						type="text"
						placeholder="الرياض"
						value={formData.city}
						onChange={handleChange}
					/>
					<InputField
						label="الحي"
						name="neighborhood"
						type="text"
						placeholder="حي الغروب"
						value={formData.neighborhood}
						onChange={handleChange}
					/>
					<InputField
						label="العنوان التفصيلي للمنزل"
						name="addressDetails"
						type="text"
						placeholder="جدة، شارع 500 تفرع 2"
						value={formData.addressDetails}
						onChange={handleChange}
					/>
				</div>

				{/* Map Location Section */}
				<h2 className="mt-8 mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
					تحديد موقع السكن على الخريطة
				</h2>
				<div
					className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-200 p-4 text-center text-gray-500"
					style={{ height: "350px" }}
				>
					<p>هنا ستكون الخريطة</p>
				</div>

				{/* Job Information Section */}
				<h2 className="mt-8 mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
					معلومات العمل
				</h2>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					<InputField
						label="اسم الشركة"
						name="companyName"
						type="text"
						placeholder=""
						value={formData.companyName}
						onChange={handleChange}
					/>
					<InputField
						label="المسمى الوظيفي"
						name="jobTitle"
						type="text"
						placeholder=""
						value={formData.jobTitle}
						onChange={handleChange}
					/>
					<InputField
						label="عدد سنين العمل"
						name="yearsOfExperience"
						type="text"
						placeholder=""
						value={formData.yearsOfExperience}
						onChange={handleChange}
					/>
					<InputField
						label="إجمالي الراتب"
						name="grossSalary"
						type="text"
						placeholder=""
						value={formData.grossSalary}
						onChange={handleChange}
					/>
					<InputField
						label="العنوان التفصيلي للعمل"
						name="workAddress"
						type="text"
						placeholder="جدة، شارع 500 تفرع 2"
						value={formData.workAddress}
						onChange={handleChange}
					/>
				</div>

				{/* Additional Income and Installment Section */}

				{/* Map Location Section */}
				<h2 className="mt-8 mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
					تحديد موقع العمل على الخريطة
				</h2>
				<div
					className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-200 p-4 text-center text-gray-500"
					style={{ height: "350px" }}
				>
					<p>هنا ستكون الخريطة</p>
				</div>

				<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					{/* First row of additional income */}
					<div className="col-span-1 flex flex-col items-start gap-2 pt-5 md:col-span-2 lg:col-span-4">
						<div className="text-left text-xl font-semibold text-gray-700">
							هل لديك أقساط ؟
						</div>
						<button className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500">
							إضافة قسط
						</button>
					</div>

					<div className="col-span-1 grid grid-cols-1 items-end gap-x-8 gap-y-6 sm:grid-cols-3 md:col-span-2 lg:col-span-4">
						<InputField
							label="مبلغ الالتزام"
							name="commitmentAmount"
							type="text"
							placeholder=""
							value=""
							onChange={() => {}}
							required={false}
						/>
						<InputField
							label="اسم الجهة"
							name="entityName"
							type="text"
							placeholder=""
							value=""
							onChange={() => {}}
							required={false}
						/>
						{/* The remove button is now inside the new grid container */}
						<button className="w-25 rounded-lg bg-[#BC7620] px-4 py-3 font-semibold text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-400">
							إزالة
						</button>
					</div>

					{/* Second row of additional income */}
					<div className="col-span-1 flex flex-col items-start gap-2 pt-5 md:col-span-2 lg:col-span-4">
						<div className="text-left text-xl font-semibold text-gray-700">
							مصادر دخل إضافية
						</div>
						<button className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500">
							إضافة مصدر عمل آخر
						</button>
					</div>

					<div className="col-span-1 grid grid-cols-1 items-end gap-x-8 gap-y-6 sm:grid-cols-3 md:col-span-2 lg:col-span-4">
						<InputField
							label="المبلغ"
							name="additionalAmount"
							type="text"
							placeholder=""
							value=""
							onChange={() => {}}
							required={false}
						/>
						<InputField
							label="جهة الدخل"
							name="incomeSource"
							type="text"
							placeholder=""
							value=""
							onChange={() => {}}
							required={false}
						/>
						{/* The remove button is now inside the new grid container and has a fixed width */}
						<button className="w-25 rounded-lg bg-[#BC7620] px-4 py-3 font-semibold text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-400">
							إزالة
						</button>
					</div>
				</div>
				

				{/* الأزرار تتحول من مكدسة إلى صف على الشاشات الصغيرة */}
				<div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
					<button
					onClick={handleSumbit}
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
		</div>
	);
}
