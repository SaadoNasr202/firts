// src/components/InvestoreForm.tsx
"use client";

import { InvestoreFormData } from "@/app/invstore/page";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function InvestoreForm({
	postInvestoreAction,
}: {
	postInvestoreAction: (
		formData: InvestoreFormData,
	) => Promise<{ success: boolean; message?: string }>;
}) {
	const { t, language } = useLanguage();
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
	const [isContractGenerated, setIsContractGenerated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// تحميل زر نفاذ
	const [isNafathLoading, setIsNafathLoading] = useState(false);

	// request id من initiate
	const [nafathRequestId, setNafathRequestId] = useState<string | null>(null);

	// الرقم العشوائي من نفاذ
	const [nafathRandom, setNafathRandom] = useState<string | null>(null);

	// التحكم بالـ polling
	const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(
		null,
	);
	useEffect(() => {
		return () => {
			if (pollingInterval) clearInterval(pollingInterval);
		};
	}, [pollingInterval]);

	const handleNafathInitiate = async () => {
		try {
			setIsNafathLoading(true);

			const response = await fetch("/api/proxy/nafath/initiate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ national_id: formData.national_id }),
			});

			if (!response.ok) throw new Error("فشل الاتصال بخدمة نفاذ");

			const data = await response.json();

			if (data.status === "sent" && data.external_response?.[0]) {
				const random = data.external_response[0].random;
				setNafathRequestId(data.request_id);
				setNafathRandom(random);

				setNotification({
					message: `${t('form.nafathSent')} ${random} ${t('form.nafathOnApp')}`,
					type: "success",
					isVisible: true,
				});

				// بدء الـ polling
				startPolling(data.request_id);
			} else {
				throw new Error("لم يتم إرجاع بيانات صحيحة من نفاذ");
			}
		} catch (error: any) {
			setNotification({
				message: error.message || t('form.nafathError'),
				type: "error",
				isVisible: true,
			});
		} finally {
			setIsNafathLoading(false);
		}
	};
	const startPolling = (requestId: string) => {
		if (pollingInterval) clearInterval(pollingInterval);

		const interval = setInterval(async () => {
			try {
				const responseState = await fetch("/api/proxy/nafath/checkStatus", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ request_id: nafathRequestId }),
				});

				if (!responseState.ok) throw new Error("فشل التحقق من حالة التوثيق");

				const data = await responseState.json();

				if (data.status === "approved") {
					clearInterval(interval);
					setPollingInterval(null);

					setNotification({
						message: t('form.nafathSuccess'),
						type: "success",
						isVisible: true,
					});
				} else if (data.status === "rejected") {
					clearInterval(interval);
					setPollingInterval(null);

					setNotification({
						message: t('form.nafathRejected'),
						type: "error",
						isVisible: true,
					});
				}
			} catch (error) {
				console.error("خطأ أثناء polling:", error);
			}
		}, 5000); // كل 5 ثواني

		setPollingInterval(interval);
	};

	// State for notifications
	const [notification, setNotification] = useState({
		message: "",
		type: "success" as "success" | "error",
		isVisible: false,
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
			"first_name",
			"father_name",
			"family_name",
			"grandfather_name",
			"birth_date",
			"national_id",
			"email",
			"phone",
			"national_address_email",
			"region",
			"iban",
			"bank_name",
			"amount",
		];

		for (const field of requiredFields) {
			if (
				!formData[field as keyof typeof formData] ||
				(formData[field as keyof typeof formData] as string).trim() === ""
			) {
				return {
					isValid: false,
					message: t('form.fillAllFields'),
				};
			}
		}

		if (!formData.agreed) {
			return {
				isValid: false,
				message: t('form.agreeToTerms'),
			};
		}

		return { isValid: true, message: "" };
	};

	const handleEdit = () => {
		setIsOpen(false);
		setIsContractGenerated(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const validation = validateForm();
		if (!validation.isValid) {
			setNotification({
				message: validation.message,
				type: "error",
				isVisible: true,
			});
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/proxy/contract-pdf", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error("فشل إنشاء ملف PDF");

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);

			// عرض الـ PDF مباشرة بعد انتهاء التحميل
			setPdfUrl(url);
			setIsOpen(true); // افتح الـ Modal بعد جلب الملف
			setIsContractGenerated(true);
		} catch (error: any) {
			console.error(error);
			setNotification({
				message: error.message || t('form.contractError'),
				type: "error",
				isVisible: true,
			});
			setIsContractGenerated(false);
		} finally {
			setIsLoading(false);
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
							{t('form.firstName')}
						</label>
						<input
							type="text"
							id="first_name"
							name="first_name"
							placeholder={t('form.firstName')}
							value={formData.first_name}
							onChange={handleChange}
							autoFocus
							className="w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						/>
					</div>
					<div className="space-y-2">
							<label
								htmlFor="father_name"
								className="block text-sm font-semibold text-gray-700"
							>
								{t('form.fatherName')}
							</label>
							<input
								type="text"
								id="father_name"
								name="father_name"
								placeholder={t('form.fatherName')}
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
								{t('form.familyName')}
							</label>
							<input
								type="text"
								id="family_name"
								name="family_name"
								placeholder={t('form.familyName')}
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
								{t('form.birthDate')}
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
								{t('form.nationalId')}
							</label>
							<input
								type="text"
								id="national_id"
								name="national_id"
								placeholder={t('form.nationalId')}
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
								{t('form.email')}
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
							<label className="mb-2 text-right font-semibold text-gray-700">
								{t('form.phone')}
							</label>
						<div className="relative">
							<PhoneInput
								country={"sa"}
								value={formData.phone}
								onChange={(phone) => setFormData({ ...formData, phone: phone })}
								inputStyle={{
									width: "100%",
									direction: "ltr",
									textAlign: "left",
									paddingRight: "52px",
								}}
								buttonStyle={{ height: "100%", width: "6%", direction: "ltr" }}
								containerStyle={{ direction: "rtl" }}
								inputProps={{
									name: "phone",
									required: true,

									className:
										"rounded-lg border border-gray-300 p-3 text-right  focus:ring-green-500 focus:outline-none",
								}}
							/>
						</div>
					</div>

					{/* الصف الخامس */}
					<div className="space-y-2">
							<label
								htmlFor="national_address_email"
								className="block text-sm font-semibold text-gray-700"
							>
								{t('form.nationalAddressEmail')}
							</label>
							<input
								type="email"
								id="national_address_email"
								name="national_address_email"
								placeholder={t('form.nationalAddressEmail')}
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
								{t('form.region')}
							</label>
							<input
								type="text"
								id="region"
								name="region"
								placeholder={t('form.region')}
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
								{t('form.iban')}
							</label>
							<input
								type="text"
								id="iban"
								name="iban"
								placeholder={t('form.iban')}
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
							{t('form.bankName')}
						</label>
						<input
							type="text"
							id="bank_name"
							name="bank_name"
							placeholder={t('form.bankName')}
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
							{t('form.amount')}
						</label>
						<input
							type="number"
							id="amount"
							name="amount"
							placeholder={t('form.amount')}
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
						{t('form.agreeTerms')}{" "}
						<a
							href="/CondtionAterms"
							className="font-medium text-green-600 hover:underline"
						>
							{t('form.termsAndConditions')}
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
						disabled={isLoading}
					>
						{isLoading ? t('form.creatingContract') : t('form.showContract')}
					</button>
				</div>
			</form>

			{/* شاشة منبثقة لعرض PDF */}
			{isOpen && (
				<div className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black">
					<div className="relative w-11/12 max-w-4xl rounded-lg bg-white p-4 shadow-lg">
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-2 left-2 rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
						>
							✕ {t('form.close')}
						</button>

						{pdfUrl ? (
							<iframe
								src={pdfUrl}
								className="h-[80vh] min-h-[400px] w-full rounded-md border"
							></iframe>
						) : (
							<div className="flex h-[600px] w-full items-center justify-center rounded-md border bg-gray-100 font-semibold text-gray-700">
								{t('form.loadingContract')}
							</div>
						)}

						{isContractGenerated && (
							<div className="mt-4 flex flex-col items-center justify-end gap-2 sm:flex-row">
								<button
									onClick={handleEdit}
									className="w-full rounded-lg bg-white px-8 py-3 font-semibold text-[#31A342] shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:outline-none sm:w-auto"
									style={{ border: "2px solid #31A342" }}
								>
									{t('form.editData')}
								</button>
								<button
									onClick={handleNafathInitiate}
									className="w-full rounded-lg bg-[#31A342] px-8 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#288435] focus:outline-none sm:w-auto"
									disabled={isNafathLoading}
								>
									{isNafathLoading ? t('form.sending') : t('form.nafathAuth')}
								</button>
							</div>
						)}
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
