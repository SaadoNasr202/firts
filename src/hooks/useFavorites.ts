import { useState, useEffect } from 'react';
import { FavoriteState, UseFavoritesReturn } from "@/lib/api";
import { 
  addStoreToFavoritesAction, 
  removeStoreFromFavoritesAction, 
  checkStoreFavoriteAction,
  addProductToFavoritesAction,
  removeProductFromFavoritesAction,
  checkProductFavoriteAction
} from '@/lib/ServerAction/favorites';

// interfaces imported from src/lib/api

// Hook للمنتجات المفضلة
export function useProductFavorites(productId: string): UseFavoritesReturn {
  const [state, setState] = useState<FavoriteState>({
    isFavorite: false,
    isLoading: false
  });

  const checkFavoriteStatus = async () => {
    if (!productId) return;
    
    try {
      const result = await checkProductFavoriteAction(productId);
      
      if (result.error) {
        if (result.error.includes("تسجيل الدخول")) {
          // المستخدم غير مسجل دخول
          setState(prev => ({ ...prev, isFavorite: false }));
        } else {
          console.error('فشل في التحقق من حالة المفضلة:', result.error);
        }
      } else {
        setState(prev => ({ ...prev, isFavorite: result.isFavorite }));
      }
    } catch (error) {
      console.error('خطأ في التحقق من حالة المفضلة:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!productId) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      let result;
      if (state.isFavorite) {
        result = await removeProductFromFavoritesAction(productId);
      } else {
        result = await addProductToFavoritesAction(productId);
      }

      if (result.success) {
        setState(prev => ({ 
          ...prev, 
          isFavorite: !prev.isFavorite,
          isLoading: false 
        }));
      } else if (result.error?.includes("تسجيل الدخول")) {
        alert('يجب تسجيل الدخول أولاً لإضافة المنتج للمفضلة');
        setState(prev => ({ ...prev, isLoading: false }));
      } else {
        console.error('خطأ في تحديث المفضلة:', result.error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('خطأ في تحديث المفضلة:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [productId]);

  return {
    isFavorite: state.isFavorite,
    isLoading: state.isLoading,
    toggleFavorite,
    checkFavoriteStatus
  };
}

// Hook للمتاجر المفضلة
export function useStoreFavorites(storeId: string): UseFavoritesReturn {
  const [state, setState] = useState<FavoriteState>({
    isFavorite: false,
    isLoading: false
  });

  const checkFavoriteStatus = async () => {
    if (!storeId) return;
    
    try {
      const result = await checkStoreFavoriteAction(storeId);
      
      if (result.error) {
        if (result.error.includes("تسجيل الدخول")) {
          // المستخدم غير مسجل دخول
          setState(prev => ({ ...prev, isFavorite: false }));
        } else {
          console.error('فشل في التحقق من حالة المفضلة:', result.error);
        }
      } else {
        setState(prev => ({ ...prev, isFavorite: result.isFavorite }));
      }
    } catch (error) {
      console.error('خطأ في التحقق من حالة المفضلة:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!storeId) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      let result;
      if (state.isFavorite) {
        result = await removeStoreFromFavoritesAction(storeId);
      } else {
        result = await addStoreToFavoritesAction(storeId);
      }

      if (result.success) {
        setState(prev => ({ 
          ...prev, 
          isFavorite: !prev.isFavorite,
          isLoading: false 
        }));
      } else if (result.error?.includes("تسجيل الدخول")) {
        alert('يجب تسجيل الدخول أولاً لإضافة المتجر للمفضلة');
        setState(prev => ({ ...prev, isLoading: false }));
      } else {
        console.error('خطأ في تحديث المفضلة:', result.error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('خطأ في تحديث المفضلة:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [storeId]);

  return {
    isFavorite: state.isFavorite,
    isLoading: state.isLoading,
    toggleFavorite,
    checkFavoriteStatus
  };
}
