"use client";
import { BriefcaseBusiness, Store, Truck, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
	const router = useRouter();
	return (
		<div
			// Use a consistent background color and modern font
			className={`font-tajawal flex min-h-screen w-full flex-col bg-[#FFFFFF] text-gray-800`}
			dir="rtl"
		>
			{/* المحتوى الرئيسي */}
			<main className="flex-grow">
				<div className="mx-auto max-w-[1292px] px-4 py-8 sm:px-6 lg:px-8">
					{/* ====== HERO SECTION (القسم الأول) ====== */}
					<section className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
						<div className="relative">
							{/* صورة الخلفية */}
							{/* الكود المعدل: استخدام ارتفاع متجاوب بدلًا من الارتفاع الثابت */}
							<div className="flex min-h-[300px] w-full items-center justify-center lg:h-[650px]">
								<img
									src="lanfingpage.jpg"
									alt="مع شلة كل احتياجاتك بضغطة زر"
									className="h-full w-full object-cover"
								/>
							</div>
							{/* Overlay لزيادة وضوح النص */}
							<div className="absolute inset-0 opacity-20" />
							{/* محتوى النص والزر - هذا الجزء كان متجاوبًا بالفعل */}
							<div className="font-['Readex Pro'] absolute inset-0 flex items-center justify-center p-6 text-center">
								<div className="space-y-4">
									<h1 className="text-[39px] leading-tight font-bold text-white md:text-[49px]">
										مع <span className="text-[#31A342]">شلة</span> كل احتياجاتك
										بضغطة زر
									</h1>
									<p className="text-[31px] font-semibold text-white md:text-[39px]">
										أكثر من 60,000 مطعم ومتجر
									</p>
									<button className="inline-flex items-center justify-center rounded-lg bg-[#FA9D2B] px-8 py-3 text-base text-white shadow-xl transition-all duration-300 hover:bg-[#D48925] focus:ring-4 focus:ring-[#FA9D2B]/50 focus:outline-none">
										تصفّح الآن
									</button>
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
										<span className="text-[#1C4234]">تطبيق الجوال</span>
									</h2>
									<p className="mt-2 text-base text-gray-700 md:text-lg">
										حمّل تطبيق شلة على جوالك واطلب بضغطة زر
									</p>
								</div>

								{/* الكود المعدل: تم تغيير أحجام الأيقونات لجعلها متجاوبة */}
								<div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
									<a
										className="block h-12 w-36 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
										href="#"
									>
										<img
											src="appstore.png"
											alt="App Store"
											className="h-full w-full object-cover"
										/>
									</a>
									<a
										className="block h-12 w-36 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
										href="#"
									>
										<img
											src="googleplay.png"
											alt="Google Play"
											className="h-full w-full object-cover"
										/>
									</a>
									<a
										className="block h-12 w-36 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
										href="#"
									>
										<img
											src="appgalary.png"
											alt="AppGallery"
											className="h-full w-full object-cover"
										/>
									</a>
								</div>
							</div>
							{/* صورة التطبيق (يسار بالـRTL) */}
							<div className="justify-self-center lg:justify-self-start">
								<img
									src="imagemobile.png"
									alt="تطبيق شلة"
									className="h-auto max-w-full transition-transform duration-300 hover:scale-105"
								/>
							</div>
						</div>
					</section>

					{/* ====== ROWS (الشراكات + قيدها) ====== */}
					<section className="space-y-6 bg-[#EAF6EC]">
						<div className="rounded-xl p-10 shadow-lg">
							<div className="grid items-center gap-5 md:grid-cols-2">
								<div className="gap-6 text-center">
									<h3 className="mb-2 text-4xl font-semibold text-[#34A853] md:text-5xl">
										مع قيدها
									</h3>
									<p className="text-2xl text-gray-700 md:text-3xl">
										لا تحسب كم باقي على الراتب
									</p>
									<p className="mt-4 text-sm text-gray-600 md:text-base">
										شوف كم ناقصك في بيتك مقاضي وإحنا نعطيك على الراتب!
									</p>
									<a
										href="#signup"
										className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2D943C] px-8 py-3 text-[#FFFFFF] shadow-xl transition-all duration-300 hover:bg-gray-100"
									>
										سجّل الآن
									</a>
								</div>
								<img
									src="date.png"
									alt="تقويم"
									className="h-auto w-full transition-transform duration-300 hover:scale-105"
								/>
							</div>
						</div>

						{/* صف 1: مقدم خدمة × مستثمر */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<Tile
								variant="default"
								title="سجّل مطعمك أو متجرك"
								desc="وسّع نشاطك بالوصول إلى عملاء أكثر معنا."
								Icon={Store}
							/>
							<button
								className="cursor-pointer"
								onClick={() => {
									router.push("/driver");
								}}
							>
								<Tile
									variant="alt"
									title="سجّل كمندوب توصيل"
									desc="كن مندوب توصيل واكسب دخلًا إضافيًا معنا، سجّل الآن!"
									Icon={Truck}
								/>
							</button>
						</div>

						{/* صف 2: مندوب × تاجر */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <button
								className="cursor-pointer"
								onClick={() => {
									router.push("/invstore");
								}}
							>
								<Tile
									variant="alt"
									title="سجّل الآن كمستثمر في شلة"
									desc="قُم بالاستثمار في شركتنا وتعرّف على مزايا الاستثمار."
									Icon={UsersRound}
								/>
							</button>
							<button
								className="cursor-pointer"
								onClick={() => {
									router.push("/partner");
								}}
							>
								<Tile
									variant="default"
									title="سجّل كمقدّم خدمة"
									desc="سجّل حسب مهنتك معنا واكسب دخلًا إضافيًا."
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
							سجّل الآن
						</span>
					</div>
				</div>
			</div>
		</article>
	);
}
