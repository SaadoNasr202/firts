import React from 'react';
import { FaMapMarkerAlt, FaHome, FaBriefcase, FaPlus, FaLock } from 'react-icons/fa';

export default function NewAddress() {
	return (
		<div className="flex flex-col">
			<h2 className="mb-8 text-right text-2xl font-bold text-gray-800">
				عنوان جديد
			</h2>
			<div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
				{/* Map Section */}
				<div className="space-y-4">
					<h3 className="text-right font-semibold text-gray-800">أضف عنواناً جديداً</h3>
					<div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
						{/* Map Placeholder */}
						<div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/600x200.png?text=Map+Placeholder')" }}></div>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<FaMapMarkerAlt className="text-4xl text-green-600" />
						</div>
					</div>
					<p className="text-center text-sm text-green-600">أضف الموقع بشكل صحيح</p>
				</div>

				{/* Location Naming (now responsive) */}
				<div className="space-y-4">
					<h3 className="text-right font-semibold text-gray-800">تسمية الموقع</h3>
					<div className="flex flex-row-reverse flex-wrap justify-end gap-4">
						<div className="flex items-center justify-center w-24 h-12 border border-gray-300 rounded-lg cursor-pointer">
							<FaBriefcase className="text-gray-500" />
						</div>
						<div className="flex items-center justify-center w-24 h-12 border border-gray-300 rounded-lg cursor-pointer">
							<FaHome className="text-gray-500" />
						</div>
						<div className="flex items-center justify-center w-24 h-12 border border-gray-300 rounded-lg cursor-pointer">
							<FaPlus className="text-gray-500" />
						</div>
					</div>
				</div>

				{/* Form Fields */}
				<div className="space-y-4">
					<div className="text-right">
						<label className="block text-sm font-medium text-gray-700">عنوان التسليم</label>
						<input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-right" value="الرياض, 12395, السعودية" disabled />
					</div>
					<div className="text-right">
						<label className="block text-sm font-medium text-gray-700">اسم الاتصال</label>
						<input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-right" placeholder="ناصر" />
					</div>
					<div className="text-right">
						<label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
						<div className="mt-1 flex flex-row-reverse rounded-md border border-gray-300 shadow-sm">
							<input type="text" className="block w-full rounded-l-md p-3 text-right" placeholder="9665xxxxx" />
							<span className="inline-flex items-center rounded-r-md border-r border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
								+966
							</span>
						</div>
					</div>
					<div className="text-right">
						<label className="block text-sm font-medium text-gray-700">اسم الشارع</label>
						<input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-right" placeholder="اسم الشارع (اختياري)" />
					</div>
					<div className="text-right">
						<label className="block text-sm font-medium text-gray-700">المنزل</label>
						<input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-right" placeholder="رقمية (اختياري)" />
					</div>
				</div>

				{/* Submit Button */}
				<div className="pt-4">
					<button className="w-full rounded-md bg-green-600 py-3 font-bold text-white transition-colors hover:bg-green-700">
						تأكيد العنوان
					</button>
				</div>
			</div>
		</div>
	);
}