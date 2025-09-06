// src/components/ImageSlider.tsx

"use client";

import { useEffect, useState } from "react";

const Images = [{ id: 1, url: "/partner.jpg", thumbnail: "/partner.jpg" }];

export default function ImagePartnerSlider() {
	const [mainImage, setMainImage] = useState(Images[0]);

	// دالة للتقدم إلى الصورة التالية
	const handleNextImage = () => {
		setMainImage((prevImage) => {
			const currentIndex = Images.findIndex((img) => img.id === prevImage.id);
			const nextIndex = (currentIndex + 1) % Images.length;
			return Images[nextIndex];
		});
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			handleNextImage();
		}, 5000);

		// تنظيف المؤقت عند تفكيك المكون لتجنب تسرب الذاكرة
		return () => clearInterval(intervalId);
	}, []); // تمرير مصفوفة فارغة لضمان تشغيل التأثير مرة واحدة فقط عند التحميل

	// دالة للعودة إلى الصورة السابقة (منطق التنقل اليدوي)
	const handlePrevImage = () => {
		const currentIndex = Images.findIndex((img) => img.id === mainImage.id);
		const prevIndex = (currentIndex - 1 + Images.length) % Images.length;
		setMainImage(Images[prevIndex]);
	};

	return (
		<div className="flex flex-col items-center">
			{/* حاوية الصور المصغرة */}
			<div className="mb-4 flex flex-row-reverse justify-center gap-2">
				{Images.map((image) => (
					<div
						key={image.id}
						className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-full shadow-md transition-all duration-300 ${
							mainImage.id === image.id
								? "ring-2 ring-green-500 ring-offset-2"
								: ""
						}`}
						onClick={() => setMainImage(image)}
					>
						<img
							src={image.thumbnail}
							alt={`Thumbnail ${image.id}`}
							className="h-full w-full object-cover"
						/>
					</div>
				))}
			</div>

			{/* حاوية الصورة الرئيسية والأسهم */}
			<div className="relative w-full">
				<img
					key={mainImage.id}
					src={mainImage.url}
					alt={`Main image ${mainImage.id}`}
					className="aspect-video w-full rounded-lg object-cover shadow-md"
				/>

				{/* سهم التنقل الأيسر (السابق) */}
				<button
					className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:scale-110"
					onClick={handlePrevImage}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				{/* سهم التنقل الأيمن (التالي) */}
				<button
					className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:scale-110"
					onClick={handleNextImage}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
