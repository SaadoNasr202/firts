// src/components/ContractTemplate.tsx

// تعريف أنواع البيانات التي سيستقبلها المكون
interface ContractData {
	firstName: string;
	lastName: string;
	fatherName: string;
	family: string;
	birthDate: string;
	idNumber: string;
	phoneNumber: string;
	email: string;
	address: string;
	investmentAmount: string;
}

interface ContractTemplateProps {
	data: ContractData;
}

export default function ContractTemplate({ data }: ContractTemplateProps) {
	if (!data) {
		return null;
	}

	const investmentAmountInWords = (amount: string) => {
		// يمكنك هنا إضافة دالة لتحويل المبلغ من أرقام إلى حروف
		// كمثال بسيط:
		return "المبلغ بالحروف";
	};

	return (
		<div className="contract-container p-8 text-right font-['Readex_Pro'] leading-relaxed text-gray-800">
			<div className="mb-6 flex justify-center">
				<img
					src="https://placehold.co/200x80/31A342/FFFFFF?text=Shallah+Logo"
					alt="Shallah Logo"
					className="h-24 w-auto"
				/>
			</div>
			
			<h1 className="mb-4 text-center text-3xl font-bold">
				عقد اتفاقية استثمار شلة التجارية
			</h1>

			<p className="mb-8 text-center text-gray-600">
				(موثقة عبر المنصات المعتمدة)
			</p>

			<p className="mb-4">
				تحرر في تاريخ: {new Date().toLocaleDateString("ar-SA")} ميلادي بالمملكة
				العربية السعودية بين كل من:
			</p>

			{/* الطرف الأول */}
			<h2 className="mb-2 text-xl font-bold">الطرف الأول</h2>
			<p className="mb-6 text-gray-700">
				شركة شلة التجارية، وهي شركة نوع الشركة مسجلة في بلد التسجيل رقم السجل
				التجاري [رقم السجل التجاري]. يمثلها في هذا العقد اسم الممثل القانوني،
				بصفته صفة الممثل القانوني، وعنوانها [عنوان الشركة]، ويشار إليها فيما يلي
				بـ "الشركة".
			</p>

			{/* الطرف الثاني - المستثمر */}
			<h2 className="mb-2 text-xl font-bold">الطرف الثاني</h2>
			<p className="mb-2 text-gray-700">
				ويشار إليه فيما يلي بـ "المستثمر"،{" "}
				<span className="font-semibold">
					{data.firstName} {data.fatherName} {data.lastName} {data.family}
				</span>
				سعودي الجنسية بموجب الهوية الوطنية رقم{" "}
				<span className="font-semibold">{data.idNumber}</span>
			</p>
			<p className="mb-2 text-gray-700">
				عنوانه <span className="font-semibold">{data.address}</span>
			</p>
			<p className="mb-2 text-gray-700">
				رقم الجوال <span className="font-semibold">{data.phoneNumber}</span>
			</p>
			<p className="mb-6 text-gray-700">
				البريد الإلكتروني <span className="font-semibold">{data.email}</span>
			</p>

			{/* المادة الثانية: موضوع العقد (وصف الاستثمار) */}
			<h2 className="mb-2 text-xl font-bold">
				المادة الثانية: موضوع العقد (وصف الاستثمار)
			</h2>
			<p className="mb-6 text-gray-700">
				بموجب هذه الاتفاقية، يستثمر المستثمر مبلغاً مالياً محدداً لدى الشركة،
				والتي تقوم بتشغيل هذا المبلغ في نموذج عمل يعتمد على إنشاء وإدارة متجر
				الكتروني لبيع المواد الغذائية والاستهلاعية. تتولى الشركة بموجب خبراتها
				وفريق عملها كافة العمليات التشغيلية المتعلقة بالمتجر الإلكتروني، بما في
				ذلك على سبيل المثال لا الحصر: التعاقد مع الموردين، إدارة المخزون
				والتخزين، التسويق الرقمي والترويج، إدارة عمليات البيع ومعالجة الطلبات،
				التوصيل والخدمات اللوجستية، وتحصيل المبيعات، وذلك بهدف تحقيق العائد
				الاستثماري المتفق عليه للمستثمر.
			</p>

			{/* المادة الرابعة: مبلغ الاستثمار */}
			<h2 className="mb-2 text-xl font-bold">
				المادة الرابعة: مبلغ ومدة الاستثمار والتفاصيل المالية
			</h2>
			<p className="mb-2 text-gray-700">
				يحدد مبلغ الاستثمار لهذه الاتفاقية بـ:{" "}
				<span className="font-semibold">
					{data.investmentAmount} ريال سعودي (
					{investmentAmountInWords(data.investmentAmount)})
				</span>
			</p>

			<p className="mt-12 text-center text-xl font-bold text-gray-800">
				الطرف الأول (الشركة) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; الطرف الثاني
				(المستثمر)
			</p>
			<div className="mt-12 flex items-end justify-between">
				<div className="w-1/2 text-center">
					<p>الاسم: شركة شله التجارية</p>
					<p className="mt-8">التوقيع:</p>
					<p className="mt-4">
						التاريخ: {new Date().toLocaleDateString("ar-SA")}
					</p>
				</div>
				<div className="w-1/2 text-center">
					<p>
						الاسم: {data.firstName} {data.lastName} {data.fatherName}{" "}
						{data.family}
					</p>
					<p className="mt-8">التوقيع:</p>
					<p className="mt-4">
						التاريخ: {new Date().toLocaleDateString("ar-SA")}
					</p>
				</div>
			</div>
		</div>
	);
}
