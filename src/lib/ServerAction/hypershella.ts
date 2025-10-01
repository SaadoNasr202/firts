"use server";

import { db } from "@/lib/db";
import { TB_hyper_shella_categories, TB_products, TB_stores } from "@/lib/schema";
import { HyperShellaCategoriesResult } from "../types/api";
import { eq, and } from "drizzle-orm";



// ✅ Server Action بيرجع Promise<HyperShellaCategoriesResult>
export async function getHyperShellaCategories(): Promise<HyperShellaCategoriesResult> {
  try {
    const categories = await db
      .select({
        id: TB_hyper_shella_categories.id,
        name: TB_hyper_shella_categories.name,
        image: TB_hyper_shella_categories.image,
      })
      .from(TB_hyper_shella_categories)
      .orderBy(TB_hyper_shella_categories.createdAt);

    if (categories.length === 0) {
      return {
        categories: [],
        success: true,
        isDefault: true,
        message: "لا توجد أقسام متاحة حالياً",
      };
    }

    return {
      categories,
      success: true,
      isDefault: false,
    };
  } catch (error) {
    console.error("خطأ في جلب أقسام هايبر شلة:", error);
    return {
      categories: [],
      success: false,
      error: "فشل في جلب أقسام هايبر شلة",
    };
  }
}
