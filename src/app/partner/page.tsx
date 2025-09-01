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
export interface FormData {
	storeName: string;
	storeClassification: string;
	whatYourStoreOffers: string;
	city: string;
	branchCount: string;
	phoneNumber: string;
	englishStoreName: string;
	personalIdNumber: string;
	detailedAddress: string;
	agreed: boolean;
}

async function postFormPartnerAction(
	formData: FormData,
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
			detailedAddress: formData.detailedAddress,
			agreed: formData.agreed,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await db.insert(TB_Partner).values(newData);

		return { success: true };
	} catch (error) {
		console.error("Error inserting store data:", error);
		return {
			success: false,
		};
	}
}
