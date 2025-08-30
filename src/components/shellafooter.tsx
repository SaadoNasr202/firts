"use client";
export default function Shellafooter() {
	return (
		<div
			// Use a consistent background color and modern font
			className={`font-tajawal w-full flex-col bg-[#FFFFFF] text-gray-800`}
			dir="rtl"
		>
			<footer className="mt-auto py-8 text-gray-800 shadow-inner md:py-12">
				<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-6">
						<div className="lg:col-span-2">
							<div className="mb-4 flex items-center">
								<img
									src="shellalogo.png"
									alt="شلة"
									className="h-12 w-auto md:h-16"
								/>
							</div>
							<p className="mb-4 text-xs leading-relaxed text-gray-600 md:text-sm">
								شلة منشأة سعودية مرخصة من قبل وزارة التجارة لممارسة النشاط
								التسويقي للغير وبيع التجزئة والجملة للأفراد والمنشآت بسجل تجاري
								رقم 1009128112 برأس مال 50 مليون ريال سعودي.
							</p>
						</div>

						<div className="">
							<h4 className="mb-3 text-base font-semibold md:mb-4 md:text-lg">
								الشركة
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="#" className="hover:text-amber-500">
										عن شلة
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										الوظائف
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										أسئلة وأجوبة
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										الشريعة الإسلامية
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="mb-3 text-base font-semibold md:mb-4 md:text-lg">
								القانونية
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="/KaidhaTerms" className="hover:text-amber-500">
										شروط قيدها
									</a>
								</li>
								<li>
									<a href="/PrivacyPolicy" className="hover:text-amber-500">
										سياسة الخصوصية
									</a>
								</li>
								<li>
									<a href="/CondtionAterms" className="hover:text-amber-500">
										الشروط والأحكام
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="mb-3 text-base font-semibold md:mb-4 md:text-lg">
								التطبيق
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="/driver" className="hover:text-amber-500">
										انضم كمندوب توصيل
									</a>
								</li>
								<li>
									<a href="/partner" className="hover:text-amber-500">
										انضم كتاجر{" "}
									</a>
								</li>
								<li>
									<a href="/worker" className="hover:text-amber-500">
										انضم كمقدم  خدمة
									</a>
								</li>
								<li>
									<a href="/invstore" className="hover:text-amber-500">
										انضم كمستثمر
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="mb-3 text-base font-semibold md:mb-4 md:text-lg">
								خدمة العملاء
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="#" className="hover:text-amber-500">
										إقرارات العملاء
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										تواصل معنا
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="flex flex-col items-center justify-between pt-8 md:flex-row">
						<div className="mt-4 flex space-x-4 space-x-reverse md:mt-0">
							<a
								href="https://www.facebook.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-blue-600"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873V14.89h-2.54V12h2.54V9.796c0-2.505 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v4.983C18.343 21.128 22 16.991 22 12z"
										clipRule="evenodd"
									/>
								</svg>
							</a>

							<a
								href="https://www.instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-pink-500"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12.315 2c2.43 0 2.7.01 3.674.058.974.048 1.503.189 2.078.435a4.004 4.004 0 001.417.929c.45.243.837.477 1.228.79.39.313.654.717.896 1.154.242.436.41.88.54 1.353.13.473.238.99.308 1.516.07.526.113 1.05.132 1.573.018.523.033 1.047.033 1.571s-.015 1.048-.033 1.571c-.02 2.76-.237 3.757-.54 4.567-.242.474-.506.878-.896 1.154a4.004 4.004 0 01-1.228.79c-.575.246-1.104.387-2.078.435-.974.048-1.244.058-3.674.058s-2.704-.01-3.674-.058c-.974-.048-1.503-.189-2.078-.435a4.004 4.004 0 01-1.417-.929c-.45-.243-.837-.477-1.228-.79-.39-.313-.654-.717-.896-1.154-.242-.436-.41-.88-.54-1.353-.13-.473-.238-.99-.308-1.516-.07-.526-.113-1.05-.132-1.573-.018-.523-.033-1.047-.033-1.571s.015-1.048.033-1.571c.02-2.76.237-3.757.54-4.567.242-.474.506-.878.896-1.154a4.004 4.004 0 011.228-.79c.575-.246 1.104-.387 2.078-.435.974-.048 1.244-.058 3.674-.058zM12 4.197a7.803 7.803 0 100 15.606A7.803 7.803 0 0012 4.197zM17.585 5a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM12 8.05a3.95 3.95 0 100 7.9A3.95 3.95 0 0012 8.05z"
										clipRule="evenodd"
									/>
								</svg>
							</a>

							<a
								href="https://www.linkedin.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-blue-700"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4.01-3.08-4.01 0v5.604h-3v-11h3v1.765c1.396-2.586 7.01-2.026 7.01 3.244v6.001z"
										clipRule="evenodd"
									/>
								</svg>
							</a>

							<a
								href="https://www.x.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-gray-800"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.236 7.425c-.217 0-.435.044-.652.131-1.343.415-2.219 1.583-2.589 3.012-.37.429-.553.94-.553 1.517 0 .577.183 1.088.553 1.517.37.429 1.246.741 2.589 1.011 1.343.27 2.658.398 3.993.416 1.335.018 2.651-.01 3.994-.088v-2.001c-1.343.078-2.659.13-3.994.088-1.335-.018-2.65-.136-3.993-.416-1.343-.27-2.219-.582-2.589-1.011-.37-.429-.553-.94-.553-1.517 0-.577.183-1.088.553-1.517.37-.429 1.246-1.096 2.589-1.511 1.343-.415 2.658-.707 3.993-.872 1.335-.165 2.65-.213 3.994-.143v-2.001c-1.343-.07-2.659-.118-3.994-.143-1.335-.025-2.65-.073-3.993.143z" />
								</svg>
							</a>
						</div>
						<p className="order-first text-center text-xs text-gray-500 md:order-none md:text-start md:text-sm">
							Shellaksa 2024 ©
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
