"use client";

import { KaidhaFormData } from "@/app/Kaidha/page";
import KaidhaRegister from "./KaidhaRegister";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KaidhaPage({
	postFormKaidhaAction,
}: {
	postFormKaidhaAction: (formData: KaidhaFormData) => Promise<{ success: boolean }|{message: string;field: string}>;
}) {
	const { t } = useLanguage();
	return (
		<main>
			{/* قم بإضافة حاوية رئيسية لتحديد أقصى عرض ووضعها في المنتصف */}
			<div className="mx-auto max-w-[1800px] px-2 py-8 sm:px-6 lg:px-8">
				{/* قسم النص مع تعديل الأبعاد والخلفية */}
				<section className="relative mb-8 rounded-xl bg-[#F6F5F0] p-6 shadow-sm md:p-12">
					<div className="flex h-auto w-full items-end justify-end">
						<p className="text-right font-['Readex_Pro'] text-base text-[#2D3633] md:text-2xl">
							{t('kaidha.description')}
						</p>
					</div>
				</section>
				{/* قسم الفورم */}
				<section className="mb-8 rounded-xl bg-[#FFFFFF] p-6 shadow-md md:p-12">
					<div className="opacity-100">
						<KaidhaRegister postFormKaidhaAction={postFormKaidhaAction} />
					</div>
				</section>
			</div>
		</main>
	);
}
