"use client";
import { useEffect, useState } from "react";
import { FaHome, FaPencilAlt, FaPlusCircle, FaTrashAlt } from "react-icons/fa";

interface SavedAddressProps {
	setActivePage: (page: string) => void;
}

export default function SavedAddress({ setActivePage }: SavedAddressProps) {
	const [address, setAddress] = useState<string>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchAddress() {
			try {
				const res = await fetch("/api/address");
				const data = await res.json();
				setAddress(data.address || "");
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		fetchAddress();
	}, []);

	async function handleConfirm() {
		try {
			await fetch("/api/address", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ address }),
			});
			alert("تم تحديث العنوان بنجاح!");
		} catch (err) {
			console.error(err);
			alert("حدث خطأ أثناء تحديث العنوان");
		}
	}

	if (loading) return <div className="p-8 text-center">جارٍ التحميل...</div>;

	return (
		<div className="flex flex-col">
			<h2 className="mb-8 text-right text-2xl font-bold text-gray-800">
				العناوين المحفوظة
			</h2>

			<div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
				<div className="flex flex-col-reverse items-center justify-between space-y-4 border-b border-gray-200 pb-4 md:flex-row-reverse md:space-y-0">
					<div className="flex flex-row-reverse items-center space-x-2">
						<FaHome className="text-2xl text-green-600" />
						<div className="flex flex-col text-right">
							<span className="text-lg font-semibold text-gray-900">
								الرئيسيه
							</span>
							<span className="text-sm text-gray-500">{address}</span>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<FaPencilAlt
							className="cursor-pointer text-gray-500 hover:text-gray-700"
							onClick={() => setActivePage("عنوان جديد")}
						/>
						<FaTrashAlt className="cursor-pointer text-gray-500 hover:text-red-500" />
					</div>
				</div>

				<div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-200">
					<div
						className="h-full w-full bg-cover bg-center"
						style={{
							backgroundImage:
								"url('https://via.placeholder.com/600x200.png?text=Map+Placeholder')",
						}}
					/>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
						<FaPlusCircle className="cursor-pointer text-4xl text-green-600" />
					</div>
				</div>

				<div className="flex flex-col-reverse items-center justify-between space-y-4 md:flex-row-reverse md:space-y-0 md:space-x-4">
					<button
						onClick={handleConfirm}
						className="w-full rounded-md bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700 md:w-auto"
					>
						تأكيد العنوان
					</button>
					<button
						onClick={() => setActivePage("عنوان جديد")}
						className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-100 md:w-auto"
					>
						تغيير العنوان
					</button>
				</div>
			</div>
		</div>
	);
}
