"use client";
import NavBarCondition from "@/components/Profile/NavBarConditon";
import ProfileList from "@/components/Profile/ProfileList";
import Shellafooter from "@/components/shellafooter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function checkLoginStatus() {
			try {
				// إعطاء وقت أكثر للجلسة لتسجل في الكوكيز
				await new Promise(resolve => setTimeout(resolve, 100));
				
				const response = await fetch("/api/is_logged_in");
				console.log("🔍 Profile: Response status:", response.status);

				if (!response.ok) {
					console.log("❌ Profile: Response not OK, redirecting to login");
					router.push("/login");
					return;
				}

				const data = await response.json();
				console.log("🔍 Profile: Response data:", data);

				if (data.isLoggedIn) {
					console.log("✅ Profile: User is logged in, showing profile");
					setIsLoading(false);
				} else {
					console.log("❌ Profile: User not logged in, redirecting to login");
					router.push("/login");
				}
			} catch (error) {
				console.error("💥 Profile: Login check failed:", error);
				router.push("/login");
			}
		}

		checkLoginStatus();
	}, [router]);

	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			<NavBarCondition />
			<ProfileList />
			<Shellafooter />
		</>
	);
}
