import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch("https://shellafood.com/api/v1/investor/contract-pdf?pdf=1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return new Response(errorText, { status: res.status });
    }

    const arrayBuffer = await res.arrayBuffer();
    return new Response(arrayBuffer, {
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
