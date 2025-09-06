// src/components/InvestorePage.tsx
"use client";

import { useState } from "react";

import { InvestoreFormData } from "@/app/invstore/page";
import ContractModal from "./ContractModal";
import InvestoreForm from "./InvestoreRegister";
import VideoSlider from "./VideoSlider";

export default function InvestorePage({
	postInvestoreAction,
}: {
	postInvestoreAction: (formData: InvestoreFormData) => Promise<{ success: boolean; message?:string }>;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<main>
			<div className="mx-auto max-w-[1800px] px-2 py-4 sm:px-4 sm:py-8 lg:px-8">
				{/* قسم صورة الخلفية */}
				<section className="mb-6 sm:mb-8 overflow-hidden">
					<VideoSlider />
				</section>

				{/* قسم الفورم */}
				<section className="mb-6 sm:mb-8 rounded-xl bg-[#FFFFFF] p-3 shadow-md sm:p-6 md:p-5">
					<div className="p-4 text-center font-['Readex_Pro'] text-2xl leading-none font-semibold tracking-normal sm:p-10 sm:text-[39px]">
						<p>
							الإنضمام كمستثمر في{" "}
							<span className="text-[#31A342]">شلة</span>{" "}
						</p>
					</div>

					{/* تم تعديل هذا القسم لإظهار الزر الذي يفتح النافذة المنبثقة */}
					<div className="mt-6 flex justify-center p-4 sm:mt-10 sm:p-8">
						<button
							onClick={handleOpenModal}
							className="flex w-full max-w-sm items-center justify-center rounded-lg border border-[#31A342] bg-white px-6 py-3 font-semibold text-[#31A342] shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-green-400 focus:outline-none sm:px-10 sm:w-auto"
						>
								تحميل مسودة العقد
						</button>
					</div>

					<div className="opacity-100">
						<InvestoreForm postInvestoreAction={postInvestoreAction} />
					</div>
				</section>

				{/* قسم الفوائد */}
				<section className="mb-6 bg-[#FFFFFF] p-3 md:mb-8 md:p-12">
					<div className="container mx-auto px-2 md:px-12">
						<h2 className="mb-8 text-center font-['Readex_Pro'] text-2xl font-semibold text-gray-800 md:mb-12 md:text-4xl lg:text-[39px]">
							فوائد الدخول باستثمار تجاري
						</h2>
						<div className="flex flex-col items-center justify-center gap-4">
							{/* Item 1 */}
							<div className="relative flex w-full flex-col items-center justify-between gap-4 rounded-lg border-2 border-green-500 p-4 sm:flex-row sm:gap-0 sm:py-4">
								<p className="w-full text-center font-['Readex_Pro'] text-sm text-gray-700 sm:w-5/12 sm:text-right sm:text-base md:text-lg">
									يساعد الاستثمار في الأعمال على ضمان نجاح الشركة على المدى
									الطويل.
								</p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 text-lg font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-xl md:h-20 md:w-20 md:text-2xl">
										1
									</div>
									<div className="h-8 w-0.5 bg-gray-300 sm:h-12 lg:hidden"></div>
								</div>
								<p className="w-full text-center sm:w-5/12 sm:text-left"></p>
							</div>

							{/* Item 2 */}
							<div className="relative flex w-full flex-col items-center justify-between gap-4 rounded-lg border-2 border-green-500 p-4 sm:flex-row sm:gap-0 sm:py-4">
								<p className="w-full text-center sm:w-5/12 sm:text-right"></p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-blue-400 to-cyan-500 text-lg font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-xl md:h-20 md:w-20 md:text-2xl">
										2
									</div>
									<div className="h-8 w-0.5 bg-gray-300 sm:h-12 lg:hidden"></div>
								</div>
								<p className="w-full text-center font-['Readex_Pro'] text-sm text-gray-700 sm:w-5/12 sm:text-left sm:text-base md:text-lg">
									الاستثمار التجاري يساعد على خلق فرص العمل.
								</p>
							</div>

							{/* Item 3 */}
							<div className="relative flex w-full flex-col items-center justify-between gap-4 rounded-lg border-2 border-green-500 p-4 sm:flex-row sm:gap-0 sm:py-4">
								<p className="w-full text-center font-['Readex_Pro'] text-sm text-gray-700 sm:w-5/12 sm:text-right sm:text-base md:text-lg">
									يمكن أن يساعد الاستثمار في الشركات الناشئة على تعزيز النمو
									الاقتصادي.
								</p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-green-400 to-lime-500 text-lg font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-xl md:h-20 md:w-20 md:text-2xl">
										3
									</div>
									<div className="h-8 w-0.5 bg-gray-300 sm:h-12 lg:hidden"></div>
								</div>
								<p className="w-full text-center sm:w-5/12 sm:text-left"></p>
							</div>

							{/* Item 4 */}
							<div className="relative flex w-full flex-col items-center justify-between gap-4 rounded-lg border-2 border-green-500 p-4 sm:flex-row sm:gap-0 sm:py-4">
								<p className="w-full text-center sm:w-5/12 sm:text-right"></p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-amber-500 text-lg font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-xl md:h-20 md:w-20 md:text-2xl">
										4
									</div>
									<div className="h-8 w-0.5 bg-gray-300 sm:h-12 lg:hidden"></div>
								</div>
								<p className="w-full text-center font-['Readex_Pro'] text-sm text-gray-700 sm:w-5/12 sm:text-left sm:text-base md:text-lg">
									يمكن أن يؤدي الاستثمار في الشركات الناشئة إلى الابتكار.
								</p>
							</div>

							{/* Item 5 */}
							<div className="relative flex w-full flex-col items-center justify-between gap-4 rounded-lg border-2 border-green-500 p-4 sm:flex-row sm:gap-0 sm:py-4">
								<p className="w-full text-center font-['Readex_Pro'] text-sm text-gray-700 sm:w-5/12 sm:text-right sm:text-base md:text-lg">
									يمكن أن يساعد الاستثمار التجاري في جذب الموظفين الموهوبين.
								</p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-pink-400 to-red-500 text-lg font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-xl md:h-20 md:w-20 md:text-2xl">
										5
									</div>
								</div>
								<p className="w-full text-center sm:w-5/12 sm:text-left"></p>
							</div>
						</div>
					</div>
				</section>

				{/* قسم البطاقات */}
				<section className="mb-6 bg-[#FFFFFF] p-3 md:mb-8 md:p-12">
					<div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
						{/* البطاقة الأولى */}
						<div className="w-full max-w-[550px] overflow-hidden rounded-lg bg-[#EDEDED] shadow-lg lg:w-1/2">
							<div className="relative aspect-[550/300] w-full">
								<img
									src="investore1.png"
									alt="Delivery Agent on a bike"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="p-4 text-right sm:p-6">
								<h3 className="mb-2 text-lg font-semibold text-green-600 sm:text-xl">
									تحقيق عائد طويل الاجل خلال الاستثمار
								</h3>
								<p className="text-sm text-gray-600 sm:text-base">
									سوف تحصل على عائد طويل الاجل لطالما بقيت من المستثمرين معنا في
									شلة
								</p>
							</div>
						</div>

						{/* البطاقة الثانية */}
						<div className="w-full max-w-[550px] overflow-hidden rounded-lg bg-[#EDEDED] shadow-lg lg:w-1/2">
							<div className="relative aspect-[550/300] w-full">
								<img
									src="investore2.png"
									alt="Delivery Agent handing over a package"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="p-4 text-right sm:p-6">
								<h3 className="mb-2 text-lg font-semibold text-green-600 sm:text-xl">
									ارباح سنوية مدروسة{" "}
								</h3>
								<p className="text-sm text-gray-600 sm:text-base">
									قم بزيادة راس مالك عن طريق الاستثمار في شركتنا واحصل على مبالغ
									سنوية مجزية
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* نافذة العقد المحسنة */}
			<ContractModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				fileUrl="/contract.pdf"
			/>
		</main>		
	);
}
