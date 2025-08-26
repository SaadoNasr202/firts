import Shellafooter from "@/components/shellafooter";
import Navbar from "@/components/navbar";
import DriverPage from "@/components/driverPage";
export default function driver() {
  return (
    
    <div
      className={`font-tajawal w-full bg-[#F0F2F5] text-gray-800`}
      dir=""
    >
         <Navbar />
      
      <DriverPage/>
      <Shellafooter />

    </div>
  );
}
