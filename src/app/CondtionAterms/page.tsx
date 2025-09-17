import CondtionAterms from "@/components/Condetion/CondtionAterms";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام - شلة",
  description: "اقرأ شروط وأحكام استخدام منصة شلة. تعرف على حقوقك ومسؤولياتك عند استخدام خدماتنا.",
  keywords: "شروط وأحكام, شلة, استخدام, حقوق, مسؤوليات, خدمات",
  openGraph: {
    title: "الشروط والأحكام - شلة",
    description: "اقرأ شروط وأحكام استخدام منصة شلة. تعرف على حقوقك ومسؤولياتك عند استخدام خدماتنا.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "الشروط والأحكام - شلة",
    description: "اقرأ شروط وأحكام استخدام منصة شلة. تعرف على حقوقك ومسؤولياتك عند استخدام خدماتنا.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Condition(){
return (
    <>
      <NavBarCondition />
      <CondtionAterms />
      <Shellafooter />
    </>
  );
}