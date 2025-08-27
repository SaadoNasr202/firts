import StoreForm from "./partnerregister";

export default function PartnerPage() {
	return (
		<div>
			<div className="mx-auto max-w-[1292px] px-4 py-8 sm:px-6 lg:px-8">
				{/* قسم صورة الخلفية */}
				<section className="relative mb-8 overflow-hidden">
					<div className="relative">
						<div className="flex aspect-video h-auto min-h-[300px] w-full items-center justify-center">
							<img
								src="partner.jpg"
								alt=""
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</section>

				{/* قسم الفورم */}
				<section className="mb-8 rounded-xl bg-[#FFFFFF] p-6 shadow-md md:p-12">
					<div className="text-center font-['Readex_Pro'] text-[39px] leading-none font-semibold tracking-normal">
						<p>الإنضمام كشريك تاجر </p>
						<p className="font-['Readex_Pro' ] p-2.5 text-[16px] text-[#8C8C8C]">
							إنضم الينا وزد مبيعاتك مع تحقيق اكبر استفادة من خدماتنا
							المميزة{" "}
						</p>
					</div>

					<div className="">
						<StoreForm />
					</div>
				</section>

				{/* قسم الفوائد */}
				<section className="rounded-lg bg-[#FFFFFF] p-6 md:p-12">
					<div className="container mx-auto px-4 md:px-12">
						<h2 className="mb-12 text-center font-['Readex_Pro'] text-4xl font-semibold text-gray-800 md:text-[39px]">
							فوائد الانضمام كشريك تاجر في{" "}
							<span className="text-[#31A342]">شلة</span>
						</h2>
					</div>
					<div className="container mx-auto border-2 border-[#31A342] px-4 md:px-12">
						<div className="mb-4 flex justify-end">
							<img
								src="shellalogo.png"
								alt="شلّة لوجو"
								className="h-10 w-24 object-contain"
							/>
						</div>

						{/* Container for the benefits grid */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							{/* Benefit 4: رسوم مخفضة */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=💵"
										alt="Reduced Fees Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									رسوم مخفضة
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									سوف يتم تحصيل رسوم مخفضة على كل طلب من التطبيق
								</p>
							</div>

							{/* Benefit 3: توسيع نقاط البيع */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=👥"
										alt="Expand Sales Points Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									توسيع نقاط البيع
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									ستتمكن من توصيل منتجاتك إلى جميع أنحاء المملكة
								</p>
							</div>

							{/* Benefit 2: خدمة الدفع المباشر */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=$"
										alt="Direct Payment Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									خدمة الدفع المباشر
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									ستحصل على ثمن الطلب مباشرة عند تسليمه لمندوب التوصيل
								</p>
							</div>

							{/* Benefit 1: أرباح أعلى وطلبات أكثر */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									{/* أيقونة الأرباح، يمكن استخدام SVG أو أيقونة من مكتبة */}
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=%"
										alt="Higher Profits Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									أرباح أعلى وطلبات أكثر
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									ستحصل على عدد طلبات أكثر من خلال اشتراكك بمتاجر شلة
								</p>
							</div>

							{/* Benefit 8: لا قلق بعد اليوم */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=😊"
										alt="No Worries Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									لا قلق بعد اليوم
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									ابق في أمنة مع عملائك. منذ الآن جميع الطلبات ستصل لعملائها
									بأسرع وقت
								</p>
							</div>

							{/* Benefit 7: إحصائيات البيع */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=📊"
										alt="Sales Statistics Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									إحصائيات البيع
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									يمكنك رؤية الإحصائيات والبيانات اليومية والشهرية لتلقي على
									نتائج مبيعاتك
								</p>
							</div>

							{/* Benefit 6: أبدع في عملك */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=🛠️"
										alt="Creativity Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									أبدع في عملك
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									يمكنك إدارة كل شئ من التطبيق
								</p>
							</div>

							{/* Benefit 5: خاصية التنبيه بالطلبات الجديدة */}
							<div className="flex flex-col items-center p-4 text-center">
								<div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 p-4">
									<img
										src="https://placehold.co/96x96/31a342/ffffff?text=🔔"
										alt="New Order Notifications Icon"
										className="h-16 w-16"
									/>
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									خاصية التنبيه بالطلبات الجديدة
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									خاصية التنبيهات عند توفر طلبات جديدة للتنبيه بوجود طلب جديد
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="rtl mx-auto max-w-lg rounded-lg bg-gray-100 p-10 text-center shadow-lg">
					<h2 className="mb-2 text-3xl font-bold">إشترك في قائمتنا البريدية</h2>
					<p className="mb-6 text-gray-600">
						هل ترغب في تلقي اخر الاخبار والمعلومات عن تطبيق شلة
						<br />
						ادخل بريدك الالكتروني هنا لنصل إليك
					</p>
					<div className="flex gap-2">
						<input
							type="email"
							placeholder="ex@example.com"
							className="flex-grow rounded-md border border-gray-300 p-3 text-right"
						/>
						<button className="rounded-md bg-green-500 px-6 py-3 font-bold text-white transition-colors hover:bg-green-600">
							إشتراك
						</button>
					</div>
				</section>
			</div>
		</div>
	);
}
