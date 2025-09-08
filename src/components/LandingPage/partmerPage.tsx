"use client";

import { PartnerFormData } from "@/app/partner/page";
import ApprovalIcon from "@mui/icons-material/Approval";
import CommuteIcon from "@mui/icons-material/Commute";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import StoreForm from "./partnerregister";
import ImagePartnerSlider from "./SliderPartner";
export default function PartnerPage({
	postFormPartnerAction,
}: {
	postFormPartnerAction: (
		formData: PartnerFormData,
	) => Promise<{ success: boolean } | { message: string; field: string }>;
}) {
	return (
		<div>
			<div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
				{/* قسم صورة الخلفية */}
				<section className="relative mb-8 overflow-hidden">
					<ImagePartnerSlider />
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
						<StoreForm postFormPartnerAction={postFormPartnerAction} />
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
					<div
						className="container mx-auto border-2 border-[#31A342] px-4 md:px-12"
						dir="rtl"
					>
						{/* Container for the benefits grid */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							{/* Benefit 4: رسوم مخفضة */}
							<div
								className="flex cursor-pointer flex-col items-center p-4 text-center"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/BenefitPage";
								}}
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full p-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r text-green-600">
										{/* تم استدعاء الأيقونة بشكل صحيح هنا */}
										<TrackChangesIcon style={{ fontSize: "80px" }} />
									</div>
								</div>

								<h3 className="mt-4 text-xl font-bold text-gray-800">
									فرصة استثنائية لشركاء شلة
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									انطلق بأعمالك نحو القمة مع باقة نمو متكاملة بقيمة 5400 ريال،
									مجانًا بالكامل!
								</p>
							</div>

							{/* Benefit 3: توسيع نقاط البيع */}

							<div
								className="flex cursor-pointer flex-col items-center p-4 text-center"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/PointOfSale";
								}}
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full p-4 text-green-600">
									<ApprovalIcon style={{ fontSize: 80 }} />
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									حدود متجرك الآن حدود المملكة
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									انطلق بمنتجاتك إلى كل مدينة وقرية
								</p>
							</div>

							{/* Benefit 1: أرباح أعلى وطلبات أكثر */}
							<div
								className="flex cursor-pointer flex-col items-center p-4 text-center"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/AddToMoney";
								}}
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full p-4 text-green-600">
									<PriceCheckIcon style={{ fontSize: 80 }} />
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									ضاعف أرباحك وزد مبيعاتك
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									انضم إلى عالم متاجر{" "}
									<span className="text-green-500">شلة</span> اليوم!
								</p>
							</div>

							{/* Benefit 8: لا قلق بعد اليوم */}
							<div
								className="flex cursor-pointer flex-col items-center p-4 text-center"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/ShippingPage";
								}}
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full p-4 text-green-600">
									<CommuteIcon style={{ fontSize: 80 }} />
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									وداعاً لقلق الشحن
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									مرحباً بعصر جديد من الثقة والسرعة الفائقة مع تطبيق
									<span className="text-green-500"> شلة </span>
								</p>
							</div>

							{/* Benefit 7: إحصائيات البيع */}
							<div
								className="flex cursor-pointer flex-col items-center p-4 text-center"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/SaleStatisticsPage";
								}}
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full p-4 text-green-600">
									<StackedBarChartIcon style={{ fontSize: 80 }} />
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									إحصائيات البيع مع
									<span className="text-green-500"> شلة</span>
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									بوصلتك الدقيقة نحو قرارات أذكى وأرباح أعلى
								</p>
							</div>

							{/* Benefit 6: أبدع في عملك */}
							<div
								className="flex cursor-pointer flex-col items-center p-4 text-center"
								onClick={() => {
									window.location.href = "/CreativityWrokePage";
								}}
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full p-4 text-green-600">
									<EmojiObjectsIcon style={{ fontSize: 80 }} />
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									إبداع في عملك
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									يمكنك إدارة كل شئ من التطبيق لعملائك
								</p>
							</div>

							{/* Benefit 5: خاصية التنبيه بالطلبات الجديدة */}
							<div
								className="flex cursor-pointer flex-col items-center p-4 text-center"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/ManagmentOperationPage";
								}}
							>
								<div className="flex h-24 w-24 items-center justify-center rounded-full p-4 text-green-600">
									<ManageHistoryIcon style={{ fontSize: 80 }} />
								</div>
								<h3 className="mt-4 text-xl font-bold text-gray-800">
									إدارة عملياتك بفعالية
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									خاصية التنبيه الفوري بالطلبات الجديدة في تطبيق{" "}
									<span className="text-green-500">شلة</span> للتجار ​
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
