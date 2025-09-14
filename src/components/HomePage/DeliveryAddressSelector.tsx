"use client";

import { useEffect, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";

interface Address {
	id: string;
	address: string;
	createdAt: string;
	formattedAddress?: string;
}

interface DeliveryAddressSelectorProps {
	onAddressChange?: (address: Address | null) => void;
}

export default function DeliveryAddressSelector({ onAddressChange }: DeliveryAddressSelectorProps) {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(true);

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
	);
}
