import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		console.log("Proxy request body:", body);

		const response = await fetch(
			"https://shellafood.com/api/v1/investor/nafath/initiate",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-LANG": "ar",
				},
				body: JSON.stringify(body),
			},
		);

		const data = await response.json();
		console.log("Proxy response data:", data); 

		return NextResponse.json(data, { status: response.status });
	} catch (error: any) {
		console.error("Proxy error:", error);
		return NextResponse.json(
			{ message: "Proxy error", error: error.message },
			{ status: 500 },
		);
	}
}
