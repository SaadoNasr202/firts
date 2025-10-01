export interface Category {
	id: string;
	name: string;
	description?: string;
	image?: string;
}

export interface NearbyStore {
	id: string;
	name: string;
	type: string | null;
	rating: number | null;
	image: string | null;
	location: string | null;
	logo: string | null;
	hasProducts: boolean;
	distance: number | null;
	storeLat: number | null;
	storeLng: number | null;
}

export interface StoreInfo {
	id: string;
	name: string;
	type: string | null;
	rating: number | null;
	image: string | null;
}

export type StoreCategoriesResult =
	| {
			categories: string[];
			storeCategories: StoreCategory[];
			storeExists: true;
			store: StoreInfo;
			cached: boolean;
			success: true;
	  }
	| {
			categories: string[];
			storeExists: false;
			cached: boolean;
			success: false;
	  }
	| { error: string; success: false };

export interface HyperShellaCategoriesResult {
	categories: { id: string; name: string; image: string | null }[];
	success: boolean;
	isDefault?: boolean;
	message?: string;
	error?: string;
}
// Search result
export interface SearchResult {
	id: string;
	name: string;
	type: "store" | "product";
	image: string | null;
	description?: string;
	rating?: number;
	price?: string;
	storeName?: string;
	hasProducts?: boolean;
	hasCategories?: boolean;
}

// Address and delivery address selector
export interface Address {
	id: string;
	address: string;
	createdAt: string;
	formattedAddress?: string;
	lat?: number;
	lng?: number;
}

export interface DeliveryAddressSelectorProps {
	onAddressChange?: (address: Address | null) => void;
}

export interface MapLocationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onLocationSelect: (
		lat: number,
		lng: number,
		formattedAddress: string,
	) => void;
	isLoaded: boolean;
}

// Products page types
export interface Product {
	id: string;
	name: string;
	image: string;
	price: string;
	originalPrice?: string;
	unit?: string;
	storeId?: string;
	storeName?: string;
}

export interface ProductsPageProps {
	categoryName?: string;
	storeName?: string;
	onProductClick?: (productId: string) => void;
	isFullPage?: boolean;
}

// Store page types
export interface StorePageProps {
	storeName?: string;
	category?: string;
	source?: string;
}
// Route page props
export interface StoreRoutePageProps {
	params: { storeName: string };
	searchParams: { category?: string; source?: string };
}

export interface StoreDetails {
	id: string;
	name: string;
	type: string;
	rating: string | null;
	image: string | null;
}

export interface StoreCategory {
	id: string;
	name: string;
	storecover: string | null;
	storelogo: string | null;
}

// Generic store item used in lists/sliders
export interface Store {
	id: string;
	name: string;
	image?: string | null;
	type?: string | null;
	rating?: number | string | null;
	location?: string | null;
	distance?: number;
	logo?: string | null;
	hasProducts?: boolean;
	hasCategories?: boolean;
}

// Popular/Nearby Stores components props
export interface PopularStoresSliderProps {
	onStoreClick?: (storeName: string) => void;
	selectedLocation?: any;
	isFullPage?: boolean;
	getNearbyStoresAction: (args: {
		lat: number;
		lng: number;
		limit?: number;
		maxDistance?: number;
	}) => Promise<any>;
}

export interface NearbyStoresPageProps {
	onStoreClick?: (storeName: string) => void;
	selectedLocation?: any;
	isFullPage?: boolean;
	getNearbyStoresAction: (args: {
		lat: number;
		lng: number;
		limit?: number;
		maxDistance?: number;
	}) => Promise<any>;
}

// Discounts
export interface Discount {
	id: string;
	title: string;
	description?: string;
	time: string;
	image: string;
}

export interface DiscountSliderProps {
	onDiscountClick?: (discountTitle: string) => void;
	isFullPage?: boolean;
	getDiscountsAction: () => Promise<
		{ discounts: Discount[]; success: boolean } | { error: string }
	>;
}

// Category stores page
export interface CategoryStoresPageProps {
	categoryName?: string;
	onStoreClick?: (storeName: string) => void;
	isFullPage?: boolean;
}

// UI component props
export interface FavoriteButtonProps {
	isFavorite: boolean;
	isLoading?: boolean;
	onToggle: () => void | Promise<void>;
	size?: "sm" | "md" | "lg";
	className?: string;
}

// Favorites hooks
export interface FavoriteState {
	isFavorite: boolean;
	isLoading: boolean;
}

export interface UseFavoritesReturn {
	isFavorite: boolean;
	isLoading: boolean;
	toggleFavorite: () => Promise<void>;
	checkFavoriteStatus: () => Promise<void>;
}

// Hyper Shella page
export interface HyperShellaStoreDetails {
	id: string;
	name: string;
	type: string;
	rating: string;
	image: string;
}

export interface HyperShellaPageProps {
	storeName?: string;
	onCategoryClick?: (categoryName: string) => void;
	isFullPage?: boolean;
	getHyperShellaCategories(): Promise<{
		success: boolean;
		categories?: Array<{ name: string }>;
	}>;
	getProductsAction(params?: {
		limit?: number;
		category?: string;
		exclude?: string;
	}): Promise<{ products: any[]; success: boolean; error?: string }>;
}
