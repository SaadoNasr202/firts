"use client";
import { BriefcaseBusiness, Store, Truck, UsersRound } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LandingPage() {
	const { t } = useLanguage();
	return (
		<div
			// Use a consistent background color and modern font
			className={`font-tajawal flex min-h-screen w-full flex-col bg-[#FFFFFF] text-gray-800`}
			dir="rtl"
		>
			{/* المحتوى الرئيسي */}
			<main className="flex-grow">
				<div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
					{/* ====== HERO SECTION (القسم الأول) ====== */}
					<section className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
						<div className="relative">
							{/* صورة الخلفية */}
							<div className="flex h-[300px] w-full items-center justify-center sm:h-[400px] md:h-[500px] lg:h-[650px]">
								<img
									src="lanfingpage.jpg"
									alt="مع شلة كل احتياجاتك بضغطة زر"
									className="h-full w-full object-cover"
								/>
							</div>
							{/* Overlay لزيادة وضوح النص */}
							<div className="absolute inset-0 bg-black opacity-40" />
							{/* محتوى النص والزر - هذا الجزء كان متجاوبًا بالفعل */}
							<div className="font-['Readex Pro'] absolute inset-0 flex items-center justify-center p-6 text-center">
								<div className="space-y-4">
									<h1 className="text-3xl leading-tight font-bold text-white sm:text-2xl md:text-[49px]">
										{t('landing.hero.title').replace('شلة', t('company.name'))}
									</h1>
									<p className="text-xl font-semibold text-white sm:text-xl md:text-[39px]">
										{t('landing.hero.subtitle')}
									</p>
									<a
										href="/"
										className="inline-flex items-center justify-center rounded-lg bg-[#FA9D2B] px-6 py-3 text-base text-white shadow-xl transition-all duration-300 hover:bg-[#D48925] focus:ring-4 focus:ring-[#FA9D2B]/50 focus:outline-none sm:px-8 sm:py-4 sm:text-lg"
									>
										{t('landing.hero.browseButton')}
									</a>
								</div>
							</div>
						</div>
					</section>

					{/* ====== Mobile App SECTION (تطبيق الجوال) ====== */}
					<section className="mb-8 rounded-xl bg-[#EAF6EC] p-6 shadow-md md:p-12">
						<div className="grid items-center gap-6 lg:grid-cols-2">
							{/* النص وأيقونات المتاجر (يمين بالـRTL) */}
							<div className="flex flex-col items-center gap-6 text-center lg:items-end lg:text-right">
								<div className="flex flex-col">
									<h2 className="text-2xl font-semibold text-gray-900 md:text-4xl lg:text-5xl">
										<span className="text-[#1C4234]">{t('landing.mobileApp.title')}</span>
									</h2>
									<p className="mt-2 text-base text-gray-700 md:text-lg">
										{t('landing.mobileApp.subtitle')}
									</p>
								</div>

								{/* أيقونات متاجر التطبيقات */}
								<div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
									<a
										className="block h-12 w-36 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
										href="https://apps.apple.com/us/app/%D8%B4%D9%84%D9%87/id6739772273?l=ar"
									>
										<img
											src="appstore.png"
											alt="App Store"
											className="h-full w-full object-cover"
										/>
									</a>
									<a
										className="block h-12 w-36 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
										href="https://play.google.com/store/apps/details?id=com.food.shala&hl=ar&pli=1"
									>
										<img
											src="googleplay.png"
											alt="Google Play"
											className="h-full w-full object-cover"
										/>
									</a>
									<a
										className="block h-12 w-36 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
										href="https://play.google.com/store/apps/details?id=com.food.shala&hl=ar&pli=1"
									>
										<img
											src="appgalary.png"
											alt="AppGallery"
											className="h-full w-full object-cover"
										/>
									</a>
								</div>
							</div>

							{/* صورة التطبيق (يسار بالـRTL) - تم إضافة فئة `translate-y-` */}
							<div className="transform self-end justify-self-center sm:translate-y-30">
								<img
									src="imagemobile.png"
									alt="تطبيق شلة"
									className="h-auto max-w-full -translate-y-[-25px] md:translate-y-[-70px] lg:translate-y-[-70px]"
								/>
							</div>
						</div>
					</section>

					{/* ====== ROWS (الشراكات + قيدها) ====== */}
					<section className="space-y-6 bg-[#EAF6EC]">
						<div className="rounded-xl p-10 shadow-lg">
							<div className="grid items-center gap-5 md:grid-cols-2">
								<div className="gap-7 text-center">
									<h3 className="mb-2 text-4xl font-semibold text-[#34A853] md:text-5xl">
										{t('landing.qaydha.title')}
									</h3>
									<p className="text-2xl text-gray-700 md:text-3xl">
										{t('landing.qaydha.subtitle')}
									</p>
									<p className="mt-4 text-sm text-gray-600 md:text-base">
										{t('landing.qaydha.description')}
									</p>

									<a
										href="/Kaidha"
										className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2D943C] px-8 py-3 text-[#FFFFFF] shadow-xl transition-all duration-300 hover:bg-gray-100"
									>
										{t('landing.qaydha.registerButton')}
									</a>
									<a
										href="https://www.qaydha.com/"
										className="mt-10 inline-flex items-center justify-center rounded-full bg-[#2D943C] p-3.5 px-8 py-3 text-[#FFFFFF] shadow-xl transition-all duration-300 hover:bg-gray-100"
									>
										{t('landing.qaydha.learnMoreButton')}
									</a>
								</div>
								<img
									src="date.png"
									alt="تقويم"
									className="h-auto w-full transition-transform duration-300"
								/>
							</div>
						</div>

						{/* صف 1: مقدم خدمة × مستثمر */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<button
								className="cursor-pointer"
								onClick={() => {
									window.location.href = "/partner";
								}}
							>
							<Tile
								variant='default'
								title={t('landing.tiles.partner.title')}
								desc={t('landing.tiles.partner.desc')}
								Icon={Store}
							/>
							</button>
							<button
								className="cursor-pointer"
								onClick={() => {
									window.location.href = "/driver";
								}}
							>
							<Tile
								variant='alt'
								title={t('landing.tiles.driver.title')}
								desc={t('landing.tiles.driver.desc')}
								Icon={Truck}
							/>
							</button>
						</div>

						{/* صف 2: مندوب × تاجر */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<button
								className="cursor-pointer"
								onClick={() => {
									window.location.href = "/invstore";
								}}
							>
							<Tile
								variant='alt'
								title={t('landing.tiles.investor.title')}
								desc={t('landing.tiles.investor.desc')}
								Icon={UsersRound}
							/>
							</button>
							<button
								className="cursor-pointer"
								onClick={() => {
									window.location.href = "/worker";
								}}
							>
							<Tile
								variant='default'
								title={t('landing.tiles.worker.title')}
								desc={t('landing.tiles.worker.desc')}
								Icon={BriefcaseBusiness}
							/>
							</button>
						</div>
					</section>

					<div className="h-20" />
				</div>
			</main>
		</div>
	);
}

/* ------------ Components ------------ */
function Tile({
	title,
	desc,
	variant,
	Icon,
}: {
	title: string;
	desc: string;
	variant?: "alt" | "default";
	Icon?: React.ComponentType<any>;
}) {
	const { t } = useLanguage();
	const isAlt = variant === "alt";
	return (
		<article
			className={`rounded-xl p-6 shadow-md transition-transform duration-300 hover:scale-[1.02] ${isAlt ? "bg-white" : "bg-gray-100"}`}
		>
			<div className="grid h-full grid-cols-[auto_1fr] items-start gap-6">
				{/* الكود المعدل: تم إزالة الارتفاع الثابت واستبداله بـ h-full */}
				<div className={`relative h-full w-12 rounded-lg bg-emerald-500`}>
					{Icon && (
						<div className="absolute top-4 left-1/2 -translate-x-1/2">
							<Icon className="h-6 w-6 text-white" />
						</div>
					)}
				</div>

				<div className="text-right">
					<h4 className="mb-2 text-xl font-medium text-gray-800">{title}</h4>
					<p className="mb-4 text-sm text-gray-600">{desc}</p>
					<div className="inline-flex items-center gap-2">
						<span className="h-3 w-3 rounded-full bg-amber-500" />
						<span className="text-sm font-semibold text-amber-600">
							{t('landing.tiles.registerNow')}
						</span>
					</div>
				</div>
			</div>
		</article>
	);
}
