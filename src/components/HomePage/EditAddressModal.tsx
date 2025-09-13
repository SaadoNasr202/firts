"use client";

import { useEffect, useRef, useState } from "react";
import { X, MapPin } from "lucide-react";
import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface EditAddressModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentAddress?: {
		formattedAddress: string;
		lat: number;
		lng: number;
	} | null;
	onAddressUpdate: (newAddress: { formattedAddress: string; lat: number; lng: number }) => void;
}

const libraries: ("places")[] = ["places"];

export default function EditAddressModal({
	isOpen,
	onClose,
	currentAddress,
	onAddressUpdate,
}: EditAddressModalProps) {
	const [selectedAddress, setSelectedAddress] = useState<{
		formattedAddress: string;
		lat: number;
		lng: number;
	} | null>(null);
	const [location, setLocation] = useState<string>("");
	const [isGettingLocation, setIsGettingLocation] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
		libraries,
	});

	const defaultCenter = { lat: 24.7136, lng: 46.6753 }; // الرياض

	useEffect(() => {
		if (isOpen && currentAddress) {
			setSelectedAddress(currentAddress);
			setLocation(`${currentAddress.lat},${currentAddress.lng}`);
		} else if (!isOpen) {
			setSelectedAddress(null);
			setLocation("");
		}
	}, [isOpen, currentAddress]);

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

	const handleSave = async () => {
		if (!selectedAddress) return;

		setIsSaving(true);
		try {
			const response = await fetch("/api/address", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					address: `${selectedAddress.lat},${selectedAddress.lng}`,
				}),
			});

			if (response.ok) {
				onAddressUpdate(selectedAddress);
				onClose();
			} else {
				const errorData = await response.json();
				alert(errorData.error || "حدث خطأ أثناء تحديث العنوان");
			}
		} catch (error) {
			console.error("خطأ في تحديث العنوان:", error);
			alert("حدث خطأ أثناء تحديث العنوان");
		} finally {
			setIsSaving(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="relative flex h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-lg">
				{/* Header */}
				<div className="flex items-center justify-between border-b border-gray-200 p-6">
					<h2 className="text-xl font-semibold text-gray-800">تعديل عنوان التوصيل</h2>
					<button
						onClick={onClose}
						className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
						disabled={isSaving}
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 p-6">
					<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
						<p className="text-sm text-blue-800">
							💡 <strong>نصيحة:</strong> ابحث عن العنوان أو اضغط على الخريطة لتحديد الموقع، أو استخدم زر "📍 موقعي" للحصول على موقعك الحالي.
						</p>
					</div>

					<div className="flex-1 mb-4 rounded-lg overflow-hidden border border-gray-300 relative h-[400px]">
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

						<button
							onClick={handleGetCurrentLocation}
							disabled={isGettingLocation || isSaving}
							className={`absolute top-14 right-2 z-50 rounded-lg px-4 py-2 font-semibold shadow-lg transition flex items-center gap-2 ${
								isGettingLocation || isSaving
									? "bg-gray-400 cursor-not-allowed text-white"
									: "bg-blue-500 hover:bg-blue-600 text-white"
							}`}
						>
							{isGettingLocation ? (
								<>
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									جاري...
								</>
							) : (
								<>
									<MapPin className="h-4 w-4" />
									موقعي
								</>
							)}
						</button>

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

					{selectedAddress && (
						<div className="mb-4 p-4 bg-gray-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-1">العنوان الجديد:</p>
							<p className="text-gray-800 font-medium">{selectedAddress.formattedAddress}</p>
							<p className="text-xs text-gray-500 mt-1">
								الإحداثيات: {selectedAddress.lat.toFixed(6)}, {selectedAddress.lng.toFixed(6)}
							</p>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex gap-3 justify-end border-t border-gray-200 p-6">
					<button
						onClick={onClose}
						disabled={isSaving}
						className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						إلغاء
					</button>
					<button
						onClick={handleSave}
						disabled={!selectedAddress || isSaving}
						className={`rounded-lg px-6 py-2 text-white font-medium ${
							selectedAddress && !isSaving
								? "bg-green-600 hover:bg-green-700"
								: "bg-gray-300 cursor-not-allowed"
						}`}
					>
						{isSaving ? (
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								جاري الحفظ...
							</div>
						) : (
							"حفظ العنوان"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
