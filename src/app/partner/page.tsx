import PartnerPage from "@/components/LandingPage/partmerPage";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { db } from "@/lib/db";
import { TB_Partner } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التسجيل كشريك - شلة",
  description: "انضم إلى شبكة شركاء شلة ووسع عملك. سجل متجرك أو مطعمك معنا ووصل لعملاء جدد في منطقتك.",
  keywords: "شريك شلة, تسجيل متجر, تسجيل مطعم, شراكة تجارية, توسيع العمل, عملاء جدد",
  openGraph: {
    title: "التسجيل كشريك - شلة",
    description: "انضم إلى شبكة شركاء شلة ووسع عملك. سجل متجرك أو مطعمك معنا ووصل لعملاء جدد في منطقتك.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "التسجيل كشريك - شلة",
    description: "انضم إلى شبكة شركاء شلة ووسع عملك. سجل متجرك أو مطعمك معنا ووصل لعملاء جدد في منطقتك.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Partner() {
	return (
		<div className={`font-tajawal w-full bg-[#FFFFFF] text-gray-800`} dir="">
			<Navbar />
			<PartnerPage postFormPartnerAction={postFormPartnerAction} />
			<Shellafooter />
		</div>
	);
}
export interface PartnerFormData {
	storeName: string;
	storeClassification: string;
	whatYourStoreOffers: string;
	city: string;
	branchCount: string;
	phoneNumber: string;
	personalIdNumber: string;
	idImage: string;
	Municipallicense: string;
	Storefrontimage: string;
	location: string;
	agreed: boolean;
}

async function postFormPartnerAction(
	formData: PartnerFormData,
): Promise<{ success: boolean } |{message: string;field: string}> {
	"use server";
	try {
		const newData = {
			id: nanoid(),
			storeName: formData.storeName,
			storeClassification: formData.storeClassification,
			whatYourStoreOffers: formData.whatYourStoreOffers,
			city: formData.city,
			branchCount: formData.branchCount,
			phoneNumber: formData.phoneNumber,
			personalIdNumber: formData.personalIdNumber,
			idImage:formData.idImage,
			Municipallicense:formData.Municipallicense,
			Storefrontimage:formData.Storefrontimage,
			location: formData.location,
			agreed: formData.agreed,
		};
		try {
			const existingData = await db.select().from(TB_Partner).where(eq(TB_Partner.personalIdNumber, formData.personalIdNumber));
			if(existingData.length){
				return { message: "الرقم القومي موجود بالفعل", field: "personalIdNumber" };
			}
		} catch (error) {
			console.log("error: " + error);
		}

		try {
			await db.insert(TB_Partner).values(newData);
		} catch (error) {
			console.log(error);
		}

		return { success: true };
	} catch (error) {
		console.error("Error inserting store data:", error);
		return {
			success: false,
		};
	}
}
