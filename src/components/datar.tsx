// datar.ts

export const allRestaurants = [
	{
		id: 1,
		name: "ماكدونالدز",
		image: "https://via.placeholder.com/400x400?text=McDonalds",
	},
	{
		id: 2,
		name: "برجر كنج",
		image: "https://via.placeholder.com/400x400?text=Burger+King",
	},
	{
		id: 3,
		name: "كنتاكي",
		image: "https://via.placeholder.com/400x400?text=KFC",
	},
];

export const restaurantMenu = {
	1: {
		sections: ["ساندويشات", "وجبات", "مشروبات"],
		items: [
			{
				id: 101,
				restaurantId: 1,
				name: "بيج ماك",
				price: "20 ريال",
				image: "https://via.placeholder.com/600x400?text=Big+Mac",
				section: "ساندويشات",
				description: "سندويش لحم شهير من ماكدونالدز.",
			},
			{
				id: 102,
				restaurantId: 1,
				name: "تشيكن ماك ناجتس",
				price: "15 ريال",
				image: "https://via.placeholder.com/600x400?text=Nuggets",
				section: "وجبات",
				description: "قطع دجاج مقرمشة.",
			},
		],
	},
	2: {
		sections: ["برجر", "دجاج", "حلويات"],
		items: [
			{
				id: 201,
				restaurantId: 2,
				name: "ووبر",
				price: "25 ريال",
				image: "https://via.placeholder.com/600x400?text=Whopper",
				section: "برجر",
				description: "برجر لحم مشوي على اللهب.",
			},
		],
	},
	3: {
		sections: ["وجبات دجاج", "ساندويشات", "سلطات"],
		items: [
			{
				id: 301,
				restaurantId: 3,
				name: "تويستر",
				price: "18 ريال",
				image: "https://via.placeholder.com/600x400?text=Twister+Sandwich",
				section: "ساندويشات",
				description: "سندويش دجاج حار.",
			},
			{
				id: 302,
				restaurantId: 3,
				name: "وجبة زنجر",
				price: "22 ريال",
				image: "https://via.placeholder.com/600x400?text=Zinger+Meal",
				section: "وجبات دجاج",
				description: "وجبة زنجر شهية مع بطاطس.",
			},
		],
	},
};
