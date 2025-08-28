import CategoriesSlider from "./CategoriesSlider";
import DiscountSlider from "./DiscountSlider";
import PopularStoresSlider from "./PopularStoresSlider";
import StoreSlider from "./StoreSlider";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
			{/* القسم العلوي - معلومات التوصيل */}
			<div className="flex flex-col items-start py-4 text-right">
				<div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
					<p>
						التوصيل إلى{" "}
						<span className="font-bold text-gray-800">
							cc987f1f18, Sharjah - United Arab Emirates
						</span>
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
			</div>

			<hr className="my-4 border-gray-200" />

			{/* قسم الأقسام */}
			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">أقسامنا</h2>
					<a
						href="#"
						className="text-sm font-semibold text-green-600 hover:text-green-800"
					>
						عرض الكل
					</a>
				</div>
				<CategoriesSlider />
			</section>

			{/* --- */}

			{/* قسم الصور / البانر الترويجي */}
			<section className="mt-8">
				<div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-300 md:h-64 lg:h-80">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage:
								"url('https://via.placeholder.com/1200x400?text=Ramadan+Sale')",
						}}
					></div>
					<div className="absolute inset-0 flex items-center justify-start bg-gradient-to-r from-black/50 to-transparent p-8 text-right">
						<div className="text-white">
							<h3 className="text-2xl font-bold md:text-4xl">Ramadan Sale</h3>
							<p className="mt-2 text-lg md:text-2xl">UP TO 50 % OFF</p>
							<button className="mt-4 rounded-full bg-yellow-400 px-6 py-2 font-semibold text-gray-800 transition-colors hover:bg-yellow-500">
								SHOP NOW
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* --- */}

			{/* قسم المتاجر القريبة منك */}
			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">
						المتاجر القريبة منك
					</h2>
					<a
						href="#"
						className="text-sm font-semibold text-green-600 hover:text-green-800"
					>
						عرض الكل
					</a>
				</div>
				<StoreSlider />
			</section>

			{/* --- */}

			{/* القسم الجديد: أقوى الخصومات */}
			<section className="mt-8">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">أقوى الخصومات</h2>
					<a
						href="#"
						className="text-sm font-semibold text-green-600 hover:text-green-800"
					>
						عرض الكل
					</a>
				</div>
				<DiscountSlider />
			</section>

			{/* --- */}
 {/* القسم الجديد: أشهر المحلات في منطقتك */}
      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">أشهر المحلات في منطقتك</h2>
          <a href="#" className="text-sm font-semibold text-green-600 hover:text-green-800">عرض الكل</a>
        </div>
        <PopularStoresSlider />
      </section>
		</div>
	);
}
