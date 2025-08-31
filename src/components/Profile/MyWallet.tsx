import { useEffect, useState } from "react"; // Added useEffect
import {
	FaCashRegister,
	FaExclamationCircle,
	FaPlus,
	FaRegClipboard,
} from "react-icons/fa";
import AddBalanceModal from "./AddBalanceModal";
import Toast from "./Toast";

export default function MyWallet() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	// UPDATED: Load balance from localStorage, or default to 0
	const [balance, setBalance] = useState<number>(() => {
		const savedBalance = localStorage.getItem("walletBalance");
		return savedBalance ? parseFloat(savedBalance) : 0;
	});

	const [toastState, setToastState] = useState<{
		message: string;
		type: "success" | "failure";
	} | null>(null);

	// ADDED: Save balance to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("walletBalance", balance.toString());
	}, [balance]);

	const handleAddBalance = async (amount: string): Promise<boolean> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const numericAmount = parseFloat(amount);

				setBalance((prevBalance) => prevBalance + numericAmount);

				setToastState({
					message: `تم إضافة ${numericAmount} ر.س إلى المحفظة`,
					type: "success",
				});
				resolve(true);
			}, 1500);
		});
	};

	return (
		<div className="flex flex-col space-y-8">
			<h2 className="text-right text-2xl font-bold text-gray-800">محفظتي</h2>

			{/* Balance Section */}
			<div className="flex items-center justify-between rounded-lg border border-green-300 bg-white p-6 shadow-sm">
				<div className="flex flex-row-reverse items-center gap-1 space-x-4">
					<FaPlus
						className="cursor-pointer text-2xl text-gray-500 transition-colors hover:text-green-600"
						onClick={() => setIsModalOpen(true)}
					/>
					<FaRegClipboard className="cursor-pointer text-2xl text-gray-500 transition-colors hover:text-green-600" />
				</div>
				<div className="flex flex-col items-end">
					<div className="flex items-center space-x-1">
						<FaExclamationCircle className="text-sm text-green-600" />
						<span className="text-sm font-semibold text-gray-800">الرصيد</span>
					</div>
					<span className="mt-1 text-xl font-bold text-green-600">
						{balance.toFixed(2)} ر.س
					</span>
				</div>
			</div>

			{/* Transactions Section */}
			<div className="flex flex-col space-y-4">
				<h3 className="text-right text-xl font-semibold text-gray-800">
					المعاملات
				</h3>
				<div className="flex flex-row-reverse items-center space-x-2">
					<button className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:bg-green-200">
						الكل
					</button>
					<button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200">
						طلبات
					</button>
					<button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200">
						الاسترداد
					</button>
					<button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200">
						تفويضات
					</button>
				</div>
				{/* Empty State */}
				<div className="mt-12 flex flex-col items-center justify-center text-center text-gray-500">
					<FaCashRegister className="mb-4 text-6xl text-gray-400" />
					<p className="text-base font-medium">لا يوجد حالياً أي تسجيلات</p>
				</div>
			</div>

			<AddBalanceModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddBalance={handleAddBalance}
			/>

			{toastState && (
				<Toast message={toastState.message} type={toastState.type} />
			)}
		</div>
	);
}
