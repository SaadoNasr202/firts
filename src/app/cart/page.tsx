"use client";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import CartPage from "@/components/HomePage/CartPage";
import Shellafooter from "@/components/shellafooter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cart() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function checkLoginStatus() {
			try {
				const response = await fetch("/api/is_logged_in");

				if (!response.ok) {
					console.error("Failed to fetch login status:", response.statusText);
					router.push("/login");
					return;
				}

				const data = await response.json();
				if (data.isLoggedIn) {
                    
					setIsLoading(false);
				} else {
					router.push("/login");
				}
			} catch (error) {
				console.error("An error occurred while checking login status:", error);
				router.push("/login");
			}
		}

		checkLoginStatus();
	}, [router]);

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-[#ADF0D1]"></div>
			</div>
		);
	}

	return (
		<>
			<NavBarCondition />
			<CartPage />
			<Shellafooter />
		</>
	);
}
