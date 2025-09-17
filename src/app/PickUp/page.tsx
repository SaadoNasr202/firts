import PickUp from "@/components/HomePage/Pick-upAndAeliveryService/PickUpAnd";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "استلام وتسليم - شلة",
  description: "خدمة استلام وتسليم شلة - استلم طلباتك من المتاجر أو سلمها للعملاء. خدمة موثوقة وسريعة لجميع احتياجاتك.",
  keywords: "استلام وتسليم, شلة, خدمة التوصيل, استلام طلبات, تسليم طلبات, خدمة موثوقة",
  openGraph: {
    title: "استلام وتسليم - شلة",
    description: "خدمة استلام وتسليم شلة - استلم طلباتك من المتاجر أو سلمها للعملاء. خدمة موثوقة وسريعة لجميع احتياجاتك.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "استلام وتسليم - شلة",
    description: "خدمة استلام وتسليم شلة - استلم طلباتك من المتاجر أو سلمها للعملاء. خدمة موثوقة وسريعة لجميع احتياجاتك.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PickUpDilevery() {
	return (
		<div>
			<NavBarCondition />
			<PickUp />
			<Shellafooter />
		</div>
	);
}
