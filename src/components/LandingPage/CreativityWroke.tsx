"use client";

import { motion } from "framer-motion";
import {
	ArrowRight,
	CheckCircle,
	Globe,
	Phone,
	PlayCircle,
	Zap,
} from "lucide-react";
import React, { useState } from "react";

// Assuming you have a SlideVideo component like this:
const SlideVideo = () => (
	<div className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-200 shadow-xl md:h-96">
		<img
			src="https://via.placeholder.com/1280x720.png?text=Your+Video+Thumbnail" // Placeholder for video thumbnail
			alt="Video Thumbnail"
			className="h-full w-full object-cover"
		/>
		<div className="bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black">
			<PlayCircle size={64} className="text-white opacity-80" />
		</div>
	</div>
);

// Sample Post Data
const posts = [
	{
		id: 1,
		title: "كيف تزيد مبيعات متجرك في 3 خطوات",
		excerpt:
			"اكتشف استراتيجيات فعالة لزيادة الإيرادات وتحقيق أهدافك التجارية...",
		imageUrl: "https://via.placeholder.com/400x250.png?text=Post+Image+1",
		link: "#",
	},
	{
		id: 2,
		title: "دليلك الشامل للتسويق الرقمي الفعال",
		excerpt:
			"تعلم أساسيات التسويق الرقمي وكيفية بناء حملات ناجحة لعلامتك التجارية...",
		imageUrl: "https://via.placeholder.com/400x250.png?text=Post+Image+2",
		link: "#",
	},
	{
		id: 3,
		title: "أفضل الممارسات لتحسين تجربة العملاء",
		excerpt: "قدم تجربة لا تُنسى لعملائك وحوّلهم إلى سفراء لعلامتك التجارية...",
		imageUrl: "https://via.placeholder.com/400x250.png?text=Post+Image+3",
		link: "#",
	},
	{
		id: 4,
		title: "أفضل الممارسات لتحسين تجربة العملاء",
		excerpt: "قدم تجربة لا تُنسى لعملائك وحوّلهم إلى سفراء لعلامتك التجارية...",
		imageUrl: "https://via.placeholder.com/400x250.png?text=Post+Image+3",
		link: "#",
	},
];

export default function CreativityWroke() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => {
			setEmail("");
			setSubmitted(false);
		}, 2500);
	}

	return (
		<div
			className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-100 text-slate-900"
			dir="rtl"
		>
			{/* Background Blobs (updated to green/yellow tones) */}
			<div className="absolute -top-32 -left-32 h-96 w-96 animate-pulse rounded-full bg-green-300 opacity-30 mix-blend-multiply blur-3xl filter"></div>
			<div className="absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-yellow-300 opacity-30 mix-blend-multiply blur-3xl filter"></div>

			{/* NAV */}
			<header className="sticky top-0 z-50 mx-auto flex max-w-7xl items-center justify-between border-b border-slate-200 bg-white/60 px-6 py-6 backdrop-blur">
				<div className="flex items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r text-white shadow-lg">
						<img
							src="/shellalogo.png"
							alt="شعار شلة"
							className="h-17 w-17 object-contain p-2"
						/>
					</div>
					<div>
						<h1 className="text-lg font-semibold">شلة</h1>
						<p className="-mt-1 text-xs text-slate-500">
							نرفع أعمالك إلى القمة
						</p>
					</div>
				</div>
				<nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
					<a className="cursor-pointer hover:text-green-700">المميزات</a>
					<a className="cursor-pointer hover:text-green-700">الدعم</a>
					<a className="cursor-pointer hover:text-green-700">تواصل معنا</a>
					<button className="rounded-lg bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 px-4 py-2 text-white shadow transition hover:scale-105">
						تفعيل الباقة المجانية
					</button>
				</nav>
			</header>

			{/* HERO */}
			<main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2">
				<section>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-4xl leading-tight font-extrabold md:text-5xl"
					>
						إبداع في عملك{" "}
						<span className="bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent">
							كل ما تحتاجه لإدارة متجرك في مكان واحد
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="mt-6 max-w-xl text-lg text-slate-700"
					>
						ودّع التعقيد، وابدأ بالتحكم الكامل عبر تطبيق شله. إدارة المتجر
						بالطريقة التقليدية = هدر وقت وجهد.
					</motion.p>

					<div className="mt-8 flex flex-col gap-4 sm:flex-row">
						<motion.a
							whileHover={{ scale: 1.05 }}
							className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 px-6 py-3 font-medium text-white shadow-lg"
							href="#form"
						>
							ابدأ رحلتك الآن <Zap size={18} />
						</motion.a>
						<a className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600 hover:text-green-700">
							<Globe size={16} /> تعرف أكثر
						</a>
					</div>

					{/* Key bullets */}
					<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FeatureCard
							icon={<CheckCircle />}
							title="إدارة المنتجات والمخزون بسهولة"
							desc="وتنبيهات ذكية عند النقص"
						/>
						<FeatureCard
							icon={<Globe />}
							title="متابعة الطلبات بكفاءة"
							desc="من التأكيد حتى التسليم"
						/>
						<FeatureCard
							icon={<Zap />}
							title="تواصل مباشر وفعّال مع عملائك"
							desc="داخل التطبيق"
						/>
						<FeatureCard
							icon={<Phone />}
							title="إطلاق عروض وكوبونات تسويقية مبتكرة"
							desc="تساعد على زيادة المبيعات"
						/>
					</div>
				</section>

				{/* RIGHT: demo card + form */}
				<aside className="relative">
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="relative rounded-2xl border border-slate-100 bg-white p-8 shadow-2xl"
					>
						<div className="absolute -top-4 -left-4 rounded-full bg-gradient-to-r from-green-500 to-lime-500 px-3 py-1 text-xs text-white shadow">
							جديد
						</div>
						<div className="flex items-start justify-between">
							<div>
								<div className="text-xs text-slate-500">منظومة تجارية</div>
								<h3 className="mt-1 text-xl font-semibold">
									ابدأ الآن رحلة الإبداع مع شله
								</h3>
								<p className="mt-2 text-sm text-slate-600">
									حمّل التطبيق وكن جزءًا من شبكة التجار المبتكرين.
								</p>
							</div>
							<div className="font-bold text-green-600"></div>
						</div>

						<ul className="mt-5 space-y-3 text-sm text-slate-700">
							<li className="flex items-center gap-3">
								<CheckCircle size={16} className="text-green-600" /> إدارة
								المنتجات والمخزون بسهولة
							</li>
							<li className="flex items-center gap-3">
								<CheckCircle size={16} className="text-green-600" /> متابعة
								الطلبات بكفاءة
							</li>
							<li className="flex items-center gap-3">
								<CheckCircle size={16} className="text-green-600" /> تواصل مباشر
								وفعّال مع عملائك
							</li>
						</ul>

						<form id="form" onSubmit={handleSubmit} className="mt-6">
							<label className="text-xs text-slate-500">
								بريدك الإلكتروني للتواصل
							</label>
							<div className="mt-2 flex gap-2">
								<input
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type="email"
									placeholder="example@mail.com"
									className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-green-200 focus:outline-none"
								/>
								<button
									type="submit"
									className="rounded-lg bg-gradient-to-r from-green-500 to-lime-500 px-5 py-2 font-medium text-white shadow transition hover:scale-105"
								>
									حمّل التطبيق
								</button>
							</div>
							{submitted && (
								<div className="mt-3 text-sm text-green-600">
									تم التسجيل — سيتم التواصل معك قريبًا.
								</div>
							)}
						</form>

						<div className="mt-4 text-xs text-slate-400">
							* تواصل معنا للمزيد من التفاصيل.
						</div>
					</motion.div>
				</aside>
			</main>

			{/* SlideVideo Section */}
			<section className="mx-auto max-w-7xl px-6 py-16">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-8 text-center text-3xl font-extrabold md:text-4xl"
				>
					شاهد كيف نساعدك على{" "}
					<span className="bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent">
						النجاح
					</span>
				</motion.h2>
				<SlideVideo />
			</section>

			{/* Posts Section */}
			<section className="mx-auto max-w-7xl px-6 py-16">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center text-3xl font-extrabold md:text-4xl"
				>
					أحدث <span className="text-green-600">منشوراتنا</span>
				</motion.h2>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<PostCard key={post.id} {...post} />
					))}
				</div>
			</section>
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	desc,
}: {
	icon: React.ReactNode;
	title: string;
	desc: string;
}) {
	return (
		<motion.div
			whileHover={{ scale: 1.03 }}
			className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-md transition hover:shadow-lg"
		>
			<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-100 to-lime-100 text-green-600">
				{icon}
			</div>
			<div>
				<div className="font-semibold">{title}</div>
				<div className="text-sm text-slate-500">{desc}</div>
			</div>
		</motion.div>
	);
}

function PostCard({
	title,
	excerpt,
	imageUrl,
	link,
}: {
	title: string;
	excerpt: string;
	imageUrl: string;
	link: string;
}) {
	return (
		<motion.div
			whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
			className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg transition duration-300"
		>
			<img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
			<div className="p-6">
				<h3 className="mb-2 text-xl font-semibold text-slate-800">{title}</h3>
				<p className="text-sm text-slate-600">{excerpt}</p>
				<a
					href={link}
					className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-800"
				>
					اقرأ المزيد <ArrowRight size={16} />
				</a>
			</div>
		</motion.div>
	);
}
