import { AlertTriangle, PlusCircle, ShoppingBag } from "lucide-react";

// Data types for offers
interface Offer {
	image: string;
	title: string;
	price: string;
	points: number;
}

// Dummy data for the offers list
const offers: Offer[] = [
	{
		image: "/path/to/your/burger-image.png", // Replace with your actual image path
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
	{
		image: "/path/to/your/burger-image.png",
		title: "خصم 10.00 رس على بيغ تيستي",
		price: "خصم 10.00 رس",
		points: 600,
	},
];

export default function MyPoints() {
	return (
		<div className="flex flex-col p-4 md:p-8">
			{/* Point and Coupon Summary */}
			<div className="flex flex-col gap-4 sm:flex-row sm:justify-start md:gap-8">
				{/* Points Card */}
				<div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:w-1/2">
					<div className="flex flex-col items-end gap-1 text-right">
						<span className="text-xl font-bold text-gray-800">500 نقطة</span>
						<span className="text-sm text-blue-600">عرض السجل</span>
					</div>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
						<PlusCircle size={24} />
					</div>
				</div>

				{/* Coupons Card */}
				<div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:w-1/2">
					<div className="flex flex-col items-end gap-1 text-right">
						<span className="text-xl font-bold text-gray-800">0 قسيمة</span>
						<span className="text-sm text-blue-600">عرض القسائم</span>
					</div>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
						<ShoppingBag size={24} />
					</div>
				</div>
			</div>

			{/* Expiration Alert */}
			<div className="mt-4 flex flex-row-reverse items-center gap-2 rounded-md bg-yellow-100 p-3 text-sm font-medium text-yellow-800">
				<AlertTriangle size={20} className="flex-shrink-0" />
				<span className="text-right">200 نقطة تنتهي صلاحيتها في 2/2/2025</span>
			</div>

			{/* Offers Section */}
			<h2 className="my-8 text-right text-2xl font-bold text-gray-800">
				عروض رمضان
			</h2>

			{/* Offers Grid */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{offers.map((offer, index) => (
					<div
						key={index}
						className="relative flex flex-col items-end overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform duration-200 hover:scale-[1.02]"
					>
						{/* Offer Badge */}
						<div className="absolute top-2 right-2 rounded-md bg-orange-500 px-2 py-1 text-xs font-semibold text-white">
							{offer.price}
						</div>
						{/* Offer Image */}
						<img
							src={offer.image}
							alt={offer.title}
							className="h-40 w-full object-cover"
						/>
						{/* Offer Details */}
						<div className="flex w-full flex-col items-end p-4 text-right">
							<span className="text-base font-semibold text-gray-800">
								{offer.title}
							</span>
							<span className="mt-1 text-sm text-gray-500">
								{offer.points} نقطة
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
