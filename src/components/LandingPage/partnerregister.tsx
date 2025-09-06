"use client";

import { PartnerFormData } from "@/app/partner/page";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// مكون الإشعارات
const Notification = ({
	message,
	type,
	isVisible,
	onClose,
}: {
	message: string;
	type: "success" | "error";
	isVisible: boolean;
	onClose: () => void;
}) => {
	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="bg-opacity-50 absolute inset-0 bg-black"
				onClick={onClose}
			></div>
			<div
				className={`relative mx-4 w-full max-w-sm rounded-lg p-4 shadow-lg transition-all duration-300 ${
					type === "success"
						? "bg-green-500 text-white"
						: "bg-red-500 text-white"
				}`}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{type === "success" ? (
							<svg
								className="mr-2 h-5 w-5 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
							<svg
								className="mr-2 h-5 w-5 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
						)}
						<span className="text-sm font-medium sm:text-base">{message}</span>
					</div>
					<button
						onClick={onClose}
						className="ml-4 flex-shrink-0 text-white hover:text-gray-200"
					>
						<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default function StoreForm({
	postFormPartnerAction,
}: {
	postFormPartnerAction: (
		formData: PartnerFormData,
	) => Promise<{ success: boolean }>;
}) {
	const [formData, setFormData] = useState<{
		storeName: string;
		storeClassification: string;
		whatYourStoreOffers: string;
		city: string;
		branchCount: string;
		phoneNumber: string;
		englishStoreName: string;
		personalIdNumber: string;
		detailedAddress: string;
		agreed: boolean;
	}>({
		storeName: "",
		storeClassification: "",
		whatYourStoreOffers: "",
		city: "",
		branchCount: "",
		phoneNumber: "",
		englishStoreName: "",
		personalIdNumber: "",
		detailedAddress: "",
		agreed: false,
	});

	// State for notifications
	const [notification, setNotification] = useState({
		message: "",
		type: "success" as "success" | "error",
		isVisible: false,
	});

	// التحقق من صحة النموذج
	const validateForm = () => {
		const requiredFields = [
			"storeName",
			"storeClassification",
			"whatYourStoreOffers",
			"city",
			"branchCount",
			"phoneNumber",
			"englishStoreName",
			"personalIdNumber",
			"detailedAddress",
		];

		for (const field of requiredFields) {
			if (
				!formData[field as keyof typeof formData] ||
				(formData[field as keyof typeof formData] as string).trim() === ""
			) {
				return {
					isValid: false,
					message: `يرجى ملء جميع الحقول المطلوبة`,
				};
			}
		}

		if (!formData.agreed) {
			return {
				isValid: false,
				message: `يرجى الموافقة على الشروط والأحكام`,
			};
		}

		return { isValid: true, message: "" };
	};

	const handleSumbit = async () => {
		// التحقق من صحة النموذج أولاً
		const validation = validateForm();
		if (!validation.isValid) {
			setNotification({
				message: validation.message,
				type: "error",
				isVisible: true,
			});
			return;
		}

		try {
			const result = await postFormPartnerAction(formData);
			if (result.success) {
				setNotification({
					message: "تم تسجيل البيانات بنجاح!",
					type: "success",
					isVisible: true,
				});
				// إعادة تعيين النموذج بعد النجاح
				setTimeout(() => {
					handleReset();
				}, 2000);
			} else {
				setNotification({
					message: "حدث خطأ أثناء تسجيل البيانات",
					type: "error",
					isVisible: true,
				});
			}
		} catch (error) {
			setNotification({
				message: "حدث خطأ أثناء تسجيل البيانات",
				type: "error",
				isVisible: true,
			});
		}
	};
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value, type, checked } = e.target as HTMLInputElement;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
		// يمكنك إضافة منطق إرسال البيانات إلى الخادم هنا
	};

	const handleReset = () => {
		setFormData({
			storeName: "",
			storeClassification: "",
			whatYourStoreOffers: "",
			city: "",
			branchCount: "",
			phoneNumber: "",
			englishStoreName: "",
			personalIdNumber: "",
			detailedAddress: "",
			agreed: false,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<h2 className="mb-8 text-right text-2xl font-bold text-green-600">
				معلومات المتجر
			</h2>

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
				{/* Store Classification */}
				<div className="flex flex-col">
					<label
						htmlFor="storeClassification"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						تصنيف المتجر
					</label>
					<input
						type="text"
						id="storeClassification"
						name="storeClassification"
						placeholder="سوبر ماركت"
						value={formData.storeClassification}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>

				{/* Store Name */}
				<div className="flex flex-col">
					<label
						htmlFor="storeName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						اسم المتجر
					</label>
					<input
						type="text"
						id="storeName"
						name="storeName"
						placeholder="أدخل اسم متجرك"
						value={formData.storeName}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>

				{/* City */}
				<div className="flex flex-col">
					<label
						htmlFor="city"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						المدينة
					</label>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="السعودية"
						value={formData.city}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>

				{/* What your store offers */}
				<div className="flex flex-col">
					<label
						htmlFor="whatYourStoreOffers"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						ماذا يقدمه متجرك؟
					</label>
					<input
						type="text"
						id="whatYourStoreOffers"
						name="whatYourStoreOffers"
						placeholder="ماهي الخدمات التي تقدمها في حال لم تجد تصنيف للمتجر"
						value={formData.whatYourStoreOffers}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>

				{/* Phone Number */}
				<div className="flex flex-col">
					<label
						htmlFor="phoneNumber"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						رقم الجوال
					</label>
					<PhoneInput
						country={"sa"}
						value={formData.phoneNumber}
						onChange={(phone) =>
							setFormData({ ...formData, phoneNumber: phone })
						}
						inputStyle={{
							width: "100%",

							direction: "ltr",
							textAlign: "left",
							paddingRight: "52px",
						}}
						buttonStyle={{ height: "100%", width: "6%", direction: "ltr" }}
						containerStyle={{ direction: "rtl" }}
						inputProps={{
							name: "phoneNumber",
							required: true,
							autoFocus: true,
							className:
								"rounded-lg border border-gray-300 p-3 text-right  focus:ring-green-500 focus:outline-none",
						}}
					/>
				</div>

				{/* Branch Count */}
				<div className="flex flex-col">
					<label
						htmlFor="branchCount"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						عدد فروع متجرك
					</label>
					<input
						type="text"
						id="branchCount"
						name="branchCount"
						placeholder="3"
						value={formData.branchCount}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>

				{/* Personal ID Number */}
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
						className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>

				{/* English Store Name */}
				<div className="flex flex-col">
					<label
						htmlFor="englishStoreName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						اسم المتجر بالإنجليزية
					</label>
					<input
						type="text"
						id="englishStoreName"
						name="englishStoreName"
						placeholder="moon market"
						value={formData.englishStoreName}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
			</div>

			{/* Detailed Address */}
			<div className="mt-6 flex flex-col">
				<label
					htmlFor="detailedAddress"
					className="mb-2 text-right font-semibold text-gray-700"
				>
					العنوان التفصيلي
				</label>
				<textarea
					id="detailedAddress"
					name="detailedAddress"
					rows={3}
					placeholder="جدة، شارع 500 تفرع 2"
					value={formData.detailedAddress}
					onChange={handleChange as any}
					className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
					required
				></textarea>
			</div>

			<div className="mt-8 flex items-center justify-end space-x-2 space-x-reverse">
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

			{/* الأزرار تتحول من مكدسة إلى صف على الشاشات الصغيرة */}
			<div className="mt-8 flex flex-col justify-start gap-4 sm:flex-row">
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

			{/* الإشعارات */}
			<Notification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
			/>
		</form>
	);
}
