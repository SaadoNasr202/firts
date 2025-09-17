import DriverPage from "@/components/LandingPage/driverPage";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { db } from "@/lib/db";
import { TB_DeliveryDrivers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التسجيل كسائق - شلة",
  description: "انضم إلى فريق سائقي شلة وابدأ رحلتك في عالم التوصيل. سجل الآن كسائق توصيل واكسب دخل إضافي مع مرونة في العمل.",
  keywords: "سائق توصيل, شلة, تسجيل سائق, توصيل طلبات, دخل إضافي, عمل مرن",
  openGraph: {
    title: "التسجيل كسائق - شلة",
    description: "انضم إلى فريق سائقي شلة وابدأ رحلتك في عالم التوصيل. سجل الآن كسائق توصيل واكسب دخل إضافي مع مرونة في العمل.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "التسجيل كسائق - شلة",
    description: "انضم إلى فريق سائقي شلة وابدأ رحلتك في عالم التوصيل. سجل الآن كسائق توصيل واكسب دخل إضافي مع مرونة في العمل.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function driver() {
	return (
		<div className={`font-tajawal w-full bg-[#F0F2F5] text-gray-800`} dir="">
			<Navbar />
			<DriverPage postFormDeliveryDriverAction={postFormDeliveryDriverAction} />
			<Shellafooter />
		</div>
	);
}

export interface FormData {
	firstName: string;
	lastName: string;
	deliveryType: string;
	vehicleType: string;
	idType: string;
	personalIdNumber: string;
	email: string;
	region: string;
	idImage: string;
	idDriver: string;
	idVichle: string;
	Picture: string;
	agreed: boolean;
}

async function postFormDeliveryDriverAction(
	formData: FormData,
): Promise<{ success: boolean } | { message: string; field: string }> {
	"use server";
	try {
		const newData = {
			id: nanoid(),
			firstName: formData.firstName,
			lastName: formData.lastName,
			deliveryType: formData.deliveryType,
			vehicleType: formData.vehicleType,
			idType: formData.idType,
			personalIdNumber: formData.personalIdNumber,
			email: formData.email,
			region: formData.region,
			idImage: formData.idImage,
			idDriver: formData.idDriver,
			Picture: formData.Picture,
			idVichle: formData.idVichle,
			agreed: formData.agreed,
		};

		try {
			const existingData = await db
				.select()
				.from(TB_DeliveryDrivers)
				.where(
					eq(TB_DeliveryDrivers.personalIdNumber, formData.personalIdNumber),
				);
			if (existingData.length) {
				return {
					message: "الرقم القومي موجود بالفعل",
					field: "personalIdNumber",
				};
			}
		} catch (error) {
			console.log("error: " + error);
		}
		try {
			await db.insert(TB_DeliveryDrivers).values(newData);
		} catch (error) {
			console.log(error);
		}
		return { success: true };
	} catch (error) {
		console.error("Error inserting delivery driver data:", error);
		return {
			success: false,
		};
	}
}
