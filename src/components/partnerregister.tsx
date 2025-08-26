"use client";

import React, { useState } from "react";

const StoreForm: React.FC = () => {
    const [formData, setFormData] = useState<{
        storeName: string;
        storeClassification: string;
        whatYourStoreOffers: string;
        city: string;
        branchCount: string;
        phoneNumber: string;
        englishStoreName: string;
        personalIdNumber: string;
        detailedAddress: string;
        agreed: boolean;
    }>({
        storeName: "",
        storeClassification: "",
        whatYourStoreOffers: "",
        city: "",
        branchCount: "",
        phoneNumber: "",
        englishStoreName: "",
        personalIdNumber: "",
        detailedAddress: "",
        agreed: false,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // يمكنك إضافة منطق إرسال البيانات إلى الخادم هنا
    };

    const handleReset = () => {
        setFormData({
            storeName: "",
            storeClassification: "",
            whatYourStoreOffers: "",
            city: "",
            branchCount: "",
            phoneNumber: "",
            englishStoreName: "",
            personalIdNumber: "",
            detailedAddress: "",
            agreed: false,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h2 className="mb-8 text-right text-2xl font-bold text-green-600">
                معلومات المتجر
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                {/* Store Classification */}
                <div className="flex flex-col">
                    <label
                        htmlFor="storeClassification"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        تصنيف المتجر
                    </label>
                    <input
                        type="text"
                        id="storeClassification"
                        name="storeClassification"
                        placeholder="سوبر ماركت"
                        value={formData.storeClassification}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Store Name */}
                <div className="flex flex-col">
                    <label
                        htmlFor="storeName"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        اسم المتجر
                    </label>
                    <input
                        type="text"
                        id="storeName"
                        name="storeName"
                        placeholder="أدخل اسم متجرك"
                        value={formData.storeName}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                    />
                </div>

                {/* City */}
                <div className="flex flex-col">
                    <label
                        htmlFor="city"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        المدينة
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="السعودية"
                        value={formData.city}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                    />
                </div>

                {/* What your store offers */}
                <div className="flex flex-col">
                    <label
                        htmlFor="whatYourStoreOffers"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        ماذا يقدمه متجرك؟
                    </label>
                    <input
                        type="text"
                        id="whatYourStoreOffers"
                        name="whatYourStoreOffers"
                        placeholder="ماهي الخدمات التي تقدمها في حال لم تجد تصنيف للمتجر"
                        value={formData.whatYourStoreOffers}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                    <label
                        htmlFor="phoneNumber"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        رقم الهاتف
                    </label>
                    <div className="relative flex w-full">
                        <span className="absolute top-0 right-0 h-full rounded-r-lg border-y border-r border-gray-300 bg-gray-50 p-3 text-gray-500">
                            +966
                        </span>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder=""
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 p-3 pl-16 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Branch Count */}
                <div className="flex flex-col">
                    <label
                        htmlFor="branchCount"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        عدد فروع متجرك
                    </label>
                    <input
                        type="text"
                        id="branchCount"
                        name="branchCount"
                        placeholder="3"
                        value={formData.branchCount}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                    />
                </div>
                
                {/* Personal ID Number */}
                <div className="flex flex-col">
                    <label
                        htmlFor="personalIdNumber"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        رقم الهوية الشخصية
                    </label>
                    <input
                        type="text"
                        id="personalIdNumber"
                        name="personalIdNumber"
                        placeholder="EX: XXXXX-XXXXXXX-X"
                        value={formData.personalIdNumber}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                    />
                </div>

                {/* English Store Name */}
                <div className="flex flex-col">
                    <label
                        htmlFor="englishStoreName"
                        className="mb-2 text-right font-semibold text-gray-700"
                    >
                        اسم المتجر بالإنجليزية
                    </label>
                    <input
                        type="text"
                        id="englishStoreName"
                        name="englishStoreName"
                        placeholder="moon market"
                        value={formData.englishStoreName}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        required
                    />
                </div>
            </div>

            {/* Detailed Address */}
            <div className="mt-6 flex flex-col">
                <label
                    htmlFor="detailedAddress"
                    className="mb-2 text-right font-semibold text-gray-700"
                >
                    العنوان التفصيلي
                </label>
                <textarea
                    id="detailedAddress"
                    name="detailedAddress"
                    rows={3}
                    placeholder="جدة، شارع 500 تفرع 2"
                    value={formData.detailedAddress}
                    onChange={handleChange as any}
                    className="rounded-lg border border-gray-300 p-3 text-right focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    required
                ></textarea>
            </div>

            <div className="mt-8 flex items-center justify-end space-x-2 space-x-reverse">
                <label htmlFor="agreed" className="text-sm text-gray-600">
                    الموافقة على جميع{" "}
                    <a href="#" className="font-medium text-green-600 hover:underline">
                        الشروط والأحكام
                    </a>
                </label>
                <input
                    type="checkbox"
                    id="agreed"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 rounded-md border-gray-300 text-green-500 focus:ring-green-400"
                    required
                />
            </div>

            <div className="mt-8 flex flex-col-reverse justify-start gap-4 sm:flex-row">
                <button
                    type="submit"
                    className="w-full rounded-lg bg-green-500 px-10 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none sm:w-auto"
                >
                    إرسال
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 font-semibold text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-none sm:w-auto"
                >
                    إعادة ضبط
                </button>
            </div>
        </form>
    );
};

export default StoreForm;
