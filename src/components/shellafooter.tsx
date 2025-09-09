"use client";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Shellafooter() {
	const { t } = useLanguage();
	return (
		<div
			className={`font-tajawal w-full flex-col bg-[#FFFFFF] text-gray-800`}
			dir="rtl"
		>
			<footer className="mt-auto py-8 text-gray-800 shadow-inner md:py-12">
				<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col flex-wrap justify-between gap-12 md:flex-row lg:flex-nowrap">
						{/* Company Info Section */}
						<div className="w-full md:w-1/2 lg:w-2/6">
							<div className="mb-4 flex items-center">
								<img
									src="shellalogo.png"
									alt="شلة"
									className="h-12 w-auto md:h-16"
								/>
							</div>
							<p className="leading-relaxed text-gray-600 md:text-sm">
								{t('footer.companyDescription')}
							</p>
						</div>

						{/* Quick Links Section */}
						<div className="w-1/2 md:w-auto">
							<h4 className="mb-4 text-base font-semibold md:text-lg">
								{t('footer.company')}
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="#" className="hover:text-amber-500">
										{t('footer.about')}
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										{t('footer.jobs')}
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										{t('footer.faq')}
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										{t('footer.islamicLaw')}
									</a>
								</li>
							</ul>
						</div>

						{/* Legal Section */}
						<div className="w-1/2 md:w-auto">
							<h4 className="mb-4 text-base font-semibold md:text-lg">
								{t('footer.legal')}
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="/KaidhaTerms" className="hover:text-amber-500">
										{t('footer.qaydhaTerms')}
									</a>
								</li>
								<li>
									<a href="/PrivacyPolicy" className="hover:text-amber-500">
										{t('footer.privacyPolicy')}
									</a>
								</li>
								<li>
									<a href="/CondtionAterms" className="hover:text-amber-500">
										{t('footer.termsAndConditions')}
									</a>
								</li>
							</ul>
						</div>

						{/* Application Section */}
						<div className="w-1/2 md:w-auto">
							<h4 className="mb-4 text-base font-semibold md:text-lg">
								{t('footer.application')}
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="/driver" className="hover:text-amber-500">
										{t('footer.joinAsDriver')}
									</a>
								</li>
								<li>
									<a href="/partner" className="hover:text-amber-500">
										{t('footer.joinAsPartner')}
									</a>
								</li>
								<li>
									<a href="/worker" className="hover:text-amber-500">
										{t('footer.joinAsWorker')}
									</a>
								</li>
								<li>
									<a href="/invstore" className="hover:text-amber-500">
										{t('footer.joinAsInvestor')}
									</a>
								</li>
							</ul>
						</div>

						{/* Customer Service Section */}
						<div className="w-1/2 md:w-auto">
							<h4 className="mb-4 text-base font-semibold md:text-lg">
								{t('footer.customerService')}
							</h4>
							<ul className="space-y-2 text-sm text-gray-600 md:text-base">
								<li>
									<a href="#" className="hover:text-amber-500">
										{t('footer.customerTestimonials')}
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-amber-500">
										{t('footer.contactUs')}
									</a>
								</li>
								<li>
									<a href="./profile" className="hover:text-amber-500">
										{t('footer.profile')}
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Social and Copyright Section */}
					<div className="mt-8 flex flex-col items-center justify-between space-y-4 pt-8 md:flex-row md:space-y-0">
						<p className="text-center text-xs text-gray-500 md:text-start md:text-sm">
							{t('footer.copyright')}
						</p>
						<div className="flex space-x-4 space-x-reverse">
							{/* Social Media Icons */}
							<a
								href="https://www.linkedin.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-blue-700"
								aria-label="LinkedIn"
							>
								<FaLinkedin size={24} />
							</a>
							<a
								href="https://www.instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-pink-500"
								aria-label="Instagram"
							>
								<FaInstagram size={24} />
							</a>
							<a
								href="https://www.facebook.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-blue-600"
								aria-label="Facebook"
							>
								<FaFacebook size={24} />
							</a>
							<a
								href="https://www.x.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 transition-colors duration-300 hover:text-gray-800"
								aria-label="X (Twitter)"
							>
								<FaTwitter size={24} />
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
