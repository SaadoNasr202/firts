"use client";

import { WorkerFormData } from "@/app/worker/page";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
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
		<div
			className="fixed inset-0 flex items-center justify-center p-4"
			dir="rtl"
		>
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

export default function WorkerRegister({
	postFormWorkerAction,
}: {
	postFormWorkerAction: (
		formData: WorkerFormData,
	) => Promise<{ success: boolean } | { message: string; field: string }>;
}) {
	const { t } = useLanguage();
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
		Picture: string;
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
		Picture: "",
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
			"firstName",
			"lastName",
			"deliveryType",
			"vehicleType",
			"idType",
			"personalIdNumber",
			"email",
			"idImage",
			"Picture",
			"region",
		];

		for (const field of requiredFields) {
			if (
				!formData[field as keyof typeof formData] ||
				(formData[field as keyof typeof formData] as string).trim() === ""
			) {
				return {
					isValid: false,
					message: t("workerForm.fillAllFields"),
				};
			}
		}

		// التحقق من الاسم الأول
		if (formData.firstName.length < 2 || formData.firstName.length > 50) {
			return {
				isValid: false,
				message: "الاسم الأول يجب أن يكون بين 2-50 حرف",
			};
		}
		if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(formData.firstName)) {
			return {
				isValid: false,
				message: "الاسم الأول يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
			};
		}

		// التحقق من الاسم الأخير
		if (formData.lastName.length < 2 || formData.lastName.length > 50) {
			return {
				isValid: false,
				message: "الاسم الأخير يجب أن يكون بين 2-50 حرف",
			};
		}
		if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(formData.lastName)) {
			return {
				isValid: false,
				message: "الاسم الأخير يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
			};
		}

		// التحقق من البريد الإلكتروني
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			return {
				isValid: false,
				message: "البريد الإلكتروني غير صحيح",
			};
		}

		// التحقق من المنطقة
		if (formData.region.length < 2 || formData.region.length > 50) {
			return {
				isValid: false,
				message: "المنطقة يجب أن تكون بين 2-50 حرف",
			};
		}

		// التحقق من الهوية الوطنية (10 أرقام بالضبط)
		if (!/^\d{10}$/.test(formData.personalIdNumber)) {
			return {
				isValid: false,
				message: "الهوية الوطنية يجب أن تحتوي على 10 أرقام بالضبط",
			};
		}

		if (!formData.agreed) {
			return {
				isValid: false,
				message: t("workerForm.agreeToTerms"),
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

		if (formData.personalIdNumber.length > 10) {
			setNotification({
				message: t("workerForm.idTooLong"),
				type: "error",
				isVisible: true,
			});
		} else {
			try {
				const result = await postFormWorkerAction(formData);
				if ("success" in result && result.success) {
					setNotification({
						message: t("workerForm.success"),
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
						message: t("workerForm.error"),
						type: "error",
						isVisible: true,
					});
				}
			} catch (error) {
				setNotification({
					message: t("workerForm.submitError"),
					type: "error",
					isVisible: true,
				});
			}
		}
	};
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
			firstName: "",
			lastName: "",
			deliveryType: "",
			vehicleType: "",
			idType: "",
			personalIdNumber: "",
			email: "",
			region: "",
			idImage: "",
			Picture: "",
			agreed: false,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="h-full w-full p-4 md:p-8">
			{/* تم إضافة هذا السطر */}
			<h2 className="mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
				{t("workerForm.workerInfo")}
			</h2>

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
				<div className="flex flex-col">
					<label
						htmlFor="lastName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t("workerForm.lastName")}
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						placeholder={t("workerForm.placeholder.lastName")}
						value={formData.lastName}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="firstName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t("workerForm.firstName")}
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						placeholder={t("workerForm.placeholder.firstName")}
						value={formData.firstName}
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
						{t("workerForm.email")}
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder={t("workerForm.placeholder.email")}
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
						{t("workerForm.workType")}
					</label>
					<select
						id="deliveryType"
						name="deliveryType"
						value={formData.deliveryType}
						onChange={handleChange as any}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					>
						<option value="">{t("workerForm.placeholder.choose")}</option>
						<option value="توصيل طعام">
							{t("workerForm.option.foodDelivery")}
						</option>
						<option value="تسوق من سوبرماركت">
							{t("workerForm.option.supermarketShopping")}
						</option>
						<option value="خدمات منزلية">
							{t("workerForm.option.homeServices")}
						</option>
						<option value=" أخرى">{t("workerForm.option.other")}</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="region"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t("workerForm.region")}
					</label>
					<input
						type="text"
						id="region"
						name="region"
						placeholder={t("workerForm.placeholder.region")}
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
						{t("workerForm.vehicleType")}
					</label>
					<select
						id="vehicleType"
						name="vehicleType"
						value={formData.vehicleType}
						onChange={handleChange as any}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					>
						<option value="">{t("workerForm.placeholder.choose")}</option>
						<option value="bike">{t("workerForm.option.motorcycle")}</option>
						<option value="car">{t("workerForm.option.car")}</option>
						<option value="bycicle">{t("workerForm.option.bicycle")}</option>
						<option value="لابوجد">{t("workerForm.option.noVehicle")}</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="idType"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t("workerForm.idType")}
					</label>
					<select
						id="idType"
						name="idType"
						value={formData.idType}
						onChange={handleChange as any}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					>
						<option value="">{t("workerForm.placeholder.choose")}</option>
						<option value="passport">{t("workerForm.option.residence")}</option>
						<option value="nationalId">
							{t("workerForm.option.nationalId")}
						</option>
					</select>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="personalIdNumber"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t("workerForm.personalId")}
					</label>
					<input
						type="text"
						id="personalIdNumber"
						name="personalIdNumber"
						placeholder={t("workerForm.placeholder.idExample")}
						value={formData.personalIdNumber}
						onChange={handleChange}
						className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						required
					/>
				</div>
			</div>
			<div className="mt-8 flex flex-col gap-5 md:flex-row-reverse md:justify-start">
				<div className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-300 hover:border-green-500">
					<label>{t("workerForm.idImage")}</label>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							console.log("Files:", res);
							const first = res?.[0];
							const url = (first as any)?.serverData?.url || first?.url;
							if (url) {
								setFormData((prev) => ({ ...prev, idImage: url }));
								setNotification({
									message: t("workerForm.idUploadSuccess"),
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
					<label>{t("workerForm.personalPhoto")}</label>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							console.log("Files:", res);
							const first = res?.[0];
							const url = (first as any)?.serverData?.url || first?.url;
							if (url) {
								setFormData((prev) => ({ ...prev, Picture: url }));
								setNotification({
									message: t("workerForm.photoUploadSuccess"),
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
			<div className="mt-8 flex items-center justify-end space-x-2 space-x-reverse">
				<label htmlFor="agreed" className="text-sm text-gray-600">
					{t("workerForm.agreeTerms")}{" "}
					<a
						href="/CondtionAterms"
						className="font-medium text-green-600 hover:underline"
					>
						{t("workerForm.termsAndConditions")}
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
			<div className="mt-8 flex flex-col-reverse justify-start gap-4 sm:flex-row">
				<button
					onClick={handleSumbit}
					type="submit"
					className="w-full rounded-lg bg-green-500 px-10 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
				>
					{t("workerForm.submit")}
				</button>
				<button
					type="button"
					onClick={handleReset}
					className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 font-semibold text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none sm:w-auto"
				>
					{t("workerForm.reset")}
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
