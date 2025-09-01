"use client";

import { WorkerFormData } from "@/app/worker/page";
import WorkerRegister from "./WorkerRegister";

export default function WorkerPage({
  postFormWorkerAction,
}: {
  postFormWorkerAction: (formData: WorkerFormData) => Promise<{ success: boolean }>;
}) {
	return (
		<main>
			<div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
				{/* قسم صورة الخلفية */}
				<section className="relative mb-8 overflow-hidden">
					<div className="relative">
						<div className="flex aspect-video h-auto min-h-[300px] w-full items-center justify-center">
							<img
								src="worker.png"
								alt=""
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</section>

				{/* قسم الفورم */}
				<section className="mb-8 rounded-xl bg-[#FFFFFF] p-6 shadow-md md:p-12">
					<div className="text-center font-['Readex_Pro'] text-[39px] leading-none font-semibold tracking-normal">
						الانضمام كمقدم خدمة
					</div>
					<div className="opacity-100">
						<WorkerRegister postFormWorkerAction={postFormWorkerAction} />
					</div>
				</section>

				{/* قسم الفوائد */}
				<section className="mb-8 bg-[#FFFFFF] p-6 md:p-12">
					<div className="container mx-auto px-4 md:px-12">
						<h2 className="mb-12 text-center font-['Readex_Pro'] text-4xl font-semibold text-gray-800 md:text-[39px]">
							فوائد الانضمام كمقدم خدمة في{" "}
							<span className="text-[#31A342]">شلة</span>
						</h2>
						<div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
							{/* البطاقة الأولى */}
							<div className="w-full max-w-[550px] overflow-hidden rounded-lg bg-[#EDEDED] shadow-lg lg:w-1/2">
								<div className="relative aspect-[550/300] w-full">
									<img
										src="worker2.jpg"
										alt="Delivery Agent on a bike"
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-6 text-right">
									<h3 className="mb-2 text-xl font-semibold text-green-600">
										استمتع برسوم خدمة تنافسية
									</h3>
									<p className="text-gray-600">
										استمتع برسوم خدمة تنافسية عند استلام كل طلب واختر الطلبات
										القريبة منك
									</p>
								</div>
							</div>

							{/* البطاقة الثانية */}
							<div className="w-full max-w-[550px] overflow-hidden rounded-lg bg-[#EDEDED] shadow-lg lg:w-1/2">
								<div className="relative aspect-[550/300] w-full">
									<img
										src="worker1.jpg"
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
