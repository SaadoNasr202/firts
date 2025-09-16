import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const response = await fetch(
			"https://shellafood.com/api/v1/investor/nafath/checkStatus",
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
		return NextResponse.json(data, { status: response.status });
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Proxy error", error: error.message },
			{ status: 500 },
		);
	}
}
