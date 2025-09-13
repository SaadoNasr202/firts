"use client";

import { useEffect, useState } from "react";
import { MapPin, Edit3, User } from "lucide-react";

interface DeliveryAddressProps {
	onEditAddress?: () => void;
}

interface UserAddress {
	formattedAddress: string;
	lat: number;
	lng: number;
}

export default function DeliveryAddress({ onEditAddress }: DeliveryAddressProps) {
	const [address, setAddress] = useState<UserAddress | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const fetchUserAddress = async () => {
			try {
				// التحقق من تسجيل الدخول أولاً
				const loginResponse = await fetch("/api/is_logged_in");
				if (!loginResponse.ok) {
					setIsLoggedIn(false);
					setIsLoading(false);
					return;
				}

				setIsLoggedIn(true);

				// جلب عنوان المستخدم
				const addressResponse = await fetch("/api/address");
				if (addressResponse.ok) {
					const addressData = await addressResponse.json();
					if (addressData.address) {
						// تحويل العنوان من "lat,lng" إلى كائن
						const [lat, lng] = addressData.address.split(",").map(Number);
						
						// الحصول على العنوان المنسق من Google Maps
						const formattedAddress = await getFormattedAddress(lat, lng);
						
						setAddress({
							formattedAddress,
							lat,
							lng,
						});
					}
				}
			} catch (error) {
				console.error("خطأ في جلب عنوان المستخدم:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserAddress();
	}, []);

	const getFormattedAddress = async (lat: number, lng: number): Promise<string> => {
		try {
			// استخدام Google Geocoding API لتحويل الإحداثيات إلى عنوان
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ar`
			);
			
			if (response.ok) {
				const data = await response.json();
				if (data.results && data.results.length > 0) {
					return data.results[0].formatted_address;
				}
			}
		} catch (error) {
			console.error("خطأ في الحصول على العنوان المنسق:", error);
		}
		
		// في حالة الفشل، إرجاع الإحداثيات
		return `الموقع (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
	};

	// إذا لم يكن المستخدم مسجل دخول، لا نعرض شيء
	if (!isLoggedIn) {
		return null;
	}

	// شاشة التحميل
	if (isLoading) {
		return (
			<div className="mb-4 mr-4 w-fit">
				<div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
					<MapPin className="h-5 w-5 text-green-600" />
					<div className="flex items-center gap-2">
						<div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
						<span className="text-sm text-gray-500">جاري تحميل العنوان...</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mb-4 mr-4 w-fit">
			<div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md">
				<MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
				
				<div className="flex-1 min-w-0">
					<p className="text-xs text-gray-500 mb-1">التوصيل إلى</p>
					<p className="text-sm font-medium text-gray-800 truncate max-w-xs" title={address?.formattedAddress}>
						{address?.formattedAddress || "لم يتم تحديد العنوان"}
					</p>
				</div>

				<button
					onClick={onEditAddress}
					className="flex items-center gap-1 rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 flex-shrink-0"
				>
					<Edit3 className="h-3 w-3" />
					تغيير
				</button>
			</div>
		</div>
	);
}
