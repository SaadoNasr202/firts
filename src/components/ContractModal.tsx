// src/components/ContractModal.tsx

interface ContractModalProps {
	isOpen: boolean;
	onClose: () => void;
	fileUrl: string; // مسار ملف PDF
}

export default function ContractModal({
	isOpen,
	onClose,
	fileUrl,
}: ContractModalProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 sm:p-6 md:p-8">
			<div className="relative h-full w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl sm:h-[90%] sm:w-[90%]">
				{/* زر الإغلاق */}
				<div className="absolute top-4 right-4 z-10">
					<button
						onClick={onClose}
						className="rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
						aria-label="إغلاق"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
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

				{/* عرض ملف PDF داخل iframe */}
				<iframe
					src={fileUrl}
					className="h-full w-full"
					title="عقد مسودة"
					style={{ border: "none" }}
				/>
			</div>
		</div>
	);
}
