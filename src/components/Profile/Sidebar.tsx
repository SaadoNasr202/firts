// src/components/Sidebar.tsx
"use client";

// قائمة العناصر
const sidebarItems: string[] = [
	"معلومات الحساب",
	"العناوين المحفوظة",
	"المفضلة لديك",
	"إحصائياتي",
	"محفظتي",
	"محفظة قيدها",
	"نقاطي",
	"قسائمي",
	"سياسة الاسترداد",
	"سياسة الخصوصية",
	"الشروط قيدها",
	"الشروط والأحكام",
	"المساعدة والدعم",
	"تسجيل الخروج",
];

// السايد بار يستقبل وظائف من المكون الرئيسي عبر props
interface SidebarProps {
	activePage: string; // لمعرفة أي زر نشط
	setActivePage: (page: string) => void; // وظيفة لتغيير الصفحة
	onLogout?: () => void; // وظيفة تسجيل الخروج
}

export default function Sidebar({ activePage, setActivePage, onLogout }: SidebarProps) {
	const handleItemClick = (item: string) => {
		if (item === "تسجيل الخروج") {
			if (onLogout) {
				onLogout();
			}
		} else {
			setActivePage(item);
		}
	};
	return (
		<nav>
			<ul className="space-y-5">
				{sidebarItems.map((item, index) => (
					<li
						key={index}
						onClick={() => handleItemClick(item)}
						className={`cursor-pointer rounded-lg p-3 text-right transition-colors ${
							activePage === item && item !== "تسجيل الخروج"
								? "border-r-4 border-green-700 bg-green-100 font-semibold text-green-700"
								: "text-gray-600 hover:bg-gray-200"
						} ${
							item === "تسجيل الخروج" ? "text-red-500 hover:bg-red-100" : ""
						}`}
					>
						{item}
					</li>
				))}
			</ul>
		</nav>
	);
}
