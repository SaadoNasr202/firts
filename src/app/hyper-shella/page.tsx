import HyperShellaPage from "@/components/HomePage/HyperShellaPage";
import Breadcrumb from "@/components/HomePage/Breadcrumb";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import Shellafooter from "@/components/shellafooter";
import { Metadata } from "next";
import HyperShellaPageContent from "./HyperShellaPageContent";

export const metadata: Metadata = {
  title: "هايبر شلة - متجر شامل",
  description: "هايبر شلة - متجر شامل لكل احتياجاتك اليومية. خضروات، فواكه، لحوم، منتجات منزلية، ألبان وأجبان، خبز ومعجنات وأكثر. توصيل سريع إلى باب منزلك.",
  keywords: "هايبر شلة, متجر شامل, خضروات, فواكه, لحوم, منتجات منزلية, ألبان, أجبان, خبز, معجنات, تسوق",
  openGraph: {
    title: "هايبر شلة - متجر شامل",
    description: "هايبر شلة - متجر شامل لكل احتياجاتك اليومية. خضروات، فواكه، لحوم، منتجات منزلية، ألبان وأجبان، خبز ومعجنات وأكثر. توصيل سريع إلى باب منزلك.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "هايبر شلة - متجر شامل",
    description: "هايبر شلة - متجر شامل لكل احتياجاتك اليومية. خضروات، فواكه، لحوم، منتجات منزلية، ألبان وأجبان، خبز ومعجنات وأكثر. توصيل سريع إلى باب منزلك.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HyperShellaPageRoute() {
	return (
		<>
			<NavBarCondition />
			<div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8" dir="rtl">
				<HyperShellaPageContent />
			</div>
			<Shellafooter />
		</>
	);
}
