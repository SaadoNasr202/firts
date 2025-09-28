import NavBarCondition from "@/components/Profile/NavBarConditon";
import ProfileList from "@/components/Profile/ProfileList";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الملف الشخصي - شلة",
  description: "إدارة ملفك الشخصي في شلة. عرض معلوماتك، طلباتك، المفضلة، العناوين المحفوظة، وإعدادات الحساب.",
  keywords: "الملف الشخصي, شلة, حساب, طلبات, مفضلة, عناوين, إعدادات",
  openGraph: {
    title: "الملف الشخصي - شلة",
    description: "إدارة ملفك الشخصي في شلة. عرض معلوماتك، طلباتك، المفضلة، العناوين المحفوظة، وإعدادات الحساب.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "الملف الشخصي - شلة",
    description: "إدارة ملفك الشخصي في شلة. عرض معلوماتك، طلباتك، المفضلة، العناوين المحفوظة، وإعدادات الحساب.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Profile() {
	return (
		<>
			<NavBarCondition />
			<ProfileList />
			<Shellafooter />
		</>
	);
}
