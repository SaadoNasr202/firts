"use client";

import { FormData } from "@/app/driver/page";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { UploadButton } from "../uploadthing";

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

export default function DeliveryAgentForm({
	postFormDeliveryDriverAction,
}: {
	postFormDeliveryDriverAction: (
		formData: FormData,
	) => Promise<{ success: boolean } | { message: string; field: string }>;
}) {
	const [formData, setFormData] = useState<{
		firstName: string;
		lastName: string;
		deliveryType: string;
		vehicleType: string;
		idType: string;
		personalIdNumber: string;
		email: string;
		region: string;
		idImage: string;
		idDriver: string;
		Picture: string;
		idVichle: string;
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
		idImage: "",
		idDriver: "",
		Picture: "",
		idVichle: "",
		agreed: false,
	});

	// State for notifications
	const [notification, setNotification] = useState({
		message: "",
		type: "success" as "success" | "error",
		isVisible: false,
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

	// التحقق من صحة النموذج
	const validateForm = () => {
		const requiredFields = [
			"firstName",
			"lastName",
			"deliveryType",
			"vehicleType",
			"idType",
			"personalIdNumber",
			"email",
			"region",
			"idDriver",
			"idVichle",
			"Picture",
			"idImage",
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
	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault(); // منع الريفرش الافتراضي للفورم

		const validation = validateForm();
		if (!validation.isValid) {
			setNotification({
				message: validation.message,
				type: "error",
				isVisible: true,
			});
			return;
		}
		if (formData.personalIdNumber.length > 10) {
			setNotification({
				message: "الرقم القومي اكبر من 10 خانات",
				type: "error",
				isVisible: true,
			});
		} else {
			try {
				const result = await postFormDeliveryDriverAction(formData);
				if ("success" in result && result.success) {
					setNotification({
						message: "تم تسجيل البيانات بنجاح!",
						type: "success",
						isVisible: true,
					});
					handleReset();
				} else if ("message" in result && result.message) {
					setNotification({
						message: result.message,
						type: "error",
						isVisible: true,
					});
				} else {
					setNotification({
						message: "حدث خطأ اثناء الستجيل",
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
		}
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
			idImage: "",
			idDriver: "",
			idVichle: "",
			Picture: "",
			agreed: false,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			method="POST"
			className="h-full w-full p-4 md:p-8"
			dir="rtl"
		>
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
						autoFocus
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
						<option value="موظف">مستقل</option>
						<option value="موظف">موظف</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="email"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						رقم الموبايل
					</label>
					<PhoneInput
						country={"sa"}
						value={formData.email}
						onChange={(phone) => setFormData({ ...formData, email: phone })}
						inputStyle={{
							width: "100%",

							direction: "ltr",
							textAlign: "left",
							paddingRight: "52px",
						}}
						buttonStyle={{ height: "100%", width: "6%", direction: "ltr" }}
						containerStyle={{ direction: "rtl" }}
						inputProps={{
							name: "email",
							required: true,

							className:
								"rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none",
						}}
					/>
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
						<option value="bicycle">دراجة هوائية</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="personalIdNumber"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						رقم الهوية الشخصية / الإقامة
					</label>
					<input
						type="text"
						id="personalIdNumber"
						name="personalIdNumber"
						placeholder="EX:1234567890"
						value={formData.personalIdNumber}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
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
						<option value="هوية ">بطاقة هوية وطنية</option>
						<option value="إقامة">إقامة</option>
					</select>
				</div>
			</div>
			<div className="mt-8 flex flex-col gap-5 md:flex-row-reverse md:justify-end">
				<div className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-300 hover:border-green-500">
					<label>صورة الهوية /الإقامة </label>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							console.log("Files:", res);
							const first = res?.[0];
							const url = (first as any)?.serverData?.url || first?.url;
							if (url) {
								setFormData((prev) => ({ ...prev, idImage: url }));
								setNotification({
									message: "تم رفع صورة الهوية الشخصية بنجاح",
									type: "success",
									isVisible: true,
								});
							}
						}}
						onUploadError={(error: Error) => {
							setNotification({
								message: error.message,
								type: "error",
								isVisible: true,
							});
						}}
					/>
				</div>

				<div className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-300 hover:border-green-500">
					<label> رخصة القيادة</label>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							console.log("Files:", res);
							const first = res?.[0];
							const url = (first as any)?.serverData?.url || first?.url;
							if (url) {
								setFormData((prev) => ({ ...prev, idVichle: url }));
								setNotification({
									message: "تم رفع صورة الرخصة بنجاح",
									type: "success",
									isVisible: true,
								});
							}
						}}
						onUploadError={(error: Error) => {
							setNotification({
								message: error.message,
								type: "error",
								isVisible: true,
							});
						}}
					/>
				</div>
				<div className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-300 hover:border-green-500">
					<label>استمارة المركبة </label>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							console.log("Files:", res);
							const first = res?.[0];
							const url = (first as any)?.serverData?.url || first?.url;
							if (url) {
								setFormData((prev) => ({ ...prev, idDriver: url }));
								setNotification({
									message: "تم رفع صورة الاستمارة بنجاح",
									type: "success",
									isVisible: true,
								});
							}
						}}
						onUploadError={(error: Error) => {
							setNotification({
								message: error.message,
								type: "error",
								isVisible: true,
							});
						}}
					/>
				</div>
				<div className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-300 hover:border-green-500">
					<label>صورة شخصية</label>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							console.log("Files:", res);
							const first = res?.[0];
							const url = (first as any)?.serverData?.url || first?.url;
							if (url) {
								setFormData((prev) => ({ ...prev, Picture: url }));
								setNotification({
									message: "تم رفع الصورة الشخصية بنجاح",
									type: "success",
									isVisible: true,
								});
							}
						}}
						onUploadError={(error: Error) => {
							setNotification({
								message: error.message,
								type: "error",
								isVisible: true,
							});
						}}
					/>
				</div>
			</div>
			<div className="mt-8 flex items-center justify-start gap-2 space-x-2 space-x-reverse">
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
			<div className="mt-8 flex flex-col-reverse justify-end gap-4 sm:flex-row">
				<button
					onClick={handleSubmit} // 👈 تم تغيير هذا
					type="submit" // 👈 هذا صحيح
					className="w-full rounded-lg bg-green-500 px-10 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
				>
					إرسال
				</button>
				<button
					type="button"
					className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 font-semibold text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none sm:w-auto"
				>
					إعادة ضبط
				</button>
			</div>
			<Notification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
			/>
		</form>
	);
}
