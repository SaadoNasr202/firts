import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center w-full px-6 py-2 bg-white shadow-sm border-b">
    
      <div className="flex items-center border rounded-2xl px-3 py-1 gap-2">
        <ChevronDown className="text-green-600" size={22} />
        <span className="text-gray-800 font-medium">العربية</span>
        <Image
          src="/saudiflag.png"
          alt="Saudi Flag"
          width={45}
          height={40}
          className="rounded-sm"
        />
      </div>

     
      <Image
        src="/shellalogo.png"
        alt="logo"
        width={171.05}
        height={78}
        
        className="object-contain"
      />
    </nav>
  );
}
