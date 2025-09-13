"use client";

import { registerFormSchema } from "@/lib/types/authSchemas";
import { RegisterFormError } from "@/lib/types/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

interface AddressModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddressSelect: (address: { formattedAddress: string; lat: number; lng: number }) => void;
}

function AddressModal({ isOpen, onClose, onAddressSelect }: AddressModalProps) {
	const [selectedAddress, setSelectedAddress] = useState<{
		formattedAddress: string;
		lat: number;
		lng: number;
	} | null>(null);
	const [location, setLocation] = useState<string>("");
	const [isGettingLocation, setIsGettingLocation] = useState(false);
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
		libraries,
	});

	const defaultCenter = { lat: 24.7136, lng: 46.6753 }; // الرياض

	// تنظيف عند إغلاق النافذة
	useEffect(() => {
		if (!isOpen) {
			setSelectedAddress(null);
			setLocation("");
		}
	}, [isOpen]);

	// الحصول على العنوان من الإحداثيات
	const getAddressFromCoords = async (lat: number, lng: number): Promise<string> => {
		const geocoder = new google.maps.Geocoder();
		try {
			const result = await geocoder.geocode({ location: { lat, lng } });
			if (result.results && result.results.length > 0) {
				return result.results[0].formatted_address;
			}
		} catch (error) {
			console.error("خطأ في الحصول على العنوان:", error);
		}
		return `الموقع (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
	};

	// معالجة البحث التلقائي
	const handlePlaceChanged = async () => {
		if (autocompleteRef.current) {
			const place = autocompleteRef.current.getPlace();
			if (place.geometry?.location) {
				const lat = place.geometry.location.lat();
				const lng = place.geometry.location.lng();
				
				setLocation(`${lat},${lng}`);
				
				const address = await getAddressFromCoords(lat, lng);
				setSelectedAddress({
					formattedAddress: address,
					lat,
					lng,
				});
			}
		}
	};

	// معالجة النقر على الخريطة
	const handleMapClick = async (e: google.maps.MapMouseEvent) => {
		if (e.latLng) {
			const lat = e.latLng.lat();
			const lng = e.latLng.lng();
			
			setLocation(`${lat},${lng}`);
			
			const address = await getAddressFromCoords(lat, lng);
			setSelectedAddress({
				formattedAddress: address,
				lat,
				lng,
			});
		}
	};

	// الحصول على الموقع الحالي
	const handleGetCurrentLocation = () => {
		setIsGettingLocation(true);
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					const lat = pos.coords.latitude;
					const lng = pos.coords.longitude;
					
					setLocation(`${lat},${lng}`);
					
					const address = await getAddressFromCoords(lat, lng);
					setSelectedAddress({
						formattedAddress: address,
						lat,
						lng,
					});
					
					setIsGettingLocation(false);
				},
				(error) => {
					let errorMessage = "فشل في الحصول على موقعك";
					switch (error.code) {
						case 1:
							errorMessage = "تم رفض الإذن للوصول للموقع";
							break;
						case 2:
							errorMessage = "معلومات الموقع غير متوفرة";
							break;
						case 3:
							errorMessage = "انتهت مهلة الحصول على الموقع";
							break;
					}
					alert(errorMessage);
					setIsGettingLocation(false);
				}
			);
		} else {
			alert("خدمة تحديد الموقع غير متوفرة في متصفحك");
			setIsGettingLocation(false);
		}
	};

	const handleConfirm = () => {
		if (selectedAddress) {
			onAddressSelect(selectedAddress);
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-[90%] max-w-4xl h-[80%] flex flex-col">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-[#00203F]">اختر موقعك</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 text-2xl"
					>
						×
					</button>
				</div>

				{/* تعليمات استخدام الموقع */}
				<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
					<p className="text-sm text-blue-800">
						💡 <strong>نصيحة:</strong> ابحث عن العنوان أو اضغط على الخريطة لتحديد الموقع، أو استخدم زر "📍 موقعي" للحصول على موقعك الحالي.
					</p>
				</div>

				{/* الخريطة مع البحث */}
				<div className="flex-1 mb-4 rounded-lg overflow-hidden border border-gray-300 relative">
					{/* شريط البحث فوق الخريطة */}
					{isLoaded && (
						<div className="absolute top-2 left-1/2 z-50 w-[300px] -translate-x-1/2">
							<Autocomplete
								onLoad={(ac) => (autocompleteRef.current = ac)}
								onPlaceChanged={handlePlaceChanged}
							>
								<input
									type="text"
									placeholder="ابحث عن العنوان..."
									className="w-full rounded-lg border bg-white px-4 py-2 shadow focus:outline-none"
								/>
							</Autocomplete>
						</div>
					)}

					{/* زر موقعي */}
					<button
						onClick={handleGetCurrentLocation}
						disabled={isGettingLocation}
						className={`absolute top-14 right-2 z-50 rounded-lg px-4 py-2 font-semibold shadow-lg transition flex items-center gap-2 ${
							isGettingLocation 
								? 'bg-gray-400 cursor-not-allowed text-white' 
								: 'bg-blue-500 hover:bg-blue-600 text-white'
						}`}
					>
						{isGettingLocation ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								جاري...
							</>
						) : (
							<>
								📍 موقعي
							</>
						)}
					</button>

					{/* الخريطة */}
					{isLoaded ? (
						<GoogleMap
							mapContainerStyle={{ width: "100%", height: "100%" }}
							center={
								location
									? {
											lat: parseFloat(location.split(",")[0]),
											lng: parseFloat(location.split(",")[1]),
										}
									: defaultCenter
							}
							zoom={location ? 15 : 10}
							onClick={handleMapClick}
						>
							{location && (
								<Marker
									position={{
										lat: parseFloat(location.split(",")[0]),
										lng: parseFloat(location.split(",")[1]),
									}}
								/>
							)}
						</GoogleMap>
					) : (
						<div className="w-full h-full bg-gray-200 flex items-center justify-center">
							<div className="text-gray-500 text-center">
								<div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
								جاري تحميل الخريطة...
							</div>
						</div>
					)}
				</div>

				{/* العنوان المحدد */}
				{selectedAddress && (
					<div className="mb-4 p-3 bg-gray-100 rounded-lg">
						<p className="text-sm text-gray-600 mb-1">العنوان المحدد:</p>
						<p className="text-[#00203F] font-medium">{selectedAddress.formattedAddress}</p>
						<p className="text-xs text-gray-500 mt-1">
							الإحداثيات: {selectedAddress.lat.toFixed(6)}, {selectedAddress.lng.toFixed(6)}
						</p>
					</div>
				)}

				{/* أزرار التحكم */}
				<div className="flex gap-3 justify-end">
					<button
						onClick={onClose}
						className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
					>
						إلغاء
					</button>
					<button
						onClick={handleConfirm}
						disabled={!selectedAddress}
						className="px-6 py-2 bg-[#ADF0D1] text-[#00203F] rounded-lg hover:bg-[#9de0c1] disabled:opacity-50 disabled:cursor-not-allowed"
					>
						تأكيد العنوان
					</button>
				</div>
			</div>
		</div>
	);
}

export function RegisterForm({
	registerAction,
}: {
	registerAction: (
		input: z.infer<typeof registerFormSchema>,
	) => Promise<RegisterFormError | undefined | { field: string; message: string }>;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

	useEffect(() => {
		async function checkLoginStatus() {
			try {
				const response = await fetch("/api/is_logged_in");
				if (!response.ok) {
					setIsLoading(false);
					return;
				}

				const data = await response.json();
				if (data.isLoggedIn) {
					router.push("/profile");
				} else {
					setIsLoading(false);
				}
			} catch (error) {
				console.error("خطأ في التحقق من حالة تسجيل الدخول:", error);
				setIsLoading(false);
			}
		}

		checkLoginStatus();
	}, [router]);

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			fullName: "",
			phoneNumber: "",
			birthDate: undefined,
			email: "",
			password: "",
			confirmPassword: "",
			address: {
				formattedAddress: "",
				lat: 0,
				lng: 0,
			},
		},
	});

	async function onSubmit(values: z.infer<typeof registerFormSchema>) {
		setIsSubmitting(true);
		const error = await registerAction(values);

		if (error) {
			if (error.field === "email") {
				form.setError("email", { message: error.message });
			} else if (error.field === "phoneNumber") {
				form.setError("phoneNumber", { message: error.message });
			} else if (error.field === "root") {
				form.setError("root", { message: error.message });
			}
			setIsSubmitting(false);
		} else {
			// التسجيل نجح، انتقل إلى صفحة تسجيل الدخول
			router.push("/login?registered=true");
		}
	}

	const handleAddressSelect = (address: { formattedAddress: string; lat: number; lng: number }) => {
		form.setValue("address", address);
	};

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
			</div>
		);
	}

	return (
		<>
			<div
				className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#00203F] to-[#00001a]"
				style={{
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div
					className="flex w-[90%] max-w-4xl items-center justify-center rounded-lg p-6 shadow-lg backdrop-blur-md"
					style={{
						backgroundImage: "url('../image/authImage/AuthBG.jpg')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						minHeight: "600px",
						boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.2)",
						transform: "translateY(-10px)",
					}}
				>
					<div className="flex w-full flex-col items-center">
						<h2 className="mb-6 text-3xl font-semibold text-white">
							إنشاء حساب جديد
						</h2>
						<div
							className="flex w-full max-w-2xl flex-col rounded-lg bg-gradient-to-b from-[#003a57] to-[#004a63] p-6"
							style={{
								minHeight: "500px",
								boxShadow:
									"0 10px 15px -3px rgba(0, 32, 63, 0.5), 0 4px 6px rgba(0, 32, 63, 0.3)",
								overflow: "auto",
							}}
						>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									{/* الاسم الكامل */}
									<FormField
										control={form.control}
										name="fullName"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="الاسم الكامل"
														{...field}
														className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800"
													/>
												</FormControl>
												<FormMessage className="text-red-400" />
											</FormItem>
										)}
									/>

									{/* رقم الهاتف */}
									<FormField
										control={form.control}
										name="phoneNumber"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="رقم الهاتف (05xxxxxxxx)"
														{...field}
														className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800"
													/>
												</FormControl>
												<FormMessage className="text-red-400" />
											</FormItem>
										)}
									/>

									{/* تاريخ الميلاد */}
									<FormField
										control={form.control}
										name="birthDate"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														type="date"
														{...field}
														value={field.value ? field.value.toISOString().split('T')[0] : ''}
														onChange={(e) => field.onChange(new Date(e.target.value))}
														className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800"
													/>
												</FormControl>
												<FormMessage className="text-red-400" />
											</FormItem>
										)}
									/>

									{/* البريد الإلكتروني */}
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														type="email"
														placeholder="البريد الإلكتروني"
														{...field}
														className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800"
													/>
												</FormControl>
												<FormMessage className="text-red-400" />
											</FormItem>
										)}
									/>

									{/* كلمة المرور */}
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="relative">
														<Input
															type={showPassword ? "text" : "password"}
															placeholder="كلمة المرور"
															{...field}
															className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800"
														/>
														<button
															type="button"
															onClick={() => setShowPassword(!showPassword)}
															className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
														>
															{showPassword ? (
																<EyeOff className="h-5 w-5" />
															) : (
																<Eye className="h-5 w-5" />
															)}
														</button>
													</div>
												</FormControl>
												<FormMessage className="text-red-400" />
											</FormItem>
										)}
									/>

									{/* تأكيد كلمة المرور */}
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="relative">
														<Input
															type={showConfirmPassword ? "text" : "password"}
															placeholder="تأكيد كلمة المرور"
															{...field}
															className="w-full rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800"
														/>
														<button
															type="button"
															onClick={() => setShowConfirmPassword(!showConfirmPassword)}
															className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
														>
															{showConfirmPassword ? (
																<EyeOff className="h-5 w-5" />
															) : (
																<Eye className="h-5 w-5" />
															)}
														</button>
													</div>
												</FormControl>
												<FormMessage className="text-red-400" />
											</FormItem>
										)}
									/>

									{/* العنوان */}
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="space-y-2">
														<button
															type="button"
															onClick={() => setIsAddressModalOpen(true)}
															className="w-full flex items-center justify-center gap-2 rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200"
														>
															<MapPin className="h-5 w-5" />
															{field.value?.formattedAddress ? "تم اختيار العنوان" : "اختر العنوان من الخريطة"}
														</button>
														{field.value?.formattedAddress && (
															<div className="text-xs text-gray-300 px-2 space-y-1">
																<div>{field.value.formattedAddress}</div>
																<div className="text-green-400">
																	الإحداثيات: {field.value.lat.toFixed(6)}, {field.value.lng.toFixed(6)}
																</div>
															</div>
														)}
													</div>
												</FormControl>
												<FormMessage className="text-red-400" />
											</FormItem>
										)}
									/>

									<Button
										disabled={isSubmitting}
										className="w-full rounded bg-[#ADF0D1] py-2 text-[#00203F] hover:text-[#ADF0D1]"
										type="submit"
									>
										{isSubmitting ? (
											<div className="flex items-center justify-center">
												<div className="h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-[#00203F]"></div>
											</div>
										) : (
											"إنشاء حساب"
										)}
									</Button>
								</form>
							</Form>

							{/* رابط تسجيل الدخول */}
							<div className="mt-4 text-center">
								<p className="text-gray-300">
									لديك حساب بالفعل؟{" "}
									<button
										onClick={() => router.push("/login")}
										className="text-[#ADF0D1] hover:underline"
									>
										تسجيل الدخول
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* نافذة اختيار العنوان */}
			<AddressModal
				isOpen={isAddressModalOpen}
				onClose={() => setIsAddressModalOpen(false)}
				onAddressSelect={handleAddressSelect}
			/>
		</>
	);
}
