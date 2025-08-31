export default function KaidhaWallet() {
	return (
		<div className="flex flex-col space-y-8">
			<h2 className="text-right text-2xl font-bold text-gray-800">
				محفظة قيدها
			</h2>

			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				{/* The main container is now responsive: stacks on mobile, goes to row on desktop */}
				<div className="flex flex-col-reverse md:flex-row-reverse justify-between items-start mb-4 space-y-4 md:space-y-0">
					<div className="flex flex-col items-end">
						<span className="text-lg font-bold text-gray-800">SAR 4,800.09</span>
						<span className="text-sm font-semibold text-gray-600 mt-1">5520 XXXX XXXX 7167</span>
					</div>
					<button className="bg-green-600 text-white rounded-lg px-6 py-2 font-semibold hover:bg-green-700 transition-colors">
						الدفع الآن
					</button>
				</div>

				<div className="flex flex-col space-y-2 text-right mb-4">
					<span className="text-sm font-semibold text-gray-500">
						قيدها <span className="text-green-600">متاح</span>
					</span>
					<div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
						<div
							className="absolute top-0 right-0 h-full bg-orange-500 rounded-full"
							style={{ width: '50%' }} // Adjust width based on the progress
						></div>
					</div>
				</div>

				{/* The balance and limit values are now responsive */}
				<div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm font-medium mt-4">
					<span className="text-left md:text-right">حد البطاقة</span>
					<span className="text-right">الرصيد المتاح</span>
				</div>
				<div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm font-medium">
					<span className="text-left md:text-right">SAR 2500</span>
					<span className="text-right">SAR 5,500.00</span>
				</div>
			</div>
		</div>
	);
}