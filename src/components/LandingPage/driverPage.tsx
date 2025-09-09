"use client";
import { FormData } from "@/app/driver/page";
import DeliveryAgentForm from "./driverregister";
import ImageDriverSlider from "./SliderDriver";

export default function DriverPage({
	postFormDeliveryDriverAction,
}: {
	postFormDeliveryDriverAction: (
		formData: FormData,
	) => Promise<{ success: boolean } | { message: string; field: string }>;
}) {
	return (
		<main>
			<div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
				{/* قسم صورة الخلفية */}
				<section className="relative mb-8 overflow-hidden">
					<ImageDriverSlider />
				</section>

				{/* قسم الفورم */}
				<section className="mb-8 rounded-xl bg-[#FFFFFF] p-6 shadow-md md:p-12">
					<div className="text-center font-['Readex_Pro'] text-[39px] leading-none font-semibold tracking-normal">
						الانضمام كعامل توصيل
					</div>
					<div className="opacity-100">
						<DeliveryAgentForm
							postFormDeliveryDriverAction={postFormDeliveryDriverAction}
						/>
					</div>
				</section>

				{/* قسم الفوائد */}
				<section className="mb-8 bg-[#FFFFFF] p-6 md:p-12">
					<div className="container mx-auto px-4 md:px-12">
						<h2 className="mb-12 text-center font-['Readex_Pro'] text-4xl font-semibold text-gray-800 md:text-[39px]">
							فوائد الانضمام كعامل توصيل في شلة
						</h2>
						<div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
							{/* البطاقة 2 */}
							<div
								className="w-full max-w-[550px] cursor-pointer overflow-hidden rounded-lg bg-[#EDEDED] shadow-lg lg:w-1/2"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/CardDeleviry2";
								}}
							>
								<div className="relative aspect-[550/300] w-full">
									<img
										src="driver1.jpg"
										alt="Delivery Agent on a bike"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-6 text-right">
									<h3 className="mb-2 text-xl font-semibold text-green-600">
										استمتع برسوم خدمة منخفضة
									</h3>
									<p className="text-gray-600">
										سوف تحصل على عائد طويل الأجل لطالما بقيت من المستثمرين معنا
										في شلة
									</p>
								</div>
							</div>

							{/* البطاقة 1 */}
							<div
								className="w-full max-w-[550px] cursor-pointer overflow-hidden rounded-lg bg-[#EDEDED] shadow-lg lg:w-1/2"
								onClick={() => {
									// لاحقًا ضع رابط الصفحة هنا
									window.location.href = "/CardDeleviry1";
								}}
							>
								<div className="relative aspect-[550/300] w-full">
									<img
										src="driver2.jpg"
										alt="Delivery Agent handing over a package"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-6 text-right">
									<h3 className="mb-2 text-xl font-semibold text-green-600">
										متصل في أي وقت
									</h3>
									<p className="text-gray-600">
										التمتع بحرية العمل في الأوقات الملائمة لك كما سوف تتمكن من
										عملك ومسؤولياتك الأخرى
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
