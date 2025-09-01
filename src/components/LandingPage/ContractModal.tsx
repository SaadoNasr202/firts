// src/components/Condetion/ContractModal.tsx
"use client";

import { useEffect } from "react";

interface ContractModalProps {
	isOpen: boolean;
	onClose: () => void;
	fileUrl: string;
}

export default function ContractModal({
	isOpen,
	onClose,
	fileUrl,
}: ContractModalProps) {
	// إغلاق النافذة عند الضغط على زر Escape
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			// منع التمرير عند فتح النافذة
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			// إعادة التمرير عند إغلاق النافذة
			document.body.style.overflow = "auto";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
			<div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
				{/* رأس النافذة */}
				<div className="flex items-center justify-between border-b p-4">
					<h2 className="text-xl font-semibold text-gray-800">مسودة العقد</h2>
					<button
						onClick={onClose}
						className="p-2 text-gray-400 transition-colors hover:text-gray-600"
						aria-label="إغلاق"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				{/* محتوى النافذة */}
				<div className="flex-1 overflow-auto p-4">
					<iframe
						src={fileUrl}
						className="h-[80vh] min-h-[400px] w-full md:h-[600px]"
						title="مسودة العقد"
					/>
				</div>
				{/* أسفل النافذة */}
				<div className="flex justify-end border-t p-4">
					<a
						href={fileUrl}
						download="عقد_المستثمر.pdf"
						className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
					>
						تحميل العقد
					</a>
				</div>
			</div>
		</div>
	);
}
