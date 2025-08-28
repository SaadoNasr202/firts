import { FaTrashAlt, FaPencilAlt, FaHome, FaPlusCircle } from 'react-icons/fa';

interface SavedAddressProps {
	setActivePage: (page: string) => void;
}
  
export default function SavedAddress({ setActivePage }: SavedAddressProps) {
	return (
		<div className="flex flex-col">
			<h2 className="mb-8 text-right text-2xl font-bold text-gray-800">
				العناوين المحفوظة
			</h2>
			<div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
				{/* Address Card (now responsive) */}
				<div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center pb-4 border-b border-gray-200 space-y-4 md:space-y-0">
					<div className="flex flex-row-reverse items-center space-x-2">
						<FaHome className="text-2xl text-green-600" />
						<div className="flex flex-col text-right">
							<span className="font-semibold text-lg text-gray-900">الرئيسيه</span>
							<span className="text-sm text-gray-500">السعودية، الرياض، 55552333</span>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<FaPencilAlt className="text-gray-500 hover:text-gray-700 cursor-pointer" />
						<FaTrashAlt className="text-gray-500 hover:text-red-500 cursor-pointer" />
					</div>
				</div>

				{/* Map Placeholder */}
				<div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
					{/* Map Image Placeholder */}
					<div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/600x200.png?text=Map+Placeholder')" }}></div>
					{/* Add a marker or icon on the map */}
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<FaPlusCircle className="text-4xl text-green-600 cursor-pointer" />
					</div>
				</div>

				{/* Buttons (now responsive) */}
				<div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
					<button className="w-full md:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors">
						تأكيد العنوان
					</button>
					<button 
						onClick={() => setActivePage('عنوان جديد')}
						className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
						تغيير العنوان
					</button>
				</div>
			</div>
		</div>
	);
}