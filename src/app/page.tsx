import LandingPage from "@/components/LandingPage/landingpage";
import Navbar from "@/components/navbar";
import Shellafooter from "@/components/shellafooter";
import { Analytics } from "@vercel/analytics/next"
export default function Home() {
  return (
    <div>
      <Navbar />

          
      <LandingPage />
      <Shellafooter />
    </div>


  );
}
