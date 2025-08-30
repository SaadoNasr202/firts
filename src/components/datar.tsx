// datar.ts

export const allRestaurants = [
	{
		id: 1,
		name: "ماكدونالدز",
		image: "restaurent.png",
	},
	{
		id: 2,
		name: "برجر كنج",
		image: "restaurent.png",
	},
	{
		id: 3,
		name: "كنتاكي",
		image: "restaurent.png",
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
				image: "byrger.png",
				section: "ساندويشات",
				description: "سندويش لحم شهير من ماكدونالدز.",
			},
			{
				id: 102,
				restaurantId: 1,
				name: "تشيكن ماك ناجتس",
				price: "15 ريال",
				image: "byrger.png",
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
				image: "byrger.png",
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
				image: "byrger.png",
				section: "ساندويشات",
				description: "سندويش دجاج حار.",
			},
			{
				id: 302,
				restaurantId: 3,
				name: "وجبة زنجر",
				price: "22 ريال",
				image: "byrger.png",
				section: "وجبات دجاج",
				description: "وجبة زنجر شهية مع بطاطس.",
			},
		],
	},
};
