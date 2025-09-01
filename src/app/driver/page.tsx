import DriverPage from "@/components/LandingPage/driverPage";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { db } from "@/lib/db";
import { TB_DeliveryDrivers } from "@/lib/schema";
import { nanoid } from "nanoid";

export default function driver() {
	return (
		<div className={`font-tajawal w-full bg-[#F0F2F5] text-gray-800`} dir="">
			<Navbar />
			<DriverPage  postFormDeliveryDriverAction={postFormDeliveryDriverAction}/>
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
	idImage: File | null;
	agreed: boolean;
}

async function postFormDeliveryDriverAction(
	formData: FormData,
): Promise<{ success: boolean }> {
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
			agreed: formData.agreed,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		//await db.insert(TB_DeliveryDrivers).values("");

		return { success: true };
	} catch (error) {
		console.error("Error inserting delivery driver data:", error);
		return {
			success: false,
		};
	}
}
