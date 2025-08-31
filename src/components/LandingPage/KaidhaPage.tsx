"use client";

import KaidhaRegister from "./KaidhaRegister";

export default function KaidhaPage() {
	return (
		<main>
			{/* قم بإضافة حاوية رئيسية لتحديد أقصى عرض ووضعها في المنتصف */}
			<div className="mx-auto max-w-[1800px] px-2 py-8 sm:px-6 lg:px-8">
				{/* قسم النص مع تعديل الأبعاد والخلفية */}
				<section className="relative mb-8 rounded-xl bg-[#F6F5F0] p-6 shadow-sm md:p-12">
					<div className="flex h-auto w-full items-end justify-end">
						<p className="text-right font-['Readex_Pro'] text-base text-[#2D3633] md:text-2xl">
							تُقدّم خدمة "<span className="text-[#31A342]">قيدها</span>" منصةً
							مبتكرةً تُعيد تعريف مفهوم التمويل الاستهلاكي، حيث تُتيح للمستخدمين
							مرونةً غير مسبوقة في سداد قيمة مشترياتهم من المواد الغذائية
							والاستهلاكية. تعتمد "<span className="text-[#31A342]">قيدها</span>
							" على مبدأ "اشتر الآن، ادفع مع الراتب"، مما يُمكّن الأفراد من
							تلبية احتياجاتهم الأساسية دون القلق بشأن توافر السيولة النقدية في
							وقت الشراء. وتُمثّل "<span className="text-[#31A342]">قيدها</span>
							" نقلةً نوعيةً في مفهوم التمويل الاستهلاكي، حيث تُوفّر مرونةً غير
							مسبوقة وتُساهم في تحسين القوة الشرائية للأفراد. ومن خلال التعامل
							المسؤول والتوعية المالية، يُمكن أن تُساهم "
							<span className="text-[#31A342]">قيدها</span>" في تحقيق الاستقرار
							المالي والرفاهية الاقتصادية للمستخدمين.
						</p>
					</div>
				</section>
				{/* قسم الفورم */}
				<section className="mb-8 rounded-xl bg-[#FFFFFF] p-6 shadow-md md:p-12">
					
					<div className="opacity-100">
						<KaidhaRegister />
					</div>
				</section>

				
			</div>
		</main>
	);
}
