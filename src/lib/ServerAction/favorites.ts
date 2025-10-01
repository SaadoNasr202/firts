"use server";

import { db } from "@/lib/db";
import { TB_favouriteStores, TB_favouriteusers, TB_products, TB_stores } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getUser } from "@/lib/auth";

// إضافة متجر للمفضلة
export async function addStoreToFavoritesAction(storeId: string): Promise<{
	success: boolean;
	message?: string;
	favoriteId?: string;
	error?: string;
}> {
	try {
		if (!storeId) {
			return {
				success: false,
				error: "معرف المتجر مطلوب",
			};
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const userId = user.id;

		// التحقق من وجود المتجر في المفضلة مسبقاً
		const existingFavorite = await db
			.select()
			.from(TB_favouriteStores)
			.where(
				and(
					eq(TB_favouriteStores.userId, userId),
					eq(TB_favouriteStores.storeId, storeId)
				)
			)
			.limit(1);

		if (existingFavorite.length > 0) {
			return {
				success: false,
				error: "المتجر موجود في المفضلة بالفعل",
			};
		}

		// إضافة المتجر للمفضلة
		const favoriteId = `fav_store_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		
		await db.insert(TB_favouriteStores).values({
			id: favoriteId,
			userId,
			storeId,
		});

		return {
			success: true,
			message: "تم إضافة المتجر للمفضلة بنجاح",
			favoriteId,
		};

	} catch (error) {
		console.error("خطأ في إضافة المتجر للمفضلة:", error);
		return {
			success: false,
			error: "فشل في إضافة المتجر للمفضلة",
		};
	}
}

// إزالة متجر من المفضلة
export async function removeStoreFromFavoritesAction(storeId: string): Promise<{
	success: boolean;
	message?: string;
	error?: string;
}> {
	try {
		if (!storeId) {
			return {
				success: false,
				error: "معرف المتجر مطلوب",
			};
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const userId = user.id;

		// البحث عن المفضلة وحذفها
		await db
			.delete(TB_favouriteStores)
			.where(
				and(
					eq(TB_favouriteStores.userId, userId),
					eq(TB_favouriteStores.storeId, storeId)
				)
			);

		return {
			success: true,
			message: "تم إزالة المتجر من المفضلة بنجاح",
		};

	} catch (error) {
		console.error("خطأ في إزالة المتجر من المفضلة:", error);
		return {
			success: false,
			error: "فشل في إزالة المتجر من المفضلة",
		};
	}
}

// التحقق من حالة المفضلة
export async function checkStoreFavoriteAction(storeId: string): Promise<{
	isFavorite: boolean;
	favoriteId?: string | null;
	error?: string;
}> {
	try {
		if (!storeId) {
			return {
				isFavorite: false,
				error: "معرف المتجر مطلوب",
			};
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return {
				isFavorite: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const userId = user.id;

		// البحث عن المفضلة
		const favorite = await db
			.select()
			.from(TB_favouriteStores)
			.where(
				and(
					eq(TB_favouriteStores.userId, userId),
					eq(TB_favouriteStores.storeId, storeId)
				)
			)
			.limit(1);

		return {
			isFavorite: favorite.length > 0,
			favoriteId: favorite.length > 0 ? favorite[0].id : null,
		};

	} catch (error) {
		console.error("خطأ في التحقق من حالة المفضلة:", error);
		return {
			isFavorite: false,
			error: "فشل في التحقق من حالة المفضلة",
		};
	}
}

// جلب جميع المفضلة (منتجات ومتاجر)
export async function getAllFavoritesAction(): Promise<{
	favProducts: any[];
	favStores: any[];
	error?: string;
}> {
	try {
		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return {
				favProducts: [],
				favStores: [],
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const userId = user.id;

		// المنتجات المفضلة مع تفاصيلها ومعلومات المتجر
		const favProducts = await db
			.select({
				id: TB_products.id,
				name: TB_products.name,
				image: TB_products.image,
				price: TB_products.price,
				originalPrice: TB_products.originalPrice,
				unit: TB_products.unit,
				storeId: TB_products.storeId,
				storeName: TB_stores.name,
			})
			.from(TB_favouriteusers)
			.innerJoin(TB_products, eq(TB_favouriteusers.productId, TB_products.id))
			.innerJoin(TB_stores, eq(TB_products.storeId, TB_stores.id))
			.where(eq(TB_favouriteusers.userId, userId));

		// المتاجر المفضلة مع تفاصيلها
		const favStores = await db
			.select({
				id: TB_stores.id,
				name: TB_stores.name,
				type: TB_stores.type,
				rating: TB_stores.rating,
				image: TB_stores.image,
			})
			.from(TB_favouriteStores)
			.innerJoin(TB_stores, eq(TB_favouriteStores.storeId, TB_stores.id))
			.where(eq(TB_favouriteStores.userId, userId));

		return { favProducts, favStores };

	} catch (error) {
		console.error("خطأ في جلب المفضلة:", error);
		return {
			favProducts: [],
			favStores: [],
			error: "فشل في جلب المفضلة",
		};
	}
}

// إضافة منتج للمفضلة
export async function addProductToFavoritesAction(productId: string): Promise<{
	success: boolean;
	message?: string;
	favoriteId?: string;
	error?: string;
}> {
	try {
		if (!productId) {
			return {
				success: false,
				error: "معرف المنتج مطلوب",
			};
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const userId = user.id;

		// التحقق من وجود المنتج في المفضلة مسبقاً
		const existingFavorite = await db
			.select()
			.from(TB_favouriteusers)
			.where(
				and(
					eq(TB_favouriteusers.userId, userId),
					eq(TB_favouriteusers.productId, productId)
				)
			)
			.limit(1);

		if (existingFavorite.length > 0) {
			return {
				success: false,
				error: "المنتج موجود في المفضلة بالفعل",
			};
		}

		// إضافة المنتج للمفضلة
		const favoriteId = `fav_product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		
		await db.insert(TB_favouriteusers).values({
			id: favoriteId,
			userId,
			productId,
		});

		return {
			success: true,
			message: "تم إضافة المنتج للمفضلة بنجاح",
			favoriteId,
		};

	} catch (error) {
		console.error("خطأ في إضافة المنتج للمفضلة:", error);
		return {
			success: false,
			error: "فشل في إضافة المنتج للمفضلة",
		};
	}
}

// إزالة منتج من المفضلة
export async function removeProductFromFavoritesAction(productId: string): Promise<{
	success: boolean;
	message?: string;
	error?: string;
}> {
	try {
		if (!productId) {
			return {
				success: false,
				error: "معرف المنتج مطلوب",
			};
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const userId = user.id;

		// البحث عن المفضلة وحذفها
		await db
			.delete(TB_favouriteusers)
			.where(
				and(
					eq(TB_favouriteusers.userId, userId),
					eq(TB_favouriteusers.productId, productId)
				)
			);

		return {
			success: true,
			message: "تم إزالة المنتج من المفضلة بنجاح",
		};

	} catch (error) {
		console.error("خطأ في إزالة المنتج من المفضلة:", error);
		return {
			success: false,
			error: "فشل في إزالة المنتج من المفضلة",
		};
	}
}

// التحقق من حالة المفضلة للمنتج
export async function checkProductFavoriteAction(productId: string): Promise<{
	isFavorite: boolean;
	favoriteId?: string | null;
	error?: string;
}> {
	try {
		if (!productId) {
			return {
				isFavorite: false,
				error: "معرف المنتج مطلوب",
			};
		}

		// الحصول على المستخدم الحالي من الجلسة
		const user = await getUser();
		if (!user) {
			return {
				isFavorite: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const userId = user.id;

		// البحث عن المفضلة
		const favorite = await db
			.select()
			.from(TB_favouriteusers)
			.where(
				and(
					eq(TB_favouriteusers.userId, userId),
					eq(TB_favouriteusers.productId, productId)
				)
			)
			.limit(1);

		return {
			isFavorite: favorite.length > 0,
			favoriteId: favorite.length > 0 ? favorite[0].id : null,
		};

	} catch (error) {
		console.error("خطأ في التحقق من حالة المفضلة:", error);
		return {
			isFavorite: false,
			error: "فشل في التحقق من حالة المفضلة",
		};
	}
}
