import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function HelpAndSupport() {
	return (
		<div className="flex flex-col">
			<h2 className="mb-8 text-right text-2xl font-bold text-gray-800">
				المساعدة والدعم
			</h2>

			{/* صورة الدعم Placeholder */}
			<div className="flex justify-center mb-8">
				<img
					src="helpsupport.jpg"
					alt="Support"
					className="w-full h-auto rounded-lg"
				/>
			</div>

			<div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
				{/* قسم العناوين */}
				<div className="flex items-center flex-row-reverse justify-between pb-4 border-b border-gray-200">
					<div className="flex items-center flex-row-reverse space-x-2">
						<FaMapMarkerAlt className="text-2xl text-green-600" />
						<div className="flex flex-col text-right">
							<span className="font-semibold text-lg text-gray-900">عناويننا</span>
							<span className="text-sm text-gray-500">ksa, saudi arabia , umm al hammam</span>
						</div>
					</div>
				</div>

				{/* قسم اتصل بنا */}
				<div className="flex items-center flex-row-reverse justify-between pb-4 border-b border-gray-200">
					<div className="flex items-center flex-row-reverse space-x-2">
						<FaPhone className="text-2xl text-green-600" />
						<div className="flex flex-col text-right">
							<span className="font-semibold text-lg text-gray-900">اتصل بنا</span>
							<span className="text-sm text-gray-500">+966-5999-777-25</span>
						</div>
					</div>
				</div>

				{/* قسم راسلنا */}
				<div className="flex items-center flex-row-reverse justify-between">
					<div className="flex items-center flex-row-reverse space-x-2">
						<FaEnvelope className="text-2xl text-green-600" />
						<div className="flex flex-col text-right">
							<span className="font-semibold text-lg text-gray-900">راسلنا عبر بريدنا الالكتروني</span>
							<span className="text-sm text-gray-500">shalafood@gmail.com</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}