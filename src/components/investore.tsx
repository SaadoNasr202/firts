// src/components/InvestorePage.tsx

"use client";

import { useState } from "react";

import ContractModal from "./ContractModal";
import InvestoreForm from "./InvestoreRegister";
import VideoSlider from "./VideoSlider";

export default function InvestorePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<main>
			<div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
				{/* قسم صورة الخلفية */}
				<section className="mb-8 overflow-hidden">
					<VideoSlider />
				</section>

				{/* قسم الفورم */}
				<section className="mb-8 rounded-xl bg-[#FFFFFF] p-6 shadow-md md:p-5">
					<div className="p-10 text-center font-['Readex_Pro'] text-[39px] leading-none font-semibold tracking-normal">
						<p>
							الإنضمام كمستثمر في{" "}
							<span className="text-[#31A342]">شلة</span>{" "}
						</p>
					</div>

					{/* تم تعديل هذا القسم لإظهار الزر الذي يفتح النافذة المنبثقة */}
					<div className="mt-10 flex justify-center p-8">
						<button
							onClick={handleOpenModal}
							className="flex w-full max-w-sm items-center justify-center rounded-lg border border-[#31A342] bg-white px-10 py-3 font-semibold text-[#31A342] shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
						>
							تحميل مسودة العقد
						</button>
					</div>

					<div className="opacity-100">
						<InvestoreForm />
					</div>
				</section>

				{/* قسم الفوائد */}
				<section className="mb-8 bg-[#FFFFFF] p-6 md:p-12">
					<div className="container mx-auto px-4 md:px-12">
						<h2 className="mb-12 text-center font-['Readex_Pro'] text-4xl font-semibold text-gray-800 md:text-[39px]">
							فوائد الدخول باستثمار تجاري
						</h2>
						<div className="flex flex-col items-center justify-center">
							{/* Item 1 */}
							<div className="relative flex w-full items-center justify-between rounded-lg border-2 border-green-500 py-4">
								<p className="w-5/12 text-right font-['Readex_Pro'] text-base text-gray-700 md:text-lg">
									يساعد الاستثمار في الأعمال على ضمان نجاح الشركة على المدى
									الطويل.
								</p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 text-xl font-bold text-white shadow-lg md:h-20 md:w-20 md:text-2xl">
										1
									</div>
									<div className="h-12 w-0.5 bg-gray-300 lg:hidden"></div>{" "}
									{/* Connector line - hidden on large screens */}
								</div>
								<p className="w-5/12 text-left font-['Readex_Pro'] text-base text-gray-700 md:text-lg"></p>{" "}
								{/* Empty for spacing */}
							</div>

							{/* Item 2 */}
							<div className="relative flex w-full items-center justify-between rounded-lg border-2 border-green-500 py-4">
								<p className="w-5/12 text-right font-['Readex_Pro'] text-base text-gray-700 md:text-lg"></p>{" "}
								{/* Empty for spacing */}
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-blue-400 to-cyan-500 text-xl font-bold text-white shadow-lg md:h-20 md:w-20 md:text-2xl">
										2
									</div>
									<div className="h-12 w-0.5 bg-gray-300 lg:hidden"></div>{" "}
									{/* Connector line - hidden on large screens */}
								</div>
								<p className="w-5/12 text-left font-['Readex_Pro'] text-base text-gray-700 md:text-lg">
									الاستثمار التجاري يساعد على خلق فرص العمل.
								</p>
							</div>

							{/* Item 3 */}
							<div className="relative flex w-full items-center justify-between rounded-lg border-2 border-green-500 py-4">
								<p className="w-5/12 text-right font-['Readex_Pro'] text-base text-gray-700 md:text-lg">
									يمكن أن يساعد الاستثمار في الشركات الناشئة على تعزيز النمو
									الاقتصادي.
								</p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-green-400 to-lime-500 text-xl font-bold text-white shadow-lg md:h-20 md:w-20 md:text-2xl">
										3
									</div>
									<div className="h-12 w-0.5 bg-gray-300 lg:hidden"></div>{" "}
									{/* Connector line - hidden on large screens */}
								</div>
								<p className="w-5/12 text-left font-['Readex_Pro'] text-base text-gray-700 md:text-lg"></p>{" "}
								{/* Empty for spacing */}
							</div>

							{/* Item 4 */}
							<div className="relative flex w-full items-center justify-between rounded-lg border-2 border-green-500 py-4">
								<p className="w-5/12 text-right font-['Readex_Pro'] text-base text-gray-700 md:text-lg"></p>{" "}
								{/* Empty for spacing */}
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-amber-500 text-xl font-bold text-white shadow-lg md:h-20 md:w-20 md:text-2xl">
										4
									</div>
									<div className="h-12 w-0.5 bg-gray-300 lg:hidden"></div>{" "}
									{/* Connector line - hidden on large screens */}
								</div>
								<p className="w-5/12 text-left font-['Readex_Pro'] text-base text-gray-700 md:text-lg">
									يمكن أن يؤدي الاستثمار في الشركات الناشئة إلى الابتكار.
								</p>
							</div>

							{/* Item 5 */}
							<div className="relative flex w-full items-center justify-between rounded-lg border-2 border-green-500 py-4">
								<p className="w-5/12 text-right font-['Readex_Pro'] text-base text-gray-700 md:text-lg">
									يمكن أن يساعد الاستثمار التجاري في جذب الموظفين الموهوبين.
								</p>
								<div className="mx-4 flex flex-col items-center">
									<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-pink-400 to-red-500 text-xl font-bold text-white shadow-lg md:h-20 md:w-20 md:text-2xl">
										5
									</div>
									{/* No connector line after the last item */}
								</div>
								<p className="w-5/12 text-left font-['Readex_Pro'] text-base text-gray-700 md:text-lg"></p>{" "}
								{/* Empty for spacing */}
							</div>
						</div>
					</div>
				</section>
				<section className="mb-8 bg-[#FFFFFF] p-6 md:p-12">
					<div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
						{/* البطاقة الأولى */}
						<div className="w-full max-w-[550px] overflow-hidden rounded-lg bg-[#EDEDED] shadow-lg lg:w-1/2">
							<div className="relative aspect-[550/300] w-full">
								<img
									src="investore1.png"
									alt="Delivery Agent on a bike"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="p-6 text-right">
								<h3 className="mb-2 text-xl font-semibold text-green-600">
									تحقيق عائد طويل الاجل خلال الاستثمار
								</h3>
								<p className="text-gray-600">
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
							<div className="p-6 text-right">
								<h3 className="mb-2 text-xl font-semibold text-green-600">
									ارباح سنوية مدروسة{" "}
								</h3>
								<p className="text-gray-600">
									قم بزيادة راس مالك عن طريق الاستثمار في شركتنا واحصل على مبالغ
									سنوية مجزية
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
			<ContractModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				fileUrl="contract.pdf"
			/>
		</main>
	);
}
