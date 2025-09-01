import KaidhaPage from "@/components/LandingPage/KaidhaPage";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { db } from "@/lib/db";
import { TB_KaidhaUsers } from "@/lib/schema";
import { nanoid } from "nanoid";

export default function Kaidha() {
	return (
		<div>
			<Navbar />
			<KaidhaPage postFormKaidhaAction={postFormKaidhaAction} />
			<Shellafooter />
		</div>
	);
}
	
export interface FormData {
	firstName: string;
	lastName: string;
	fatherName: string;
	grandFatherName: string;
	birthDate: string;
	nationality: string;
	socialStatus: string;
	familyMembersCount: string;
	idType: string;
	personalIdNumber: string;
	idExpirationDate: string;
	phoneNumber: string;
	whatsappNumber: string;
	email: string;
	homeType: string;
	homeNature: string;
	city: string;
	neighborhood: string;
	addressDetails: string;
	agreed: boolean;
	companyName: string;
	jobTitle: string;
	yearsOfExperience: string;
	grossSalary: string;
	workAddress: string;
}

async function postFormKaidhaAction(
	formData: FormData,
): Promise<{ success: boolean }> {
	"use server";
	try {
		const newData = {
			id: nanoid(),
			firstName: formData.firstName,
			lastName: formData.lastName,
			fatherName: formData.fatherName,
			grandFatherName: formData.grandFatherName,
			birthDate: new Date(formData.birthDate).toISOString(),
			nationality: formData.nationality,
			socialStatus: formData.socialStatus,
			familyMembersCount: parseInt(formData.familyMembersCount) || 0,
			idType: formData.idType,
			personalIdNumber: formData.personalIdNumber,
			idExpirationDate: new Date(formData.idExpirationDate).toISOString(), // Convert to string
			phoneNumber: formData.phoneNumber,
			whatsappNumber: formData.whatsappNumber,
			email: formData.email,
			homeType: formData.homeType,
			homeNature: formData.homeNature,
			city: formData.city,
			neighborhood: formData.neighborhood,
			addressDetails: formData.addressDetails,
			agreed: formData.agreed,
			companyName: formData.companyName,
			jobTitle: formData.jobTitle,
			yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
			grossSalary: formData.grossSalary,
			workAddress: formData.workAddress,
			createdTime: new Date(),
			lastUpdateTime: new Date(),
		};
		await db.insert(TB_KaidhaUsers).values(newData);

		return { success: true };
	} catch (error) {
		return {
			success: false,
		};
	}
}
