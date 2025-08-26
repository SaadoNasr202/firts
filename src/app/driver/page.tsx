import DeliveryAgentForm from "@/components/driverregister";
import Shellafooter from "@/components/shellafooter";
import Navbar from "@/components/navbar";
export default function driver() {
  return (
    
    <div
      className={`font-tajawal w-full bg-[#F0F2F5] text-gray-800`}
      dir=""
    >
         <Navbar />
      <main>
        <div className="mx-auto max-w-[1292px] px-4 py-8 sm:px-6 lg:px-8">
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
              <DeliveryAgentForm />
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
      
      <Shellafooter />

    </div>
  );
}

// ... بقية المكونات Tile
/* ------------ Components ------------ */
function Tile({
    title,
    desc,
    href,
    variant,
    Icon,
}: {
    title: string;
    desc: string;
    href: string;
    variant?: "alt" | "default";
    Icon?: React.ComponentType<any>;
}) {
    const isAlt = variant === "alt";
    return (
        <article
            className={`rounded-xl p-6 shadow-md transition-transform duration-300 hover:scale-[1.02] ${isAlt ? "bg-white" : "bg-gray-100"}`}
        >
            <div className="grid grid-cols-[auto_1fr] items-start gap-6">
                {/* الشريط العمودي المتدرّج */}
                <div className={`relative h-[168px] w-12 rounded-lg bg-emerald-500`}>
                    {Icon && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2">
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                    )}
                </div>

                <div className="text-right">
                    <h4 className="mb-2 text-xl font-medium text-gray-800">{title}</h4>
                    <p className="mb-4 text-sm text-gray-600">{desc}</p>
                    <a href={href} className="inline-flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-amber-500" />
                        <span className="text-sm font-semibold text-amber-600">
                            سجّل الآن
                        </span>
                    </a>
                </div>
            </div>
        </article>
    );
}