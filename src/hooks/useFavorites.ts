import { useState, useEffect } from 'react';

interface FavoriteState {
  isFavorite: boolean;
  isLoading: boolean;
}

interface UseFavoritesReturn {
  isFavorite: boolean;
  isLoading: boolean;
  toggleFavorite: () => Promise<void>;
  checkFavoriteStatus: () => Promise<void>;
}

// Hook للمنتجات المفضلة
export function useProductFavorites(productId: string): UseFavoritesReturn {
  const [state, setState] = useState<FavoriteState>({
    isFavorite: false,
    isLoading: false
  });

  const checkFavoriteStatus = async () => {
    if (!productId) return;
    
    try {
      const response = await fetch(
        `/api/favorites/products?productId=${encodeURIComponent(productId)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setState(prev => ({ ...prev, isFavorite: data.isFavorite }));
      } else if (response.status === 401) {
        // المستخدم غير مسجل دخول
        setState(prev => ({ ...prev, isFavorite: false }));
      } else {
        console.error('فشل في التحقق من حالة المفضلة:', response.status);
      }
    } catch (error) {
      console.error('خطأ في التحقق من حالة المفضلة:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!productId) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const method = state.isFavorite ? 'DELETE' : 'POST';
      const response = await fetch('/api/favorites/products', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        setState(prev => ({ 
          ...prev, 
          isFavorite: !prev.isFavorite,
          isLoading: false 
        }));
      } else if (response.status === 401) {
        alert('يجب تسجيل الدخول أولاً لإضافة المنتج للمفضلة');
        setState(prev => ({ ...prev, isLoading: false }));
      } else {
        const errorData = await response.json();
        console.error('خطأ في تحديث المفضلة:', errorData.error);
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
      const response = await fetch(
        `/api/favorites/stores?storeId=${encodeURIComponent(storeId)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setState(prev => ({ ...prev, isFavorite: data.isFavorite }));
      } else if (response.status === 401) {
        // المستخدم غير مسجل دخول
        setState(prev => ({ ...prev, isFavorite: false }));
      } else {
        console.error('فشل في التحقق من حالة المفضلة:', response.status);
      }
    } catch (error) {
      console.error('خطأ في التحقق من حالة المفضلة:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!storeId) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const method = state.isFavorite ? 'DELETE' : 'POST';
      const response = await fetch('/api/favorites/stores', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId }),
      });

      if (response.ok) {
        setState(prev => ({ 
          ...prev, 
          isFavorite: !prev.isFavorite,
          isLoading: false 
        }));
      } else if (response.status === 401) {
        alert('يجب تسجيل الدخول أولاً لإضافة المتجر للمفضلة');
        setState(prev => ({ ...prev, isLoading: false }));
      } else {
        const errorData = await response.json();
        console.error('خطأ في تحديث المفضلة:', errorData.error);
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
