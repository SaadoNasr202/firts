import PartnerPage from "@/components/LandingPage/partmerPage";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { db } from "@/lib/db";
import { TB_Partner } from "@/lib/schema";
import { nanoid } from "nanoid";

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
	englishStoreName: string;
	personalIdNumber: string;
	idImage: string;
	Municipallicense: string;
	Storefrontimage: string;
	detailedAddress: string;
	agreed: boolean;
}

async function postFormPartnerAction(
	formData: PartnerFormData,
): Promise<{ success: boolean }> {
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
			englishStoreName: formData.englishStoreName,
			personalIdNumber: formData.personalIdNumber,
			idImage:formData.idImage,
			Municipallicense:formData.Municipallicense,
			Storefrontimage:formData.Storefrontimage,
			detailedAddress: formData.detailedAddress,
			agreed: formData.agreed,
		};

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
