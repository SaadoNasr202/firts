import NavBarCondition from "@/components/Profile/NavBarConditon";
import PrivacyPolicy from "@/components/Condetion/PrivacyPolicy";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - شلة",
  description: "تعرف على كيفية حماية شلة لخصوصيتك وبياناتك الشخصية. سياسة الخصوصية الشاملة لضمان أمان معلوماتك.",
  keywords: "سياسة الخصوصية, شلة, حماية البيانات, خصوصية, أمان, معلومات شخصية",
  openGraph: {
    title: "سياسة الخصوصية - شلة",
    description: "تعرف على كيفية حماية شلة لخصوصيتك وبياناتك الشخصية. سياسة الخصوصية الشاملة لضمان أمان معلوماتك.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "سياسة الخصوصية - شلة",
    description: "تعرف على كيفية حماية شلة لخصوصيتك وبياناتك الشخصية. سياسة الخصوصية الشاملة لضمان أمان معلوماتك.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPol(){
return (
    <>
      <NavBarCondition />
      <PrivacyPolicy />
      <Shellafooter />
    </>
  );
}