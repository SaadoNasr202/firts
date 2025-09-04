"use client";

import { WorkerFormData } from "@/app/worker/page";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";

// مكون الإشعارات
const Notification = ({ message, type, isVisible, onClose }: {
	message: string;
	type: 'success' | 'error';
	isVisible: boolean;
	onClose: () => void;
}) => {
	if (!isVisible) return null;

	return (
<div className="fixed inset-0 flex items-center justify-center p-4" dir="rtl">
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

export default function WorkerRegister({
	postFormWorkerAction,
}: {
	postFormWorkerAction: (
		formData: WorkerFormData,
	) => Promise<{ success: boolean }>;
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
		agreed: false,
	});

	// State for notifications
	const [notification, setNotification] = useState({
		message: '',
		type: 'success' as 'success' | 'error',
		isVisible: false
	});

	// التحقق من صحة النموذج
	const validateForm = () => {
		const requiredFields = [
			'firstName', 'lastName', 'deliveryType', 'vehicleType', 'idType',
			'personalIdNumber', 'email', 'region'
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

	const handleSumbit = async () => {
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
			const result = await postFormWorkerAction(formData);
			if (result.success) {
				setNotification({
					message: 'تم تسجيل البيانات بنجاح!',
					type: 'success',
					isVisible: true
				});
				// إعادة تعيين النموذج بعد النجاح
				setTimeout(() => {
					handleReset();
				}, 2000);
			} else {
				setNotification({
					message: 'حدث خطأ أثناء تسجيل البيانات',
					type: 'error',
					isVisible: true
				});
			}
		} catch (error) {
			setNotification({
				message: 'حدث خطأ أثناء تسجيل البيانات',
				type: 'error',
				isVisible: true
			});
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
			agreed: false,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="h-full w-full p-4 md:p-8">
			{/* تم إضافة هذا السطر */}
			<h2 className="mb-6 border-b-2 border-green-500 pb-2 text-right text-2xl font-bold text-green-600">
				معلومات مقدم الخدمة
			</h2>

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
				
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
						نوع العمل الخص بك
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
						<option value="freelancer">سباك</option>
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
						type="text"
						id="idImage"
						name="idImage"
						placeholder="url"
						onChange={handleChange}
						className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
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
			<div className="mt-8 flex flex-col-reverse justify-start gap-4 sm:flex-row">
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
			<Notification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
			/>
		</form>
	);
}
