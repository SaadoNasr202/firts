import { FormData } from "@/app/driver/page";
import DeliveryAgentForm from "./driverregister";

export default function DriverPage({
  postFormDeliveryDriverAction,
}: {
  postFormDeliveryDriverAction: (formData: FormData) => Promise<{ success: boolean }>;
}){   
    return (
        <main>
        <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
          {/* قسم صورة الخلفية */}
          <section className="relative mb-8 overflow-hidden">
            <div className="relative">
              <div className="flex h-auto w-full items-center justify-center min-h-[300px] aspect-video">
                <img
                  src="driver.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* قسم الفورم */}
          <section className="mb-8 rounded-xl bg-[#FFFFFF] p-6 shadow-md md:p-12">
            <div className="text-center font-['Readex_Pro'] text-[39px] leading-none font-semibold tracking-normal">
              الانضمام كعامل توصيل
            </div>
            <div className="opacity-100">
              <DeliveryAgentForm postFormDeliveryDriverAction={postFormDeliveryDriverAction}/>
            </div>
          </section>
          
          {/* قسم الفوائد */}
          <section className="mb-8 bg-[#FFFFFF] p-6 md:p-12">
            <div className="container mx-auto px-4 md:px-12">
              <h2 className="text-center font-['Readex_Pro'] text-4xl md:text-[39px] font-semibold text-gray-800 mb-12">
                فوائد الانضمام كعامل توصيل في شلة
              </h2>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* البطاقة الأولى */}
                <div className="bg-[#EDEDED] rounded-lg shadow-lg overflow-hidden w-full lg:w-1/2 max-w-[550px]">
                  <div className="relative w-full aspect-[550/300]">
                    <img
                      src="driver1.jpg"
                      alt="Delivery Agent on a bike"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-right">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">استمتع برسوم خدمة منخفضة</h3>
                    <p className="text-gray-600">
                      سوف تحصل على عائد طويل الأجل لطالما بقيت من المستثمرين معنا في شلة
                    </p>
                  </div>
                </div>

                {/* البطاقة الثانية */}
                <div className="bg-[#EDEDED] rounded-lg shadow-lg overflow-hidden w-full lg:w-1/2 max-w-[550px]">
                  <div className="relative w-full aspect-[550/300]">
                    <img
                      src="driver2.jpg"
                      alt="Delivery Agent handing over a package"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-right">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">متصل في أي وقت</h3>
                    <p className="text-gray-600">
                      التمتع بحرية العمل في الأوقات الملائمة لك كما سوف تتمكن من عملك ومسؤولياتك الأخرى
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </main>
    );
}