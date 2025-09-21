import { NextResponse } from "next/server";
import { cache } from "@/lib/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		// إحصائيات التخزين المؤقت
		const cacheStats = cache.getStats();
		
		// معلومات الأداء
		const performanceInfo = {
			timestamp: new Date().toISOString(),
			cache: {
				size: cacheStats.size,
				keys: cacheStats.keys,
			},
			system: {
				nodeVersion: process.version,
				platform: process.platform,
				arch: process.arch,
				memory: {
					used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
					total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
					external: Math.round(process.memoryUsage().external / 1024 / 1024),
				},
				uptime: Math.round(process.uptime()),
			},
		};

		return NextResponse.json({
			success: true,
			performance: performanceInfo,
		});

	} catch (error) {
		console.error("خطأ في جلب معلومات الأداء:", error);
		return NextResponse.json(
			{ 
				error: "فشل في جلب معلومات الأداء",
				success: false 
			},
			{ status: 500 }
		);
	}
}

// API لمسح التخزين المؤقت
export async function DELETE() {
	try {
		cache.clear();
		
		return NextResponse.json({
			success: true,
			message: "تم مسح التخزين المؤقت بنجاح",
		});

	} catch (error) {
		console.error("خطأ في مسح التخزين المؤقت:", error);
		return NextResponse.json(
			{ 
				error: "فشل في مسح التخزين المؤقت",
				success: false 
			},
			{ status: 500 }
		);
	}
}
