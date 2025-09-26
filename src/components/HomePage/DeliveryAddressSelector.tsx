"use client";

import { useEffect, useState } from "react";
import { MapPin, ChevronDown, Plus, Map } from "lucide-react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

interface Address {
	id: string;
	address: string;
	createdAt: string;
	formattedAddress?: string;
	lat?: number;
	lng?: number;
}

interface DeliveryAddressSelectorProps {
	onAddressChange?: (address: Address | null) => void;
}

export default function DeliveryAddressSelector({ onAddressChange }: DeliveryAddressSelectorProps) {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showMapModal, setShowMapModal] = useState(false);

	// تحميل مكتبة جوجل
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
		libraries: ["places", "geometry"],
	});

	// جلب العناوين من API
	useEffect(() => {
		let isMounted = true;
		
		async function fetchAddresses() {
			try {
				const res = await fetch("/api/address");
				const data = await res.json();
				const addressesData = data.addresses || [];
				
				// تحويل الإحداثيات إلى عناوين نصية
				const addressesWithFormatted = await Promise.all(
					addressesData.map(async (address: Address) => {
						try {
							// التحقق من أن العنوان يحتوي على إحداثيات
							const [lat, lng] = address.address.split(",").map(Number);
							if (isNaN(lat) || isNaN(lng)) {
								// إذا لم تكن إحداثيات، نرجع العنوان كما هو
								return { ...address, formattedAddress: address.address };
							}
							
							// التحقق من أن Google Maps API محمل
							if (typeof google === 'undefined' || !google.maps || !google.maps.Geocoder) {
								console.warn("Google Maps API not loaded, using coordinates as fallback");
								return { ...address, formattedAddress: address.address };
							}
							
							// استخدام Google Geocoder لتحويل الإحداثيات
							const geocoder = new google.maps.Geocoder();
							const formattedAddress = await new Promise<string>((resolve) => {
								geocoder.geocode({ location: { lat, lng } }, (results, status) => {
									if (status === 'OK' && results && results.length > 0) {
										resolve(results[0].formatted_address);
									} else {
										console.warn("Geocoding failed:", status);
										resolve(address.address);
									}
								});
							});
							
							return { ...address, formattedAddress };
						} catch (error) {
							console.error("Error converting coordinates:", error);
							return { ...address, formattedAddress: address.address };
						}
					})
				);
				
				// التحقق من أن المكون ما زال محملاً
				if (isMounted) {
					setAddresses(addressesWithFormatted);
					// تحديد أول عنوان كافتراضي
					if (addressesWithFormatted.length > 0) {
						setSelectedAddress(addressesWithFormatted[0]);
						onAddressChange?.(addressesWithFormatted[0]);
					}
				}
			} catch (err) {
				console.error("Error fetching addresses:", err);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}
		
		// انتظار تحميل Google Maps API
		if (isLoaded) {
			fetchAddresses();
		}
		
		// Cleanup function
		return () => {
			isMounted = false;
		};
	}, [isLoaded]); // إزالة onAddressChange من dependencies

	const handleAddressSelect = (address: Address) => {
		setSelectedAddress(address);
		setIsOpen(false);
		onAddressChange?.(address);
	};

	const handleMapLocationSelect = (lat: number, lng: number, formattedAddress: string) => {
		const newAddress: Address = {
			id: `temp_${Date.now()}`,
			address: `${lat},${lng}`,
			formattedAddress,
			lat,
			lng,
			createdAt: new Date().toISOString()
		};
		
		setSelectedAddress(newAddress);
		setIsOpen(false);
		setShowMapModal(false);
		onAddressChange?.(newAddress);
	};

	if (loading) {
		return (
			<div className="mb-4 flex items-center justify-center rounded-lg border border-gray-200 bg-white p-3">
				<div className="flex items-center gap-2 text-gray-500">
					<div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
					<span className="text-xs">جارٍ تحميل العناوين...</span>
				</div>
			</div>
		);
	}

	if (addresses.length === 0) {
		return (
			<div className="mb-4 rounded-lg border border-gray-200 bg-white p-3">
				<div className="flex items-center gap-2 text-gray-500">
					<MapPin className="h-3 w-3" />
					<span className="text-xs">لا توجد عناوين محفوظة</span>
				</div>
			</div>
		);
	}

	return (
		<>
		<div className="mb-4">
			<div className="relative">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-right shadow-sm transition-colors hover:bg-gray-50"
				>
					<ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
					<div className="flex-1">
						<div className="flex items-center gap-2 text-xs text-gray-500">
							<MapPin className="h-3 w-3" />
							<span>عنوان التوصيل</span>
						</div>
						<div className="mt-1 text-xs font-medium text-gray-800 line-clamp-2">
							{selectedAddress?.formattedAddress || selectedAddress?.address || "اختر عنوان"}
						</div>
					</div>
				</button>

				{isOpen && (
					<div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
						{/* زر اختيار موقع جديد */}
						<button
							onClick={() => setShowMapModal(true)}
							className="w-full p-3 text-right transition-colors hover:bg-green-50 border-b border-gray-100"
						>
							<div className="flex items-center gap-2">
								<Plus className="h-4 w-4 text-green-600" />
								<div className="flex-1">
									<div className="text-xs font-medium text-green-600">
										اختيار موقع جديد من الخريطة
									</div>
									<div className="text-xs text-gray-500">
										اضغط لتحديد موقعك على الخريطة
									</div>
								</div>
								<Map className="h-4 w-4 text-green-600" />
							</div>
						</button>
						
						{/* العناوين المحفوظة */}
						{addresses.map((address) => (
							<button
								key={address.id}
								onClick={() => handleAddressSelect(address)}
								className={`w-full p-3 text-right transition-colors hover:bg-gray-50 ${
									selectedAddress?.id === address.id ? 'bg-blue-50' : ''
								}`}
							>
								<div className="flex items-start gap-2">
									<MapPin className="mt-0.5 h-3 w-3 text-gray-400" />
									<div className="flex-1">
										<div className="text-xs font-medium text-gray-800 line-clamp-2">
											{address.formattedAddress || address.address}
										</div>
										<div className="text-xs text-gray-500">
											{new Date(address.createdAt).toLocaleDateString('ar-SA')}
										</div>
									</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
		{/* مودال الخريطة */}
		{showMapModal && (
			<MapLocationModal
				isOpen={showMapModal}
				onClose={() => setShowMapModal(false)}
				onLocationSelect={handleMapLocationSelect}
				isLoaded={isLoaded}
			/>
		)}
	</>
	);
}

// مكون مودال الخريطة
interface MapLocationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLocationSelect: (lat: number, lng: number, formattedAddress: string) => void;
	isLoaded: boolean;
}

function MapLocationModal({ isOpen, onClose, onLocationSelect, isLoaded }: MapLocationModalProps) {
	const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
	const [formattedAddress, setFormattedAddress] = useState<string>("");

	useEffect(() => {
		if (isOpen && isLoaded) {
			// تحديد موقع افتراضي (الرياض)
			const defaultLocation = { lat: 24.7136, lng: 46.6753 };
			setSelectedLocation(defaultLocation);
			
			// الحصول على العنوان المنسق للموقع الافتراضي
			if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder) {
				const geocoder = new google.maps.Geocoder();
				geocoder.geocode({ location: defaultLocation }, (results, status) => {
					if (status === 'OK' && results && results.length > 0) {
						setFormattedAddress(results[0].formatted_address);
					}
				});
			}
		}
	}, [isOpen, isLoaded]);

	const handleMapClick = (event: google.maps.MapMouseEvent) => {
		if (event.latLng) {
			const lat = event.latLng.lat();
			const lng = event.latLng.lng();
			setSelectedLocation({ lat, lng });
			
			// الحصول على العنوان المنسق
			if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder) {
				const geocoder = new google.maps.Geocoder();
				geocoder.geocode({ location: { lat, lng } }, (results, status) => {
					if (status === 'OK' && results && results.length > 0) {
						setFormattedAddress(results[0].formatted_address);
					} else {
						setFormattedAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
					}
				});
			}
		}
	};

	const handleConfirm = () => {
		if (selectedLocation) {
			onLocationSelect(selectedLocation.lat, selectedLocation.lng, formattedAddress);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h3 className="text-lg font-semibold text-gray-900">اختيار موقعك</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Map Container */}
				<div className="h-96 relative">
					{isLoaded ? (
						<GoogleMap
							mapContainerStyle={{ width: '100%', height: '100%' }}
							center={selectedLocation || { lat: 24.7136, lng: 46.6753 }}
							zoom={13}
							onClick={handleMapClick}
							options={{
								streetViewControl: false,
								mapTypeControl: false,
								fullscreenControl: false,
							}}
						>
							{selectedLocation && (
								<Marker
									position={selectedLocation}
									icon={{
										url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
											<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
												<circle cx="16" cy="16" r="12" fill="#3B82F6" stroke="white" stroke-width="3"/>
												<circle cx="16" cy="16" r="6" fill="white"/>
											</svg>
										`),
										scaledSize: new google.maps.Size(32, 32),
									}}
								/>
							)}
						</GoogleMap>
					) : (
						<div className="flex items-center justify-center h-full bg-gray-100">
							<div className="text-center">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
								<p className="text-gray-600">جارٍ تحميل الخريطة...</p>
							</div>
						</div>
					)}
				</div>

				{/* Address Display */}
				{selectedLocation && (
					<div className="p-4 border-t bg-gray-50">
						<div className="flex items-center gap-2 mb-2">
							<MapPin className="h-4 w-4 text-blue-600" />
							<span className="text-sm font-medium text-gray-700">الموقع المحدد:</span>
						</div>
						<p className="text-sm text-gray-600 mb-3">{formattedAddress}</p>
						<div className="flex gap-2">
							<button
								onClick={handleConfirm}
								className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
							>
								تأكيد الموقع
							</button>
							<button
								onClick={onClose}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								إلغاء
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
