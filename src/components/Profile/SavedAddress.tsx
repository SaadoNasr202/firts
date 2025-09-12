"use client";
import {
	Autocomplete,
	GoogleMap,
	Marker,
	useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

interface SavedAddressProps {
	setActivePage: (page: string) => void;
}

export default function SavedAddress({ setActivePage }: SavedAddressProps) {
	const [location, setLocation] = useState<string>(""); // lat,lng
	const [addressText, setAddressText] = useState<string>(""); // النص
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);

	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

	// تحميل مكتبة جوجل
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
		libraries: ["places"],
	});

	// جلب العنوان من DB
	useEffect(() => {
		async function fetchAddress() {
			try {
				const res = await fetch("/api/address");
				const data = await res.json();
				setLocation(data.address || "");
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		fetchAddress();
	}, []);

	// تحويل الإحداثيات إلى عنوان نصي
	useEffect(() => {
		if (!isLoaded || !location) return;

		const geocoder = new google.maps.Geocoder();
		const [lat, lng] = location.split(",").map(Number);

		geocoder.geocode({ location: { lat, lng } }, (results, status) => {
			if (!results || results.length === 0) {
				setAddressText("عنوان غير متوفر");
				return;
			}
			setAddressText(results[0].formatted_address);
		});
	}, [isLoaded, location]);

	// عند اختيار مكان من البحث
	function handlePlaceChanged() {
		const place = autocompleteRef.current?.getPlace();
		if (place?.geometry?.location) {
			const lat = place.geometry.location.lat();
			const lng = place.geometry.location.lng();
			setLocation(`${lat},${lng}`);
		}
	}

	// حفظ العنوان الجديد
	async function handleConfirm() {
		try {
			await fetch("/api/address", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ address: location }),
			});
			alert("تم تحديث العنوان بنجاح!");
			setIsEditing(false);
		} catch (err) {
			console.error(err);
			alert("حدث خطأ أثناء تحديث العنوان");
		}
	}

	if (loading) return <div className="p-8 text-center">جارٍ التحميل...</div>;

	const lat = parseFloat(location.split(",")[0]) || 24.7136;
	const lng = parseFloat(location.split(",")[1]) || 46.6753;

	return (
		<div className="flex flex-col">
			<h2 className="mb-4 text-right text-2xl font-bold text-gray-800">
				العنوان على الخريطة
			</h2>

			{/* العرض الحالي */}
			{!isEditing && (
				<div className="flex flex-col items-center gap-4">
					{/* الخريطة الصغيرة */}
					<div className="h-[250px] w-full overflow-hidden rounded-lg shadow">
						{isLoaded && (
							<GoogleMap
								mapContainerStyle={{ width: "100%", height: "100%" }}
								center={{ lat, lng }}
								zoom={14}
							>
								<Marker position={{ lat, lng }} />
							</GoogleMap>
						)}
					</div>

					{/* النص */}
					<p className="text-gray-700">
						📍 العنوان الحالي:{" "}
						<span className="font-semibold">
							{addressText || "جارٍ جلب العنوان..."}
						</span>
					</p>

					{/* زر التغيير */}
					<button
						onClick={() => setIsEditing(true)}
						className="rounded-md border border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-100"
					>
						تغيير العنوان
					</button>
				</div>
			)}

			{/* وضع التعديل */}
			{isEditing && (
				<div className="mt-6">
					<div className="relative h-[400px] w-full">
						{isLoaded && (
							<div className="absolute top-2 left-1/2 z-50 flex w-[320px] -translate-x-1/2 gap-2">
								{/* البحث */}
								<Autocomplete
									onLoad={(ac) => (autocompleteRef.current = ac)}
									onPlaceChanged={handlePlaceChanged}
								>
									<input
										type="text"
										placeholder="ابحث عن موقعك..."
										className="w-full rounded-lg border bg-white px-4 py-2 shadow focus:outline-none"
									/>
								</Autocomplete>

								{/* زر موقعي */}
								<button
									onClick={() => {
										if (navigator.geolocation) {
											navigator.geolocation.getCurrentPosition(
												(pos) => {
													const lat = pos.coords.latitude;
													const lng = pos.coords.longitude;
													setLocation(`${lat},${lng}`);
												},
												() => alert("تعذر تحديد موقعك!"),
											);
										} else {
											alert("المتصفح لا يدعم تحديد الموقع");
										}
									}}
									className="rounded-lg bg-green-600 px-3 py-2 text-white shadow hover:bg-green-700"
								>
									موقعي
								</button>
							</div>
						)}

						{isLoaded ? (
							<GoogleMap
								mapContainerStyle={{ width: "100%", height: "100%" }}
								center={{ lat, lng }}
								zoom={12}
								onClick={(e) => {
									if (e.latLng) {
										const lat = e.latLng.lat();
										const lng = e.latLng.lng();
										setLocation(`${lat},${lng}`);
									}
								}}
							>
								{location && <Marker position={{ lat, lng }} />}
							</GoogleMap>
						) : (
							<p>جارٍ تحميل الخريطة...</p>
						)}
					</div>

					{/* الأزرار */}
					<div className="mt-6 flex flex-col-reverse items-center gap-4 md:flex-row-reverse">
						<button
							onClick={handleConfirm}
							className="w-full rounded-md bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700 md:w-auto"
						>
							تأكيد العنوان
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-100 md:w-auto"
						>
							إلغاء
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
