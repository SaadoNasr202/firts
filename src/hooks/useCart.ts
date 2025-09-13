'use client';

import { useState } from 'react';

interface AddToCartParams {
	productId: string;
	storeId: string;
	quantity?: number;
}

interface AddToCartResponse {
	success?: boolean;
	message?: string;
	error?: string;
	requiresClearCart?: boolean;
}

export function useCart() {
	const [isLoading, setIsLoading] = useState(false);

	const addToCart = async ({ productId, storeId, quantity = 1 }: AddToCartParams): Promise<AddToCartResponse> => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/cart/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					productId,
					storeId,
					quantity,
				}),
			});

			const data = await response.json();
			
			if (!response.ok) {
				return {
					error: data.error || 'حدث خطأ أثناء إضافة المنتج للسلة',
					requiresClearCart: data.requiresClearCart || false,
				};
			}

			return {
				success: true,
				message: data.message || 'تم إضافة المنتج للسلة بنجاح',
			};
		} catch (error) {
			console.error('خطأ في إضافة المنتج للسلة:', error);
			return {
				error: 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
			};
		} finally {
			setIsLoading(false);
		}
	};

	const clearCart = async (): Promise<boolean> => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/cart/clear', {
				method: 'POST',
			});

			if (response.ok) {
				return true;
			}
			return false;
		} catch (error) {
			console.error('خطأ في إفراغ السلة:', error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		addToCart,
		clearCart,
		isLoading,
	};
}
