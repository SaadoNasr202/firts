import InvestorePage from "@/components/LandingPage/investore";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { db } from "@/lib/db";
import { TB_Investore } from "@/lib/schema";
import { nanoid } from "nanoid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التسجيل كمستثمر - شلة",
  description: "انضم إلى برنامج الاستثمار في شلة واستثمر في مستقبل التوصيل والخدمات. سجل الآن كمستثمر وكن جزءاً من النمو.",
  keywords: "مستثمر شلة, استثمار, تسجيل مستثمر, استثمار في التوصيل, نمو الأعمال, فرص استثمارية",
  openGraph: {
    title: "التسجيل كمستثمر - شلة",
    description: "انضم إلى برنامج الاستثمار في شلة واستثمر في مستقبل التوصيل والخدمات. سجل الآن كمستثمر وكن جزءاً من النمو.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "التسجيل كمستثمر - شلة",
    description: "انضم إلى برنامج الاستثمار في شلة واستثمر في مستقبل التوصيل والخدمات. سجل الآن كمستثمر وكن جزءاً من النمو.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Invstore() {
	return (
		<div>
			<Navbar />
			<InvestorePage postInvestoreAction={postInvestoreAction} />
			<Shellafooter />
		</div>
	);
}

export interface InvestoreFormData {
	first_name: string;
	father_name: string;
	family_name: string;
	grandfather_name: string;
	birth_date: string;
	national_id: string;
	email: string;
	phone: string;
	national_address_email: string;
	region: string;
	iban: string;
	bank_name: string;
	amount: string;
	agreed: boolean;
}

async function postInvestoreAction(
	formData: InvestoreFormData,
): Promise<{ success: boolean; message?: string }> {
	"use server";
	try {
		const newData = {
			id: nanoid(),
			first_name: formData.first_name,
			father_name: formData.father_name,
			family_name: formData.family_name,
			grandfather_name: formData.grandfather_name,
			birth_date: formData.birth_date,
			national_id: formData.national_id,
			email: formData.email,
			phone: formData.phone,
			national_address_email: formData.national_address_email,
			region: formData.region,
			iban: formData.iban,
			bank_name: formData.bank_name,
			amount: formData.amount,
			agreed: formData.agreed,
		};

		await db.insert(TB_Investore).values(newData);

		return { success: true, message: "تم إضافة المستفيد بنجاح" };
	} catch (error) {
		console.error("Error inserting beneficiary data:", error);
		return {
			success: false,
			message: "حدث خطأ أثناء إضافة المستفيد",
		};
	}
}
