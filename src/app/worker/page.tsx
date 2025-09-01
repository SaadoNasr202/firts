import WorkerPage from "@/components/LandingPage/WorkerPage";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { db } from "@/lib/db";
import { TB_Worker } from "@/lib/schema";
import { nanoid } from "nanoid";

export default function Worker() {
	return (
		<div>
			<Navbar />
			<WorkerPage postFormWorkerAction={postFormWorkerAction} />
			<Shellafooter />
		</div>
	);
}
export interface WorkerFormData {
	firstName: string;
	lastName: string;
	deliveryType: string;
	vehicleType: string;
	idType: string;
	personalIdNumber: string;
	email: string;
	region: string;
	idImage: string;
	agreed: boolean;
}

async function postFormWorkerAction(
	formData: WorkerFormData,
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
		};

		try {
			await db.insert(TB_Worker).values(newData);
		} catch (error) {
			return { success: false };
		}
		return { success: true };
	} catch (error) {
		console.error("Error inserting delivery driver data:", error);
		return {
			success: false,
		};
	}
}
