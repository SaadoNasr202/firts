"use server";

import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_cart, TB_cartItems, TB_products, TB_stores } from "@/lib/schema";
import { eq, sum } from "drizzle-orm";
import { cookies } from "next/headers";

// جلب عدد عناصر السلة
export async function getCartCountAction(): Promise<{
	count: number;
	error?: string;
}> {
	try {
		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return { count: 0 };
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return { count: 0 };
		}

		// البحث عن السلة
		const cart = await db
			.select()
			.from(TB_cart)
			.where(eq(TB_cart.userId, user.id))
			.limit(1);

		if (cart.length === 0) {
			return { count: 0 };
		}

		// حساب عدد العناصر في السلة
		const result = await db
			.select({ 
				totalCount: sum(TB_cartItems.quantity) 
			})
			.from(TB_cartItems)
			.where(eq(TB_cartItems.cartId, cart[0].id));

		const count = result[0]?.totalCount ? parseInt(result[0].totalCount.toString()) : 0;

		return { count };

	} catch (error) {
		console.error("خطأ في حساب عناصر السلة:", error);
		return { 
			count: 0,
			error: "فشل في حساب عناصر السلة"
		};
	}
}

// إضافة منتج للسلة
export async function addToCartAction({
	productId,
	storeId,
	quantity = 1,
}: {
	productId: string;
	storeId: string;
	quantity?: number;
}): Promise<{
	success?: boolean;
	message?: string;
	error?: string;
	requiresClearCart?: boolean;
}> {
	try {
		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return {
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return {
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		// البحث عن السلة
		let cart = await db
			.select()
			.from(TB_cart)
			.where(eq(TB_cart.userId, user.id))
			.limit(1);

		// إنشاء سلة جديدة إذا لم توجد
		if (cart.length === 0) {
			const cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			await db.insert(TB_cart).values({
				id: cartId,
				userId: user.id,
			});
			cart = await db
				.select()
				.from(TB_cart)
				.where(eq(TB_cart.userId, user.id))
				.limit(1);
		}

		// التحقق من وجود منتج من متجر آخر في السلة
		const existingItems = await db
			.select()
			.from(TB_cartItems)
			.where(eq(TB_cartItems.cartId, cart[0].id));

		if (existingItems.length > 0) {
			const firstItem = existingItems[0];
			if (firstItem.storeId !== storeId) {
				return {
					error: "لا يمكن إضافة منتجات من متاجر مختلفة في نفس السلة",
					requiresClearCart: true,
				};
			}
		}

		// التحقق من وجود المنتج في السلة
		const existingItem = await db
			.select()
			.from(TB_cartItems)
			.where(
				eq(TB_cartItems.cartId, cart[0].id) &&
				eq(TB_cartItems.productId, productId)
			)
			.limit(1);

		if (existingItem.length > 0) {
			// تحديث الكمية
			await db
				.update(TB_cartItems)
				.set({ quantity: existingItem[0].quantity + quantity })
				.where(eq(TB_cartItems.id, existingItem[0].id));
		} else {
			// إضافة منتج جديد
			const itemId = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			await db.insert(TB_cartItems).values({
				id: itemId,
				cartId: cart[0].id,
				productId,
				storeId,
				quantity,
			});
		}

		return {
			success: true,
			message: "تم إضافة المنتج للسلة بنجاح",
		};

	} catch (error) {
		console.error("خطأ في إضافة المنتج للسلة:", error);
		return {
			error: "فشل في إضافة المنتج للسلة",
		};
	}
}

// إفراغ السلة
export async function clearCartAction(): Promise<{
	success: boolean;
	message?: string;
	error?: string;
}> {
	try {
		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		// البحث عن السلة
		const cart = await db
			.select()
			.from(TB_cart)
			.where(eq(TB_cart.userId, user.id))
			.limit(1);

		if (cart.length === 0) {
			return {
				success: true,
				message: "السلة فارغة بالفعل",
			};
		}

		// حذف جميع عناصر السلة
		await db
			.delete(TB_cartItems)
			.where(eq(TB_cartItems.cartId, cart[0].id));

		return {
			success: true,
			message: "تم إفراغ السلة بنجاح",
		};

	} catch (error) {
		console.error("خطأ في إفراغ السلة:", error);
		return {
			success: false,
			error: "فشل في إفراغ السلة",
		};
	}
}

// جلب السلة
export async function getCartAction(): Promise<{
	id?: string;
	items: any[];
	totalAmount: number;
	itemsCount: number;
	error?: string;
}> {
	try {
		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return {
				items: [],
				totalAmount: 0,
				itemsCount: 0,
				error: "غير مسجل دخول",
			};
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return {
				items: [],
				totalAmount: 0,
				itemsCount: 0,
				error: "جلسة غير صالحة",
			};
		}

		// البحث عن السلة
		const cart = await db
			.select()
			.from(TB_cart)
			.where(eq(TB_cart.userId, user.id))
			.limit(1);

		if (cart.length === 0) {
			// إنشاء سلة جديدة إذا لم تكن موجودة
			const newCartId = `cart_${Date.now()}_${user.id}`;
			await db.insert(TB_cart).values({
				id: newCartId,
				userId: user.id,
			});

			return {
				id: newCartId,
				items: [],
				totalAmount: 0,
				itemsCount: 0,
			};
		}

		// جلب عناصر السلة مع تفاصيل المنتجات والمتاجر
		const cartItems = await db
			.select({
				id: TB_cartItems.id,
				productId: TB_cartItems.productId,
				productName: TB_products.name,
				productImage: TB_products.image,
				storeId: TB_cartItems.storeId,
				storeName: TB_stores.name,
				quantity: TB_cartItems.quantity,
				priceAtAdd: TB_cartItems.priceAtAdd,
			})
			.from(TB_cartItems)
			.leftJoin(TB_products, eq(TB_cartItems.productId, TB_products.id))
			.leftJoin(TB_stores, eq(TB_cartItems.storeId, TB_stores.id))
			.where(eq(TB_cartItems.cartId, cart[0].id));

		// حساب الإجمالي
		const items = cartItems.map(item => ({
			...item,
			totalPrice: parseFloat(item.priceAtAdd || "0") * item.quantity,
		}));

		const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
		const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

		return {
			id: cart[0].id,
			items,
			totalAmount,
			itemsCount,
		};

	} catch (error) {
		console.error("خطأ في جلب السلة:", error);
		return {
			items: [],
			totalAmount: 0,
			itemsCount: 0,
			error: "خطأ في الخادم",
		};
	}
}

// تحديث كمية عنصر في السلة
export async function updateCartItemAction({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}): Promise<{
	success: boolean;
	message?: string;
	error?: string;
}> {
	try {
		if (!itemId || quantity < 1) {
			return {
				success: false,
				error: "معرف العنصر والكمية مطلوبان",
			};
		}

		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		// تحديث الكمية
		await db
			.update(TB_cartItems)
			.set({ quantity })
			.where(eq(TB_cartItems.id, itemId));

		return {
			success: true,
			message: "تم تحديث الكمية بنجاح",
		};

	} catch (error) {
		console.error("خطأ في تحديث كمية العنصر:", error);
		return {
			success: false,
			error: "فشل في تحديث الكمية",
		};
	}
}

// إزالة عنصر من السلة
export async function removeCartItemAction(itemId: string): Promise<{
	success: boolean;
	message?: string;
	error?: string;
}> {
	try {
		if (!itemId) {
			return {
				success: false,
				error: "معرف العنصر مطلوب",
			};
		}

		// التحقق من تسجيل الدخول
		const sessionCookie = cookies().get(lucia.sessionCookieName);
		if (!sessionCookie) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		const { user } = await lucia.validateSession(sessionCookie.value);
		if (!user) {
			return {
				success: false,
				error: "يجب تسجيل الدخول أولاً",
			};
		}

		// حذف العنصر
		await db
			.delete(TB_cartItems)
			.where(eq(TB_cartItems.id, itemId));

		return {
			success: true,
			message: "تم إزالة العنصر بنجاح",
		};

	} catch (error) {
		console.error("خطأ في إزالة العنصر:", error);
		return {
			success: false,
			error: "فشل في إزالة العنصر",
		};
	}
}
