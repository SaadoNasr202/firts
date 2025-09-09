"use client";

import { KaidhaFormData } from "@/app/Kaidha/page";
import {
	Autocomplete,
	GoogleMap,
	Marker,
	useLoadScript,
} from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // استيراد التنسيقات
import { useLanguage } from "@/contexts/LanguageContext";
const defaultCenter = { lat: 24.7136, lng: 46.6753 };

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

export default function KaidhaRegister({
	postFormKaidhaAction,
}: {
	postFormKaidhaAction: (
		formData: KaidhaFormData,
	) => Promise<{ success: boolean } | { message: string; field: string }>;
}) {
	const { t } = useLanguage();
	const [hasAdditionalIncome, setHasAdditionalIncome] = useState("no"); // نعم / لا

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries: ["places"],
	});
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

	const handlePlaceChanged = () => {
		const place = autocompleteRef.current?.getPlace();
		if (place?.geometry?.location) {
			const lat = place.geometry.location.lat();
			const lng = place.geometry.location.lng();

			setFormData((prev) => ({
				...prev,
				location: `${lat},${lng}`,
			}));
		}
	};
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
		locationhouse: "",
		agreed: false,
		companyName: "",
		jobTitle: "",
		yearsOfExperience: "",
		grossSalary: "",
		workAddress: "",
		locationwork: "",
		Installments: "",
		hasAdditionalIncome: "",
		additionalAmount: "",
		incomeSource: "",
	});
	// New state for map location

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
			"fatherName",
			"grandFatherName",
			"birthDate",
			"nationality",
			"socialStatus",
			"familyMembersCount",
			"idType",
			"personalIdNumber",
			"idExpirationDate",
			"phoneNumber",
			"whatsappNumber",
			"locationhouse",
			"email",
			"homeType",
			"homeNature",
			"city",
			"neighborhood",
			"locationwork",
			"addressDetails",
			"Installments",
			"hasAdditionalIncome",
		];

		for (const field of requiredFields) {
			if (
				!formData[field as keyof typeof formData] ||
				(formData[field as keyof typeof formData] as string).trim() === ""
			) {
				return {
					isValid: false,
					message: t('kaidhaForm.fillAllFields'),
				};
			}
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
		if (
			formData.birthDate >= new Date("2005-12-31").toISOString() &&
			formData.personalIdNumber.length > 10
		) {
			setNotification({
				message: t('kaidhaForm.birthDateError'),
				type: 'error',
				isVisible: true,
			});
		} else {
			try {
				const result = await postFormKaidhaAction(formData);
				if ("success" in result && result.success) {
				setNotification({
					message: t('kaidhaForm.success'),
					type: 'success',
					isVisible: true,
				});
					// إعادة تعيين النموذج بعد النجاح
					setTimeout(() => {
						handleReset();
					}, 2000);
				} else if ("message" in result && result.message) {
					setNotification({
						message: result.message,
						type: "error",
						isVisible: true,
					});
				} else {
			setNotification({
				message: t('kaidhaForm.error'),
				type: 'error',
				isVisible: true,
			});
				}
			} catch (error) {
				setNotification({
					message: t('kaidhaForm.error'),
					type: 'error',
					isVisible: true,
				});
			}
		}
	};

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

	// دالة للتعامل مع إرسال النموذج (Form)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
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
			locationwork: "",
			locationhouse: "",
			workAddress: "",
			Installments: "",
			hasAdditionalIncome: "",
			additionalAmount: "",
			incomeSource: "",
		});
	};

	// A reusable component for a select dropdown field.
	const SelectField = ({
		label,
		name,
		options,
		value,
		onChange,
		required = false,
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
				<option value="">{t('kaidhaForm.placeholder.choose')}</option>
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
					{t('kaidhaForm.personalInfo')}
				</h2>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					{/* First Row of Inputs */}
					<div className="flex flex-col">
					<label
						htmlFor="firstName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.firstName')}
					</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							placeholder=""
							value={formData.firstName}
							onChange={handleChange}
							autoFocus
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="lastName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.lastName')}
					</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							placeholder=""
							value={formData.lastName}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="fatherName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.fatherName')}
					</label>
						<input
							type="text"
							id="fatherName"
							name="fatherName"
							placeholder=""
							value={formData.fatherName}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="grandFatherName"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.grandFatherName')}
					</label>
						<input
							type="text"
							id="grandFatherName"
							name="grandFatherName"
							placeholder=""
							value={formData.grandFatherName}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="birthDate"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.birthDate')}
					</label>
						<input
							type="date"
							id="birthDate"
							name="birthDate"
							placeholder="MM/DD/YY"
							value={formData.birthDate}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
							max="2005-12-31"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="nationality"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.nationality')}
					</label>
						<input
							type="text"
							id="nationality"
							name="nationality"
							placeholder={t('kaidhaForm.placeholder.nationality')}
							value={formData.nationality}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>

					{/* Second Row of Inputs */}
					<SelectField
						label={t('kaidhaForm.socialStatus')}
						name="socialStatus"
						options={[
							{ value: "single", label: t('kaidhaForm.option.single') },
							{ value: "married", label: t('kaidhaForm.option.married') },
						]}
						value={formData.socialStatus}
						onChange={handleChange}
					/>
					<SelectField
						label={t('kaidhaForm.familyMembersCount')}
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
						label={t('kaidhaForm.idType')}
						name="idType"
						options={[
							{ value: "nationalId", label: t('kaidhaForm.option.nationalId') },
							{ value: "passport", label: t('kaidhaForm.option.passport') },
						]}
						value={formData.idType}
						onChange={handleChange}
					/>
					<div className="flex flex-col">
					<label
						htmlFor="personalIdNumber"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.personalIdNumber')}
					</label>
						<input
							type="text"
							id="personalIdNumber"
							name="personalIdNumber"
							placeholder={t('kaidhaForm.placeholder.idNumber')}
							value={formData.personalIdNumber}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="idExpirationDate"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.idExpirationDate')}
					</label>
						<input
							type="date"
							id="idExpirationDate"
							name="idExpirationDate"
							placeholder="MM/DD/YY"
							value={formData.idExpirationDate}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="phoneNumber"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.phoneNumber')}
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
							buttonStyle={{ height: "100%", width: "10%", direction: "ltr" }}
							containerStyle={{ direction: "rtl" }}
							inputProps={{
								name: "phoneNumber",
								required: true,

								className:
									"rounded-lg border border-gray-300 p-3 text-right  focus:outline-none",
							}}
						/>
					</div>

					{/* Third Row of Inputs */}
					<div className="flex flex-col">
					<label
						htmlFor="whatsappNumber"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.whatsappNumber')}
					</label>

						<PhoneInput
							country={"sa"}
							value={formData.whatsappNumber}
							onChange={(phone) =>
								setFormData({ ...formData, whatsappNumber: phone })
							}
							inputStyle={{
								width: "100%",

								direction: "ltr",
								textAlign: "left",
								paddingRight: "52px",
							}}
							buttonStyle={{ height: "100%", width: "10%", direction: "ltr" }}
							containerStyle={{ direction: "rtl" }}
							inputProps={{
								name: "phoneNumber",
								required: true,

								className:
									"rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none",
							}}
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="email"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.email')}
					</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder={t('kaidhaForm.placeholder.email')}
							value={formData.email}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<SelectField
						label={t('kaidhaForm.homeType')}
						name="homeType"
						options={[
							{ value: "villa", label: t('kaidhaForm.option.villa') },
							{ value: "apartment", label: t('kaidhaForm.option.apartment') },
						]}
						value={formData.homeType}
						onChange={handleChange}
					/>
					<SelectField
						label={t('kaidhaForm.homeNature')}
						name="homeNature"
						options={[
							{ value: "rent", label: t('kaidhaForm.option.rent') },
							{ value: "ownership", label: t('kaidhaForm.option.ownership') },
						]}
						value={formData.homeNature}
						onChange={handleChange}
					/>

					{/* Fourth Row of Inputs */}
					<div className="flex flex-col">
					<label
						htmlFor="city"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.city')}
					</label>
						<input
							type="text"
							id="city"
							name="city"
							placeholder={t('kaidhaForm.placeholder.city')}
							value={formData.city}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="neighborhood"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.neighborhood')}
					</label>
						<input
							type="text"
							id="neighborhood"
							name="neighborhood"
							placeholder={t('kaidhaForm.placeholder.neighborhood')}
							value={formData.neighborhood}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
					<label
						htmlFor="addressDetails"
						className="mb-2 text-right font-semibold text-gray-700"
					>
						{t('kaidhaForm.addressDetails')}
					</label>
						<input
							type="text"
							id="addressDetails"
							name="addressDetails"
placeholder={t('kaidhaForm.placeholder.address')}
							value={formData.addressDetails}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
				</div>

				{/* Map Location Section */}
				<h2 className="mt-8 mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
					{t('kaidhaForm.homeLocation')}
				</h2>
				<div
					className="flex items-center justify-center rounded-lg border border-gray-300 p-4 text-center text-gray-500"
					style={{ height: "500px" }}
				>
					<div className="relative h-full w-full">
						{isLoaded && (
							<div className="absolute top-2 left-1/2 z-50 w-[300px] -translate-x-1/2">
								<Autocomplete
									onLoad={(ac) => (autocompleteRef.current = ac)}
									onPlaceChanged={handlePlaceChanged}
								>
									<input
										type="text"
										placeholder={t('kaidhaForm.searchLocation')}
										className="w-full rounded-lg border bg-amber-50 px-4 py-2 shadow focus:outline-none"
									/>
								</Autocomplete>
							</div>
						)}

						{isLoaded ? (
							<>
								<GoogleMap
									mapContainerStyle={{ width: "100%", height: "100%" }}
									center={
										formData.locationhouse
											? {
													lat: parseFloat(formData.locationhouse.split(",")[0]),
													lng: parseFloat(formData.locationhouse.split(",")[1]),
												}
											: defaultCenter
									}
									zoom={10}
									onClick={(e) => {
										if (e.latLng) {
											const lat = e.latLng.lat().toString();
											const lng = e.latLng.lng().toString();
											setFormData((prev) => ({
												...prev,
												locationhouse: `${lat},${lng}`,
											}));
										}
									}}
								>
									{formData.locationhouse && (
										<Marker
											position={{
												lat: parseFloat(formData.locationhouse.split(",")[0]),
												lng: parseFloat(formData.locationhouse.split(",")[1]),
											}}
										/>
									)}
								</GoogleMap>

								{/* زر تحديد الموقع */}
								<div className="absolute top-14 right-0 z-50">
									<button
										onClick={() => {
											if (navigator.geolocation) {
												navigator.geolocation.getCurrentPosition(
													(pos) => {
														const position = {
															lat: pos.coords.latitude,
															lng: pos.coords.longitude,
														};
														setFormData((prev) => ({
															...prev,
															locationhouse: `${position.lat},${position.lng}`,
														}));
													},
													() => alert(t('kaidhaForm.locationError')),
												);
											} else alert(t('kaidhaForm.locationNotSupported'));
										}}
										className="rounded-lg px-4 py-2 font-semibold text-black shadow-lg transition hover:bg-gray-200"
									>
{t('kaidhaForm.myLocation')}
									</button>
								</div>
							</>
						) : (
							<p>{t('kaidhaForm.loadingMap')}</p>
						)}
					</div>
				</div>

				{/* Job Information Section */}
				<h2 className="mt-8 mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
					{t('kaidhaForm.workInfo')}
				</h2>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col">
						<label
							htmlFor="companyName"
							className="mb-2 text-right font-semibold text-gray-700"
						>
							{t('kaidhaForm.companyName')}
						</label>
						<input
							type="text"
							id="companyName"
							name="companyName"
							placeholder=""
							value={formData.companyName}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="jobTitle"
							className="mb-2 text-right font-semibold text-gray-700"
						>
							{t('kaidhaForm.jobTitle')}
						</label>
						<input
							type="text"
							id="jobTitle"
							name="jobTitle"
							placeholder=""
							value={formData.jobTitle}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="yearsOfExperience"
							className="mb-2 text-right font-semibold text-gray-700"
						>
							{t('kaidhaForm.yearsOfExperience')}
						</label>
						<input
							type="text"
							id="yearsOfExperience"
							name="yearsOfExperience"
							placeholder=""
							value={formData.yearsOfExperience}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="grossSalary"
							className="mb-2 text-right font-semibold text-gray-700"
						>
							{t('kaidhaForm.grossSalary')}
						</label>
						<input
							type="text"
							id="grossSalary"
							name="grossSalary"
							placeholder=""
							value={formData.grossSalary}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="workAddress"
							className="mb-2 text-right font-semibold text-gray-700"
						>
							{t('kaidhaForm.workAddress')}
						</label>
						<input
							type="text"
							id="workAddress"
							name="workAddress"
placeholder={t('kaidhaForm.placeholder.address')}
							value={formData.workAddress}
							onChange={handleChange}
							className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
						/>
					</div>
				</div>

				{/* Additional Income and Installment Section */}

				{/* Map Location Section */}
				<h2 className="mt-8 mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
					{t('kaidhaForm.workLocation')}
				</h2>
				<div
					className="flex items-center justify-center rounded-lg border border-gray-300 p-4 text-center text-gray-500"
					style={{ height: "500px" }}
				>
					<div className="relative h-full w-full">
						{isLoaded && (
							<div className="absolute top-2 left-1/2 z-50 w-[300px] -translate-x-1/2">
								<Autocomplete
									onLoad={(ac) => (autocompleteRef.current = ac)}
									onPlaceChanged={handlePlaceChanged}
								>
									<input
										type="text"
										placeholder={t('kaidhaForm.searchLocation')}
										className="w-full rounded-lg border bg-amber-50 px-4 py-2 shadow focus:outline-none"
									/>
								</Autocomplete>
							</div>
						)}

						{isLoaded ? (
							<>
								<GoogleMap
									mapContainerStyle={{ width: "100%", height: "100%" }}
									center={
										formData.locationwork
											? {
													lat: parseFloat(formData.locationwork.split(",")[0]),
													lng: parseFloat(formData.locationwork.split(",")[1]),
												}
											: defaultCenter
									}
									zoom={10}
									onClick={(e) => {
										if (e.latLng) {
											const lat = e.latLng.lat().toString();
											const lng = e.latLng.lng().toString();
											setFormData((prev) => ({
												...prev,
												locationwork: `${lat},${lng}`,
											}));
										}
									}}
								>
									{formData.locationwork && (
										<Marker
											position={{
												lat: parseFloat(formData.locationwork.split(",")[0]),
												lng: parseFloat(formData.locationwork.split(",")[1]),
											}}
										/>
									)}
								</GoogleMap>

								{/* زر تحديد الموقع */}
								<div className="absolute top-14 right-0 z-50">
									<button
										onClick={() => {
											if (navigator.geolocation) {
												navigator.geolocation.getCurrentPosition(
													(pos) => {
														const position = {
															lat: pos.coords.latitude,
															lng: pos.coords.longitude,
														};
														setFormData((prev) => ({
															...prev,
															locationwork: `${position.lat},${position.lng}`,
														}));
													},
													() => alert(t('kaidhaForm.locationError')),
												);
											} else alert(t('kaidhaForm.locationNotSupported'));
										}}
										className="rounded-lg px-4 py-2 font-semibold text-black shadow-lg transition hover:bg-gray-200"
									>
{t('kaidhaForm.myLocation')}
									</button>
								</div>
							</>
						) : (
							<p>{t('kaidhaForm.loadingMap')}</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
					{/* First row of additional income */}
					<div className="col-span-1 flex flex-col items-start gap-2 pt-5 md:col-span-2 lg:col-span-4">
						<div className="text-left text-xl font-semibold text-gray-700">
							<SelectField
								label={t('kaidhaForm.installments')}
								name="Installments"
								options={[
									{ value: "نعم", label: t('kaidhaForm.option.yes') },
									{ value: "لا", label: t('kaidhaForm.option.no') },
								]}
								value={formData.Installments}
								onChange={handleChange}
							/>{" "}
						</div>
					</div>

					{/* Second row of additional income */}
					<div className="col-span-1 flex flex-col items-start gap-2 pt-5 md:col-span-2 lg:col-span-4">
						<div className="text-left text-xl font-semibold text-gray-700">
							{t('kaidhaForm.additionalIncome')}
						</div>

						{/* اختيار نعم / لا */}
						<div className="flex gap-4">
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="hasAdditionalIncome"
									value="yes"
									checked={formData.hasAdditionalIncome === "yes"}
									onChange={() =>
										setFormData((prev) => ({
											...prev,
											hasAdditionalIncome: "yes",
										}))
									}
								/>
{t('kaidhaForm.option.yes')}
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="hasAdditionalIncome"
									value="no"
									checked={formData.hasAdditionalIncome === "no"}
									onChange={() =>
										setFormData((prev) => ({
											...prev,
											hasAdditionalIncome: "no",
										}))
									}
								/>
{t('kaidhaForm.option.no')}
							</label>
						</div>

						{formData.hasAdditionalIncome === "yes" && (
							<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="flex flex-col">
									<label
										htmlFor="additionalAmount"
										className="mb-2 text-right font-semibold text-gray-700"
									>
										{t('kaidhaForm.additionalAmount')}
									</label>
									<input
										type="text"
										id="additionalAmount"
										value={formData.additionalAmount}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												additionalAmount: e.target.value,
											}))
										}
										className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
									/>
								</div>

								<div className="flex flex-col">
									<label
										htmlFor="incomeSource"
										className="mb-2 text-right font-semibold text-gray-700"
									>
										{t('kaidhaForm.incomeSource')}
									</label>
									<input
										type="text"
										id="incomeSource"
										value={formData.incomeSource}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												incomeSource: e.target.value,
											}))
										}
										className="rounded-lg border border-gray-300 p-3 text-right focus:ring-2 focus:ring-green-500 focus:outline-none"
									/>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* الأزرار تتحول من مكدسة إلى صف على الشاشات الصغيرة */}
				<div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
					<button
						onClick={handleSumbit}
						type="submit"
						className="w-full rounded-lg bg-green-500 px-10 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
					>
						{t('kaidhaForm.submit')}
					</button>
					<button
						type="button"
						onClick={handleReset}
						className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 font-semibold text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none sm:w-auto"
					>
						{t('kaidhaForm.reset')}
					</button>
				</div>
			</form>
			<Notification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
			/>
		</div>
	);
}
